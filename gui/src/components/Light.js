import React from 'react';
import { connect } from 'react-redux';

import * as cst from '../../systhome/const';

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
            <div className="light">
                <button onClick={this.handleClick} className="button is-primary" disabled={!this.props.connected} >
                    {this.props.value["status"] === cst.LIGHT_OFF ? 'ON' : 'OFF'}
                </button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        connected: state.loginReducer,
    };
}
export default connect(mapStateToProps)(Light);
