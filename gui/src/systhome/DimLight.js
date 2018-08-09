import React from 'react'

import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'


class DimLight extends React.Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnChangeComplete = this.handleOnChangeComplete.bind(this);

        this.sliderValue = null;
    }

    handleOnChange(value) {
//        console.log("handleOnChange", value)
        this.sliderValue = value;
    }

    handleOnChangeComplete() {
//        console.log("handleOnChangeComplete")
        const device = this.props.value;
        this.props.onChange(device.id, this.sliderValue);
    }

    render() {
        var intValue = parseInt(this.props.value["status"], 10);
        return (
            <Slider
              value={intValue}
              onChange={this.handleOnChange}
              onChangeComplete={this.handleOnChangeComplete}/>
        );
    }
}

export default DimLight;