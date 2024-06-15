// Example Planet component (components/Planet.js)
import React from 'react';

const Planett = ({ name, climate, population }) => (
  <div>
    <h3>{name}</h3>
    <p>Climate: {climate}</p>
    <p>Population: {population}</p>
    {/* Add more properties as needed */}
  </div>
);

export default Planett;
