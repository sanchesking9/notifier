import { default as React, Component } from "react";

export default class Actions extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {};
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

  watchMyPLace() {
    if (this.state.placeWatching) {
      clearInterval(this.placeWatching);
      this.setState({
        placeWatching: null
      });
    } else {
      this.setState({
        placeWatching: setInterval(this.setMyPlace.bind(this), 1000)
      });
    }
  }

  render() {
    return (
      <div className="actions">
        <ul>
          <li>
            <button onClick={this.setMyPlace.bind(this)}>Set My Place</button>
          </li>
          <li>
            <button onClick={this.watchMyPLace.bind(this)}>
              {!this.state.placeWatching ? 'Watch My Place' : 'Stop Watch My Place'}
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
