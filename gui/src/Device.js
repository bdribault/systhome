import React from 'react';
import Light from './systhome/Light'
import DimLight from './systhome/DimLight'

function Device(props) {
    const device = props.value;
    var comp;
    switch (device.type) {
        case "LIGHT":
            comp = <Light value={device} onChange={props.onChange}/>;
            break;
         case "DIM_LIGHT":
            comp = <DimLight value={device} onChange={props.onChange}/>;
            break;
          default:
            console.log("No component for type " + device.type);
    }
    return (
        <div>
            <h2>{device.name}</h2>
            {comp}
        </div>
    );
}

export default Device;