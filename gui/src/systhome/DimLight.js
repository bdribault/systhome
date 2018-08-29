import React from 'react'

import 'react-rangeslider/lib/index.css'

import 'bulma-extensions/bulma-slider/dist/css/bulma-slider.min.css'

class DimLight extends React.Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleOnChange = this.handleOnChange.bind(this);
        
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
            function() {
                console.log("set value to ", this.state.value);
                const device = this.props.value;
                this.props.onChange(device.id, this.state.value);
            }
            .bind(this),
            200
        );

        this.setState({ value: value, timeout: timeout });
    }

    render() {
        return (
            <div>
                <input className="slider has-output" step="1" min="0" max="100" value={this.state.value}
                    type="range" onChange={this.handleOnChange} />
                <output htmlFor="sliderWithValue">{this.state.value}</output>
            </div>
        );
    }
}

export default DimLight;