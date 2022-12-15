import Reac, { useState, useEffect, useRef } from 'react';

import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet'
import {useMapEvents} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";


const Map = (props) => {
  const [zoomState, set_zoomState] = useState();
  const [showMarker, set_showMarker] = useState(true);

  function MyComponent(props) {
    const [zoomLevel, setZoomLevel] = useState(null); // initial zoom level provided for MapContainer
    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });
    if(zoomLevel){
      props.updateZoom(zoomLevel);
    }
    return null
  }

  useEffect(() => {
    if(zoomState >= 9) set_showMarker(false)
    else set_showMarker(true)
  }, [zoomState]);


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
        {
          showMarker && 
          <Marker 
            position={[props.coordinates.lat, props.coordinates.long]}
          />
        }
        <Circle 
          center={[props.coordinates.lat, props.coordinates.long]} 
          radius={4000} 
   //       pane="my-existing-pane" 
        />
        <MyComponent 
          updateZoom={set_zoomState}
        />
      </MapContainer>
    </div>
  );
};

export default Map;
