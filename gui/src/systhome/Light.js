import React from 'react';
import * as cst from './const';

class Light extends React.Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const device = this.props.value;
        this.props.onChange(device.id, this.props.value["status"] === cst.LIGHT_OFF ? cst.LIGHT_ON : cst.LIGHT_OFF);
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.props.value["status"] === cst.LIGHT_OFF ? 'ON' : 'OFF'}
            </button>
        );
    }
}

export default Light;