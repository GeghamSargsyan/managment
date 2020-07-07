import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { getUserInfo } from "selectors";

import ReactMapboxGl, {
  Layer,
  Feature,
  Popup,
  Marker,
  ZoomControl,
  ScaleControl
} from "react-mapbox-gl";
import firebase from "../../api/firebase";

import Pulse from "./Pulse";
import ActiveDrivers from "../../components/ActiveDrivers";

const ref = firebase.database().ref("driverInfo/LBkmmbPZxZQK6WnsjaeA");

const MapBox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZ2VnaGFtc2FyZ3N5YW4iLCJhIjoiY2thMDZkM3plMDkwNzNncG10eWZiMjZ2byJ9.2YAnvQEq8V-AXLjzvaRDGA"
});

export default function Maps() {
  const user = useSelector(getUserInfo);

  const [state, setState] = React.useState({
    latitude: "43.554548",
    longitude: "45.56465",
    speed: "",
    car: "",
    name: ""
  });

  useEffect(() => {
    if (user?.userId) return;

    ref(user.userId).on("value", snapshot => {
      const state = snapshot.val();
      const { latitude, longitude, speed, car, name, active } = state;
      setState({
        latitude,
        longitude,
        speed,
        car,
        name,
        active
      });
    });
  }, [user]);

  return (
    <>
      <ActiveDrivers drivers={[state]} />
      <MapBox
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh"
        }}
        center={[state.longitude, state.latitude]}
        attributionControl={true}
      >
        <ZoomControl />
        <ScaleControl />
        {state.active && (
          <Marker
            style={{ transition: "0.8s" }}
            coordinates={[state.longitude, state.latitude]}
            anchor="right"
          >
            <Pulse />
          </Marker>
        )}
      </MapBox>
    </>
  );
}
