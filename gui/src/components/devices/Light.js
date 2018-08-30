import React from 'react';
import { connect } from 'react-redux';

import * as cst from '../../const';
import img_on from "../../images/light_on.png"
import img_off from "../../images/light_off.png"

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
            <div className="light level">
                <button onClick={this.handleClick} className="button is-primary" disabled={!this.props.connected} >
                    {this.props.value["status"] === cst.LIGHT_OFF ? 'ON' : 'OFF'}
                </button>
                <figure className="image is-48x48">
                    <img src={this.props.value["status"] === cst.LIGHT_OFF ? img_off : img_on} alt="state"/>
                </figure>
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
