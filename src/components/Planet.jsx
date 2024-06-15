import React from "react";
import { formatDate, formatTime } from "../helper/helper";
import { IoPlanetOutline } from "react-icons/io5";

const PlanetComp = ({ name , climate , created , film }) => {
  return (
    <div className="border border-white mb-2 px-4 py-2">
      <div className="flex items-center justify-between text-[#D5B663]">
        <p>{formatTime(created)}</p>
        {<p >{formatDate(created)}</p>}
      </div>
      <div className="flex items-center justify-between">
        <div className="mt-5 flex items-center">
          
          <IoPlanetOutline className="mr-5 w-8 h-8" />
          <div>
            <p className="font-bold">{name}</p>

            <p className="text-[#A1A1AA]">{film.filmTitle}</p>
         </div>
        </div>
        <div>
          <p className="text-[#A1A1AA]">{climate}</p>
        </div>
      </div>
    </div>
  );
};

export default PlanetComp;
