provider "aws" {
  region = "us-east-1"
}

variable "name" {
  default = "test"
}

variable "username" {
  default = "testusername"
}

data "aws_ami" "image" {
  name_regex = "${var.name}-" // matches NAME-DATE
  most_recent = true
}

resource "random_id" "database_password" {
  keepers = {
    password = "${var.username}"
  }

  byte_length = 16
}

resource "random_id" "random" { // Using this for snapshot names
  keepers = {
    password = "${var.name}"
  }

  byte_length = 8
}

resource "aws_security_group" "security_group" {
  name = "${var.name} security group"
  description = "Managed by Terraform"

  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 443
    to_port = 443
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "db_security_group" {
  name = "${var.name} rds security group"
  description = "Managed by Terraform"

  ingress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    security_groups = ["${aws_security_group.security_group.id}"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}


data "aws_iam_policy_document" "ec2-role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "ec2-role" {
  name = "${var.name}-ec2"
  assume_role_policy = "${data.aws_iam_policy_document.ec2-role.json}"
}

resource "aws_iam_role_policy_attachment" "ec2-role-for-codedeploy" {
  role = "${aws_iam_role.ec2-role.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2RoleforAWSCodeDeploy"
}

resource "aws_iam_instance_profile" "ec2-profile" {
  name  = "${var.name}_profile"
  role = "${aws_iam_role.ec2-role.name}"
}


data "aws_iam_policy_document" "codedeploy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type = "Service"
      identifiers = ["codedeploy.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "deployment" {
  name = "${var.name}-deployment"

  assume_role_policy = "${data.aws_iam_policy_document.codedeploy.json}"
}

resource "aws_iam_role_policy_attachment" "deployment" {
  role = "${aws_iam_role.deployment.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSCodeDeployRole"
}


resource "aws_instance" "instance" {
  ami = "${data.aws_ami.image.id}"
  instance_type = "t2.micro"
  vpc_security_group_ids = ["${aws_security_group.security_group.id}"]
  associate_public_ip_address = true
  iam_instance_profile = "${aws_iam_instance_profile.ec2-profile.name}"
  key_name = "${var.name}"

  tags {
    Name = "${var.name}"
  }
}

resource "aws_db_instance" "db_instance" {
  identifier = "${var.name}"
  allocated_storage = "5"
  storage_type = "gp2"
  engine = "postgres"
  engine_version = "9.6.3"
  instance_class = "db.t2.micro"
  vpc_security_group_ids = ["${aws_security_group.db_security_group.id}"]

  final_snapshot_identifier = "${var.name}-final-snapshot-${random_id.database_password.hex}"

  name = "${var.name}"
  username = "${var.username}"
  password = "${random_id.database_password.hex}"
}

resource "aws_codedeploy_app" "application" {
  name = "${var.name}"
}

resource "aws_codedeploy_deployment_group" "deployment" {
  app_name = "${aws_codedeploy_app.application.name}"
  deployment_group_name = "production"
  service_role_arn = "${aws_iam_role.deployment.arn}"

  ec2_tag_filter {
    type = "KEY_AND_VALUE"
    key = "Name"
    value = "${var.name}"
  }
}

output "instance_ip" {
  value = "${aws_instance.instance.public_ip}"
}

output "database_username" {
  value = "${aws_db_instance.db_instance.username}"
}

output "database_password" {
  value = "${aws_db_instance.db_instance.password}"
}
