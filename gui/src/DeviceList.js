import React, { Component } from 'react';
import Device from './Device'

class DeviceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceList: []
    };

    this.onChange = this.onChange.bind(this);
  }

  changeDevice(device_id, index, value) {
    var xhr = new XMLHttpRequest();
    var url = process.env.REACT_APP_BACKEND_URL + 'api/device/' + device_id + '/';
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    var token = localStorage.getItem('token');
    if (token) {
        xhr.setRequestHeader("Authorization", "Token " + token);
    }

    const that = this;
    xhr.onreadystatechange = function () {
        if (xhr.status === 200) {
            if (xhr.readyState === 4) {

                var json = JSON.parse(xhr.responseText);

                var deviceList = that.state.deviceList;
                deviceList[index] = json

                that.setState({
                    deviceList
                })
            }
        }
        else {
            console.log("error", xhr.status, xhr.readyState);
            if (xhr.readyState === 4) {
                alert(xhr.responseText);
            }
        }
    };
    var data = JSON.stringify({"status": value});
    xhr.send(data);
  }

  onChange(device_id, value) {
      var deviceList = this.state.deviceList;

      for (var index = 0; index <  deviceList.length; index++) {
          var current = deviceList[index];

          if (current["id"] === device_id) {
            this.changeDevice(device_id, index, value)
            break;
          }
      }
  }

  async componentDidMount() {
    try {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + 'api/device');
      const deviceList = await res.json();
      this.setState({
        deviceList
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        {this.state.deviceList.map(device => (
           <Device key={device.id} value={device} onChange={this.onChange}/>
        ))}

      </div>
    );
  }
}

export default DeviceList;
