import React from 'react';
import styled from "@emotion/styled";

import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet'

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const Map = (props) => {
  return (
    <div
      {...props}
    >
      <MapContainer 
        center={[props.coordinates.lat, props.coordinates.long]} 
        zoom={4} 
        scrollWheelZoom={false}
        style={{width: '100%', height: '100%'}}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker 
          position={[props.coordinates.lat, props.coordinates.long]}
      //     src={markerIcon}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
