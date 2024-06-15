import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import PlanetComp from "./components/Planet";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const getPlanetsWithReptileResidents = async () => {
    try {
      const filmsResponse = await axios.get("https://swapi.dev/api/films/");
      const films = filmsResponse.data.results;

      const speciesResponse = await axios.get("https://swapi.dev/api/species/");
      const reptileSpeciesUrls = speciesResponse.data.results
        .filter((species) => species.classification === "mammal")
        .map((species) => species.url);
          console.log("reptileSpeciesUrls",reptileSpeciesUrls)
      const filmPromises = films.map(async (film) => {
        const planetsPromises = film.planets.map((planetUrl) =>
          axios.get(planetUrl)
        );
        const planetsResponses = await Promise.all(planetsPromises);

        const planetsWithReptileResidents = await Promise.all(
          planetsResponses.map(async (planetResponse) => {
            const planetData = planetResponse.data;
            const residentsPromises = planetData.residents.map((residentUrl) =>
              axios.get(residentUrl).then((residentResponse) => {
                const speciesUrls = residentResponse.data.species;
                const hasReptileSpecies = speciesUrls.some((url) =>
                  reptileSpeciesUrls.includes(url)
                );
                return hasReptileSpecies;
              })
            );

            const residentsResults = await Promise.all(residentsPromises);
            const hasReptileResidents = residentsResults.includes(true);

            return {
              planetData: planetData,
              hasReptileResidents,
            };
          })
        );

        return {
          filmTitle: film.title,
          planets: planetsWithReptileResidents.filter(
            (planet) => planet.hasReptileResidents
          ),
        };
      });

      const filmsWithReptilePlanets = await Promise.all(filmPromises);
      const result = filmsWithReptilePlanets.filter(
        (film) => film.planets.length > 0
      );

      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };
  console.log("data",data)
  useEffect(() => {
    const fetchData = async () => {
      const result = await getPlanetsWithReptileResidents();
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, []);
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  if (data.length === 0) {
    return <div className="flex items-center justify-center min-h-screen">No data found</div>;
  }
  return (
<div className="App">
  {data && data.map((film) => (
          <div key={film.filmTitle} >
            <ul>
              {film.planets.map((planet) => (
               <li key={planet.planetData.name}>
                <PlanetComp film={film} name={planet.planetData.name} climate={planet.planetData.climate} created={planet.planetData.created}/>
             </li>
              ))}
            </ul>
          </div>
        ))}



      
    </div>
  );
}

export default App;
