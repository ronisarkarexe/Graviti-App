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
import AddStop from "./AddStop";

// for big screen
const containerBigScreenStyle = {
  width: "560px",
  height: "511px",
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

  // add another stop 
  const [inputs, setInputs] = useState([{}]);
  
  // handle stop
  const [stops, setStops] = useState([]);
  const handleAddStop = () => {
    setStops([...stops, ""]);
  };

  const handleStopChange = (event, index) => {
    const newStops = [...stops];
    newStops[index] = event.target.value;
    setStops(newStops);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddStop();
    setInputs([...inputs, ""]);
  };

  // useRef for origin and destination
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */

  // Select transit
  useEffect(() => {
    calculateRoute();
  }, [selectedValue]);

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
    const waypoints = stops.length > 0 ? stops.map((stop) => ({ location: stop })) : [];
    const results = await directionsService?.route({
      origin: originRef.current?.value,
      destination: destiantionRef.current?.value,
      waypoints: waypoints,
      // eslint-disable-next-line no-undef
      travelMode: selectedValue,
    });
    
    // total distance calculate
    let total = 0;
    for (const key of results?.routes) {
      for (const value of key?.legs) {
        total = total + Number(value?.distance?.text.split(' ')[0].replace(/,/g, ""));
      }
    }
    setDirectionsResponse(results);
    setDistance(total);
  }

  // select radio option
  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  // clear input field with direction response
  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setStops("")
    setInputs([{}])
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
            mapContainerStyle={
              width < 376 ? containerMobileResStyle : containerBigScreenStyle
            }
          >
            <Marker position={center} />
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
          </GoogleMap>
        </div>
        <div className="layout-box user-input-box">
          <div className="test"></div>
          <div className="test2"></div>
          <>
            <div className="layout-box-container">
              <div className="layout-input-box box2">
                <div className="layout-box-size">
                  <>
                    <div>
                      <InputLabel props={"Origin"} />
                      <Autocomplete>
                        <input
                          className="input-field input-field-icon-1 origin-text"
                          type="text"
                          name="input-field"
                          maxLength="50"
                          ref={originRef}
                        />
                      </Autocomplete>
                    </div>
                    {inputs?.map((input, index) => (
                      <div key={index}>
                        <>
                          <InputLabel props={"Stop"} />
                          <Autocomplete>
                            <input
                              className="input-field input-field-icon-2 stop-text"
                              type="text"
                              name="input-field"
                              maxLength="50"
                              onBlur={(event) => handleStopChange(event, index)}
                            />
                          </Autocomplete>
                        </>
                      </div>
                    ))}
                    <AddStop handleSubmit={handleSubmit}/>
                    <div className="input-div">
                      <InputLabel props={"Destination"} />
                      <Autocomplete>
                        <input
                          className="input-field input-field-icon-3 location-d"
                          type="text"
                          name="input-field"
                          maxLength="50"
                          ref={destiantionRef}
                        />
                      </Autocomplete>
                    </div>
                  </>
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
            <div className="distance-layout-div">
              <CommonLayout distance={distance}/>
              <div className="dis-2">
                <LayoutText
                  originRef={originRef}
                  destiantionRef={destiantionRef}
                  distance={distance}
                />
              </div>
            </div>
          </>
          <div className="test3"></div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
