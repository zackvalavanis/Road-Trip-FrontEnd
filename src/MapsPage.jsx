import { MapsIndex } from "./MapsIndex";
import axios from 'axios';
import { useState, useEffect } from 'react';


export function MapsPage () { 
  const [ destinations, setDestinations ] = useState([]);

  const handleIndex = () => { 
    console.log("handelIndex");
    axios.get('http://localhost:3000/destinations.json').then((response) => { 
      console.log(response.data);
      setDestinations(response.data);
    });
  };

  useEffect(handleIndex, []);


  return ( 
      <main>
        <MapsIndex destinations={destinations}/>
      </main>
  );
}
