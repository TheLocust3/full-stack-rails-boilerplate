import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { MDCSelect } from '@material/select';

import { uuid } from '../../../helpers';

import Text from './Text';

export default class Select extends React.Component {
    constructor(props) {
        super(props);

        this.state = { uuid: `select-${uuid()}` };
    }

    mdcInit() {
        const select = new MDCSelect(document.querySelector(`#${this.state.uuid}`));

        if (this.props.selectedIndex != null) {
            select.selectedIndex = this.props.selectedIndex;
        }
    }

    componentDidMount() {
        this.mdcInit();
    }

    componentDidUpdate() {
        this.mdcInit();
    }

    render() {
        let { className, label, onChange, selectedIndex, required, disabled, children, ...props } = this.props;
        className = _.isEmpty(className) ? '' : className;

        return (
            <div className={`mdc-select ${className}`} id={this.state.uuid} role="listbox" data-mdc-auto-init="MDCSelect" {...props}>
                <select
                    onChange={(event) => {
                        this.props.onChange(event.target);
                    }}
                    className="mdc-select__native-control mdc-typography--body2"
                    required={required}
                    disabled={disabled}>
                    {children}
                </select>

                <label className="mdc-floating-label">
                    <Text type="body2">{label}</Text>
                </label>

                <div className="mdc-line-ripple" />
            </div>
        );
    }
}

Select.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    selectedIndex: PropTypes.number,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.any.isRequired
};
