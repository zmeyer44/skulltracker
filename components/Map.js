import { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerClusterer,
  Marker,
} from "@react-google-maps/api";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../config/firebase";

import InfoBox from "./InfoBox";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const options = {
  imagePath:
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
};

function createKey(location) {
  return location.lat + location.lng;
}

const Map = ({ center, zoom }) => {
  const { isLoaded } = useJsApiLoader({
    id: "a32a3733933e4793",
    googleMapsApiKey: process.env.NEXT_GOOGLE_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [selectedSkull, setSelectedSkull] = useState(null);
  //   const onLoad = useCallback(function callback(map) {
  //     const bounds = new window.google.maps.LatLngBounds(center);
  //     map.fitBounds(bounds);
  //     setMap(map);
  //   }, []);

  const init = async () => {
    const q = query(collection(db, `tokens`), orderBy("allTime", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      let rank = 1;
      querySnapshot.forEach((doc) => {
        let skull = doc.data();
        skull?.locations?.forEach((loc) => {
          temp.push({
            image: skull.image,
            name: skull.name,
            allTime: skull.allTime,
            last7: skull.last7,
            owner: skull.owner,
            rank,
            openseaUrl: skull.openseaUrl,
            lat: loc.lat,
            lng: loc.lng,
          });
        });
        rank++;
      });
      setMarkers(temp);
    });
    return unsubscribe;
  };

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      onLoad={init}
      onClick={() => setSelectedSkull(null)}
      onUnmount={onUnmount}
      options={{
        mapId: "a32a3733933e4793",
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {markers ? (
        <MarkerClusterer options={options}>
          {(clusterer) =>
            markers?.map((item) => (
              <Marker
                key={createKey(item)}
                position={item}
                clusterer={clusterer}
                onClick={(e) => setSelectedSkull(item)}
                icon="https://firebasestorage.googleapis.com/v0/b/discovr-98d5c.appspot.com/o/images%2Fskullmarker.png?alt=media&token=eea7a077-d6f8-453d-a466-15bc207b39dd"
              />
            ))
          }
        </MarkerClusterer>
      ) : null}

      {selectedSkull ? <InfoBox {...selectedSkull} /> : null}
    </GoogleMap>
  ) : (
    <></>
  );
};

Map.defaultProps = {
  center: {
    lat: 42.234,
    lng: -98.8992,
  },
  zoom: 4,
};
export default Map;
