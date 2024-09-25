export function MapsIndex(props) {
  const journeys = {};

  // Group locations by journey_id
  props.destinations.forEach((location) => {
    if (!journeys[location.journey_id]) {
      journeys[location.journey_id] = { origin: null, destination: null };
    }
    
    // Assign origin and destination based on order
    if (location.order === 1) {
      journeys[location.journey_id].destination = location;
    } else {
      journeys[location.journey_id].origin = location;
    }
  });

  return (
    <main>
      <h1>Destinations</h1>
      {Object.values(journeys).map((journey, index) => {
        if (journey.origin && journey.destination) {
          return (
            <div key={index}>
              <h2>Route: {journey.origin.name} to {journey.destination.name}</h2>
              {/* You may want to replace the following lines with actual distances and durations */}
              <h2>Distance: {/* Calculate distance based on coordinates */}</h2>
              <h2>Estimated Time: {/* Duration logic */}</h2>
            </div>
          );
        }
        return null; // If either origin or destination is missing
      })}
    </main>
  );
}
