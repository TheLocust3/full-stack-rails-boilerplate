import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { MDCRipple } from '@material/ripple';

import { uuid } from '../helpers';

export default class Fab extends React.Component {

    constructor(props) {
        super(props);

        this.state = { uuid: `fab-${uuid()}` }
    }

    componentDidMount() {
        MDCRipple.attachTo(document.querySelector(`#${this.state.uuid}`));
    }

    render() {
        let { className, style, condensed, children, ...props } = this.props;

        className = _.isEmpty(className) ? '' : className;
        let fabMiniClassName = condensed ? 'mdc-fab--mini' : '';

        return (
            <button id={this.state.uuid} className={`relative mdc-fab ${fabMiniClassName} ${className}`} {...props}>
                {children}
            </button>
        );
    }
}

Fab.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    condensed: PropTypes.bool,
    children: PropTypes.any.isRequired
};
