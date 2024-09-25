import React, { useEffect, useState } from 'react';
import './Maps.css'; // Ensure you have a CSS file for styles

const Maps = () => {
  const [location1, setLocation1] = useState('');
  const [location2, setLocation2] = useState('');
  const [distances, setDistances] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!document.getElementById('google-maps-script')) {
        const script = document.createElement('script');
        script.id = 'google-maps-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC336edFYRyUPOp7bn1lGi7DXo2w4yQ5lg&libraries=geometry,places&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
    };

    loadGoogleMaps();

    // Define the initMap function globally
    window.initMap = () => {
      const initializedMap = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: { lat: 59.325, lng: 18.07 }, // Initial center
      });
      setMap(initializedMap);
    };
  }, []);

  const calculateDistance = () => {
    const geocoder = new google.maps.Geocoder();

    // Geocode location1
    geocoder.geocode({ address: location1 }, (results1, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const position1 = results1[0].geometry.location;

        // Geocode location2
        geocoder.geocode({ address: location2 }, (results2, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            const position2 = results2[0].geometry.location;

            // Calculate distance
            const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(position1, position2);
            const distanceInMiles = (distanceInMeters * 0.000621371).toFixed(2); // Convert to miles

            setDistances([{
              from: location1,
              to: location2,
              distance: distanceInMiles,
            }]);

            // Optionally, you can center the map between the two locations
            const centerLat = (position1.lat() + position2.lat()) / 2;
            const centerLng = (position1.lng() + position2.lng()) / 2;
            map.setCenter({ lat: centerLat, lng: centerLng });

            // Create markers for both locations
            new google.maps.Marker({ position: position1, map, title: location1 });
            new google.maps.Marker({ position: position2, map, title: location2 });
          } else {
            alert('Geocode was not successful for the second location: ' + status);
          }
        });
      } else {
        alert('Geocode was not successful for the first location: ' + status);
      }
    });
  };

  return (
    <div>
      <h1>Maps</h1>
      <div>
        <input
          type="text"
          placeholder="Enter first location"
          value={location1}
          onChange={(e) => setLocation1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter second location"
          value={location2}
          onChange={(e) => setLocation2(e.target.value)}
        />
        <button onClick={calculateDistance}>Calculate Distance</button>
      </div>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
      <h2>Distances</h2>
      <ul>
        {distances.map((d, index) => (
          <li key={index}>
            From {d.from} to {d.to}: {d.distance} miles
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Maps;
