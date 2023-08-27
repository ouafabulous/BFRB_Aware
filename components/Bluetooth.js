import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

class BluetoothComponent extends Component {
  constructor(props) {
    super(props);

    this.manager = new BleManager();
    this.state = {
      devices: [],
    };
  }

  componentDidMount() {
    this.startScanning();
  }

  componentWillUnmount() {
    this.stopScanning();
  }

  startScanning = () => {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('Error scanning devices:', error);
        return;
      }

      if (!this.state.devices.some(dev => dev.id === device.id)) {
        this.setState(prevState => ({
          devices: [...prevState.devices, device],
        }));
      }
    });
  };

  stopScanning = () => {
    this.manager.stopDeviceScan();
  };

  connectToDevice = async device => {
    try {
      const connectedDevice = await device.connect();
      console.log('Connected to device:', connectedDevice.id);
      // Perform further actions with the connected device
    } catch (error) {
      console.error('Error connecting to device:', error);
    }
  };

  render() {
    return (
      <View>
        <Text>Available Bluetooth Devices:</Text>
        {this.state.devices.map(device => (
          <View key={device.id}>
            <Text>{device.name || 'Unknown Device'}</Text>
            <Button
              title="Connect"
              onPress={() => this.connectToDevice(device)}
            />
          </View>
        ))}
      </View>
    );
  }
}

export default BluetoothComponent;
