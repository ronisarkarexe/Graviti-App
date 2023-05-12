/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";

import SelectTransit from "./SelectTransit";
import ButtonBtn from "./ButtonBtn";
import InputLabel from "./InputLabel";
import CommonLayout from "./CommonLayout";
import LayoutText from "./LayoutText";
import Title from "./Title";

// for big screen
const containerBigScreenStyle = {
  width: "670px",
  height: "436px",
};

// for mobile 375 px
const containerMobileResStyle = {
  width: "375px",
  height: "357px",
  margin: "auto",
};

// latitude and longitude google maps
const center = {
  lat: 19.078370008133902,
  lng: 72.90042193876533,
};

const Layout = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedValue, setSelectedValue] = useState("DRIVING");


  // This state for mobile device
  const [width, setWidth] = useState(screen.width);

  useEffect(() => {
    function handleResize() {
      setWidth(screen.width);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // Select transit
  useEffect(() => {
    calculateRoute();
  }, [selectedValue]);


  // useRef for origin and destination
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  // loading
  if (!isLoaded) {
    return <p className="loading">Loading...</p>;
  }

  // calculate function
  async function calculateRoute() {
    if (
      originRef.current?.value === "" ||
      destiantionRef.current?.value === ""
    ) {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService?.route({
      origin: originRef.current?.value,
      destination: destiantionRef.current?.value,
      // eslint-disable-next-line no-undef
      travelMode: selectedValue,
    });
    setDirectionsResponse(results);
    setDistance(results?.routes[0].legs[0].distance.text);
    setDuration(results?.routes[0].legs[0].duration.text);
  }


  // select radio option
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // clear input field with direction response
  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return (
    <div className="layout">
      <Title />
      <div className="container">
        <div className="layout-box map-box">
          <SelectTransit
            handleRadioChange={handleRadioChange}
            selectedValue={selectedValue}
          />
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={width < 376 ? containerMobileResStyle : containerBigScreenStyle}
          >
            <Marker position={center} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </div>
        <div className="layout-box user-input-box">
          <>
            <div className="layout-box-container">
              <div className="layout-input-box box2">
                <div className="layout-box-size">
                  <form>
                    <InputLabel props={"Origin"} />
                    <Autocomplete>
                      <input
                        className="input-field"
                        type="text"
                        name="input-field"
                        maxLength="50"
                        ref={originRef}
                      />
                    </Autocomplete>
                    <InputLabel props={"Stop"} />
                    <input
                      className="input-field"
                      type="text"
                      name="input-field"
                      maxLength="50"
                    />
                    <InputLabel props={"Destination"} />
                    <Autocomplete>
                      <input
                        className="input-field"
                        type="text"
                        name="input-field"
                        maxLength="50"
                        ref={destiantionRef}
                      />
                    </Autocomplete>
                  </form>
                </div>
              </div>
              <div className="layout-input-box box1">
                <ButtonBtn
                  calculateRoute={calculateRoute}
                  clearRoute={clearRoute}
                  directionsResponse={directionsResponse}
                />
              </div>
            </div>
            <div className="distance-layout">
              <CommonLayout distance={distance} distanceName={"Distance"} />
              <CommonLayout distance={duration} distanceName={"Duration"} />
              <LayoutText
                originRef={originRef}
                destiantionRef={destiantionRef}
                distance={distance}
              />
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default Layout;
