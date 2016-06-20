import { default as React, Component } from "react";

export default class Actions extends Component {

  constructor(props, context) {
    super(props, context);
  }

  setMyPlace() {
    window.navigator.geolocation.getCurrentPosition((position) => {
      this.props.addPin({
        position: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        key: `My Place`,
        defaultAnimation: 2
      });
      
    }, function(error) {
      console.log('Cannot get current position');
    });
  }

  render() {
    return (
      <div className="actions">
        <ul>
          <li>
            <button onClick={this.setMyPlace.bind(this)}>Set My Place</button>
          </li>
        </ul>
      </div>
    );
  }
}
