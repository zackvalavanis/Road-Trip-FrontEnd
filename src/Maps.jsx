import React, { useEffect, useState } from 'react';
import './Maps.css'; // Ensure you have a CSS file for styles

const Maps = () => {
  const [distances, setDistances] = useState([]);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!document.getElementById('google-maps-script')) {
        const script = document.createElement('script');
        script.id = 'google-maps-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC336edFYRyUPOp7bn1lGi7DXo2w4yQ5lg&libraries=geometry&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
    };

    loadGoogleMaps();

    // Define the initMap function globally
    window.initMap = () => {
      const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: { lat: 59.325, lng: 18.07 },
      });

      // Array of locations for multiple markers
      const tourStops = [
        { position: { lat: 59.327, lng: 18.067 }, title: "Marker 1" },
        { position: { lat: 59.325, lng: 18.10 }, title: "Marker 2" },
        { position: { lat: 59.32, lng: 18.05 }, title: "Marker 3" },
        { position: { lat: 59.34, lng: 18.08 }, title: "Marker 4" },
        { position: { lat: 59.30, lng: 18.09 }, title: "Marker 5" },
      ];

      // Create markers
      const markers = tourStops.map(stop => {
        const marker = new google.maps.Marker({
          position: stop.position,
          map,
          title: stop.title,
          draggable: true,
          animation: google.maps.Animation.DROP,
        });

        // Add click listener to toggle animation
        marker.addListener('click', () => {
          toggleBounce(marker);
        });

        // Add listener to update distances on marker drag end
        marker.addListener('dragend', () => {
          calculateDistances(markers);
        });

        return marker; // Return the marker for distance calculations
      });

      // Calculate distances between markers
      calculateDistances(markers);
    };

    // Toggle bounce animation on marker click
    const toggleBounce = (marker) => {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    };

    // Calculate distances between markers
    const calculateDistances = (markers) => {
      const distancesArray = [];
      for (let i = 0; i < markers.length; i++) {
        for (let j = i + 1; j < markers.length; j++) {
          const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(
            markers[i].getPosition(),
            markers[j].getPosition()
          );

          const distanceInMiles = (distanceInMeters * 0.000621371).toFixed(2); // Convert to miles

          distancesArray.push({
            from: markers[i].getTitle(),
            to: markers[j].getTitle(),
            distance: distanceInMiles // Store distance in miles
          });
        }
      }
      setDistances(distancesArray); // Set the distances in state
    };
  }, []);

  return (
    <div>
      <h1>Maps Page</h1>
      <div id="map"></div>
      <h2>Distances Between Markers</h2>
      <ul>
        {distances.map((d, index) => (
          <li key={index}>
            {d.from} to {d.to}: {d.distance} miles
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Maps;
