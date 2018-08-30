import React from 'react'
import { connect } from 'react-redux';

import 'react-rangeslider/lib/index.css'

import 'bulma-extensions/bulma-slider/dist/css/bulma-slider.min.css'

import img_on from "../../images/light_on.png"
import img_off from "../../images/light_off.png"

class DimLight extends React.Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSwitchOff = this.handleSwitchOff.bind(this);

        this.state = {
            value: parseInt(this.props.value["status"], 10),
            timeout: null
        };
    }

    handleOnChange(event) {
        let value = event.target.value;
        // console.log("handleRangeChange", value)

        if (this.state.timeout) {
            clearTimeout(this.state.timeout);
        }

        var timeout = setTimeout(
            function () {
                const device = this.props.value;
                this.props.onChange(device.id, this.state.value);
            }
                .bind(this),
            200
        );

        this.setState({ value: value, timeout: timeout });
    }

    handleSwitchOff(event) {
        if (this.state.timeout) {
            clearTimeout(this.state.timeout);
        }
        this.setState({ value: 0, timeout: null });
        const device = this.props.value;
        this.props.onChange(device.id, 0);
    }

    

    render() {
        return (
            <div className="level">
                <button className="delete is-small level-item"  onClick={this.handleSwitchOff}/>
                <div style={{width:"10px"}}/>
                <input className="slider has-output level-item" step="1" min="0" max="100" value={this.state.value}
                    type="range" onChange={this.handleOnChange} disabled={!this.props.connected}/>
                <div style={{width:"10px"}}/>
                <p className="level-item tag" htmlFor="sliderWithValue" style={{width:"30px"}}>{this.state.value}</p>
                <figure class="image is-48x48 level-item">
                    <img src={this.state.value == 0 ? img_off : img_on}/>
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

export default connect(mapStateToProps)(DimLight);
