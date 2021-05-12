import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const YOUR_API_KEY = "AIzaSyAOmc6Vkhmv9iy-MjIrDjarQuWUfDxzKv8";

const mapStyles = {
  width: "80%",
  height: "90%",
};

export class Mapss extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    markers: [
      {
        name: `${this.props.restaurants[0].name}`,
        position: {
          lat: `${this.props.restaurants[0].coordinates.latitude}`,
          lng: `${this.props.restaurants[0].coordinates.longitude}`,
        },
      },
      {
        name: `${this.props.restaurants[1].name}`,
        position: {
          lat: `${this.props.restaurants[1].coordinates.latitude}`,
          lng: `${this.props.restaurants[1].coordinates.longitude}`,
        },
      },
      {
        name: `${this.props.restaurants[2].name}`,
        position: {
          lat: `${this.props.restaurants[2].coordinates.latitude}`,
          lng: `${this.props.restaurants[2].coordinates.longitude}`,
        },
      },
      {
        name: `${this.props.restaurants[3].name}`,
        position: {
          lat: `${this.props.restaurants[3].coordinates.latitude}`,
          lng: `${this.props.restaurants[3].coordinates.longitude}`,
        },
      },
      {
        name: `${this.props.restaurants[4].name}`,
        position: {
          lat: `${this.props.restaurants[4].coordinates.latitude}`,
          lng: `${this.props.restaurants[4].coordinates.longitude}`,
        },
      },
      {
        name: `${this.props.restaurants[5].name}`,
        position: {
          lat: `${this.props.restaurants[5].coordinates.latitude}`,
          lng: `${this.props.restaurants[5].coordinates.longitude}`,
        },
      },
    ],
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{ lat: 41.86106, lng: -87.6344 }}
      >
        {this.state.markers.map((marker, index) => (
          <Marker
            key={index} // Need to be unique
            onClick={this.onMarkerClick}
            name={marker.name}
            position={marker.position}
          />
        ))}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: YOUR_API_KEY,
})(Mapss);
