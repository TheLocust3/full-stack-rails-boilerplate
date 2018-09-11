import React from 'react';
import PropTypes from 'prop-types';
import { MDCRipple } from '@material/ripple';

import { uuid } from '../../../helpers';

export default class Button extends React.Component {
    constructor(props) {
        super(props);

        this.state = { uuid: `button-${uuid()}` };
    }

    componentDidMount() {
        MDCRipple.attachTo(document.querySelector(`#${this.state.uuid}`));
    }

    render() {
        let { className, style, flat, condensed, children, ...props } = this.props;

        className = _.isEmpty(className) ? '' : className;
        let buttonDenseClassName = condensed ? 'mdc-button--dense' : '';
        let flatClassName = flat ? '' : 'mdc-button--raised';

        return (
            <button id={this.state.uuid} className={`mdc-button ${flatClassName} ${buttonDenseClassName} ${className}`} {...props}>
                {children}
            </button>
        );
    }
}

Button.propTypes = {
    className: PropTypes.string,
    flat: PropTypes.bool,
    condensed: PropTypes.bool,
    children: PropTypes.any.isRequired
};
