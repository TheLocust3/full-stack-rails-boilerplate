# React+Redux+Rails Boilerplate

A skeleton project that runs:

-   Rails
-   React
-   Redux
-   React Router
-   Terraform
-   AWS CodeDeploy
-   HTTPS through AWS Certificate Manager
-   Nginx
-   Devise
-   Material Components

### Terraform Setup

To use Terraform, open `terraform.tf` and change the variables name, username, and provider to your custom values. Make a note of the name, this will be used for CodeDeploy setup.

You also must create an EC2 Keypair with that name from your AWS console.

### CodeDeploy Setup

To setup CodeDeploy, start by opening `deploy/install_dependencies.sh` and `deploy/deploy.sh`. Quickly skim the file and switch any variables/names from `test` to whatever name you chose in the Terraform setup.

After that, run `terraform apply` to spin up your infrastructure. Once that is complete (will take around 5 minutes), copy `deploy/image_install_script.sh` in the EC2 instance and run it. This will install CodeDeploy.

However, Blue-Green deployments must be set up manually due to a bug in Terraform (as of writing). I've commented out the settings needed in `terraform.tf`

While on the server, create a `secrets.env` file in `home/ubuntu`. Store something like this in it:

```
    SECRET_KEY_BASE={YOUR_GENERATED_SECRET_KEY}
    PGUSER={YOUR_DATABASE_USERNAME}
    PGPASSWORD={YOUR_DATABASE_PASSWORD}
    PGHOST={YOUR_DATABASE_ADDRESS}
    PGPORT=5432
```

`PGUSER`, `PGPASSWORD`, and `PGHOST` can be found in the output of the `terraform apply` command you ran previously. `SECRET_KEY_BASE` can be generated by running `rake secret`.

Next compile assets locally before deploying with `bundle exec rake assets:precompile RAILS_ENV=production`.

Finally run `deploy/deploy.sh` to deploy.
