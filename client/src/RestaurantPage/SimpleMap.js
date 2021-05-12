import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import RoomIcon from "@material-ui/icons/Room";
const AnyReactComponent = ({ text }) => (
  <div>
    {text}
    <RoomIcon />
  </div>
);

export default function SimpleMap(props) {
  const latitude = props.latitude;
  const longitude = props.longitude;

  //this lat lon is mentioning default values
  const latt = 41.884668;
  const longg = -87.62288;
  const defaultProps = {
    center: {
      lat: latt,
      lng: longg,
    },
    zoom: 13,
  };
  return (
    <div style={{ height: "60vh", width: "95%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAOmc6Vkhmv9iy-MjIrDjarQuWUfDxzKv8" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={latitude} lng={longitude} text="" />
      </GoogleMapReact>
    </div>
  );
}
