import { default as React, Component } from "react";

import { default as canUseDOM } from "can-use-dom";
import { default as _ } from "lodash";

import { GoogleMapLoader, GoogleMap, Marker } from "react-google-maps";
import { triggerEvent } from "react-google-maps/lib/utils";

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class GettingStarted extends Component {

  state = {
    markers: [{
      position: {
        lat: 46.4545525,
        lng: 30.757653499999996
      },
      key: `Odessa`,
      defaultAnimation: 2,
    }],
  }

  constructor(props, context) {
    super(props, context);
    this.handleWindowResize = _.throttle(::this.handleWindowResize, 500);
  }

  componentDidMount() {
    if (!canUseDOM) {
      return;
    }
    window.addEventListener(`resize`, this.handleWindowResize);
  }

  componentWillUnmount() {
    if (!canUseDOM) {
      return;
    }
    window.removeEventListener(`resize`, this.handleWindowResize);
  }

  handleWindowResize() {
    console.log(`handleWindowResize`, this._googleMapComponent);
    triggerEvent(this._googleMapComponent, `resize`);
  }

  /*
   * This is called when you click on the map.
   * Go and try click now.
   */
  handleMapClick(event) {
    let newMarker = {
      position: event.latLng,
      defaultAnimation: 2,
      key: Date.now()
    };

    this.props.addPin(newMarker);
  }

  handleMarkerRightclick(index, event) {
    this.props.removePin(index);
  }

  render() {
    return (
      <GoogleMapLoader
        containerElement={
          <div
            {...this.props}
            className="map"
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => (this._googleMapComponent = map)}
            defaultZoom={10}
            defaultCenter={{ lat: 46.4545525, lng: 30.757653499999996 }}
            onClick={::this.handleMapClick}
          >
            {this.props.pins.map((marker, index) => {
              return (
                <Marker
                  {...marker}
                  onRightclick={this.handleMarkerRightclick.bind(this, index)}
                />
              );
            })}
          </GoogleMap>
        }
      />
    );
  }
}
