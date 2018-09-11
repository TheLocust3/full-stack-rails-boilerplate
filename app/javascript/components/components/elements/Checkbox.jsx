import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import Text from './Text';

export default class Checkbox extends React.Component {

    render() {
        let { className, label, onChange, defaultChecked, inputProps, ...props } = this.props;
        className = _.isEmpty(className) ? '' : className;

        return (
            <div className='checkbox-wrapper'>
                <div className={`mdc-checkbox ${className}`} {...props}>
                    <input type='checkbox' className='mdc-checkbox__native-control' onChange={onChange} defaultChecked={defaultChecked} {...inputProps} />
                    <div className='mdc-checkbox__background'>
                        <svg className='mdc-checkbox__checkmark' viewBox='0 0 24 24'>
                            <path className='mdc-checkbox__checkmark-path' fill='none' stroke='white' d='M1.73,12.91 8.1,19.28 22.79,4.59' />
                        </svg>

                        <div className='mdc-checkbox__mixedmark' />
                    </div>
                </div>

                <label className='checkbox-label'><Text type='body2'>{label}</Text></label>
            </div>
        );
    }
}

Checkbox.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    defaultChecked: PropTypes.bool,
    inputProps: PropTypes.object
};
