import React from 'react';
import PropTypes from 'prop-types';
import { MDCTextField } from '@material/textfield';

import { uuid } from '../helpers';

import Text from './Text';

export default class TextField extends React.Component {

    constructor(props) {
        super(props);

        this.state = { defaultValue: props.defaultValue, uuid: `textfield-${uuid()}` };
    }

    componentDidMount() {
        if (_.isEmpty(this.props.defaultValue)) return;

        let textField = new MDCTextField(document.querySelector(`#${this.state.uuid}`));
        textField.value = this.state.defaultValue;
    }

    componentDidUpdate() {
        if (_.isEmpty(this.props.defaultValue)) return;

        if (this.state.defaultValue != this.props.defaultValue) {
            let textField = new MDCTextField(document.querySelector(`#${this.state.uuid}`));
            textField.value = this.props.defaultValue;

            this.setState({
                defaultValue: this.props.defaultValue
            });
        }
    }

    render() {
        let { className, style, label, defaultValue, onChange, required, value, rows, cols, dense, ...props } = this.props;

        className = _.isEmpty(className) ? '' : className;

        return (
            <div id={this.state.uuid} className={`mdc-text-field mdc-text-field--textarea textarea ${className}`} data-mdc-auto-init='MDCTextField' style={style}>
                <textarea type='text' name={name} className='mdc-text-field__input mdc-typography--body2' onChange={onChange} value={value} rows={rows} cols={cols} required={required} {...props} />

                <label className='mdc-floating-label mdc-typography--body2'>{label}</label>

                <div className='mdc-line-ripple' />
            </div>
        );
    }
}

TextField.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    label: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    value: PropTypes.string,
    rows: PropTypes.number,
    cols: PropTypes.number,
    dense: PropTypes.bool
};
