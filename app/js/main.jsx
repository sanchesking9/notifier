import { default as React, Component } from "react";
import Map from "./Map";
import Actions from "./Actions";

export default class Main extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      pins: []
    };

  }

  componentDidMount() {
    this.getPins();
  }
  
  getPins() {
    const pins = window.localStorage.getItem('notifier_pins');
    const data = pins ? JSON.parse(pins) : [];
    this.setState({
      pins: data
    });
    return data;
  }
  
  addPin(pin) {
    const data = this.getPins();
    var index = -1;
    for (var i = 0; data.length > i; i++) {
      if (data[i].key === pin.key) {
        index = i;
        break;
      }
    }
    if (index > -1) {
      data[i] = pin;
    } else {
      data.push(pin);
    }
    window.localStorage.setItem('notifier_pins', JSON.stringify(data));
    this.getPins();
  }
  
  render() {
    const addPin = this.addPin.bind(this);
    return (
      <div className="main-wrapper">
        <Actions addPin={addPin} />
        <Map pins={this.state.pins} addPin={addPin}/>
      </div>
    );
  }
}
