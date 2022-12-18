import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const GenreDisplay = () => {
  const params = useParams();
  const [genres, setGenres] = useState();

  const fetching = (urlExtension) => {
    const API_KEY = process.env.REACT_APP_API_KEY;
    const url = `https://rawg-video-games-database.p.rapidapi.com/${urlExtension}?key=${API_KEY}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "f775d4cdacmshde98a298a5737b2p10f444jsn13cdff795cc0",
        "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
      },
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        setGenres(result);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetching(`genres`);
  }, []);

  useEffect(() => {
    console.log(genres?.results[5].games);
  });

  return (
    <div className="article-content">
      <h1 className="white">{params.query.toUpperCase()}</h1>
      {genres.results[5].games.map((obj, index) => {
        <span key={index}>
          Name: {obj.name} Slug: {obj.slug}
        </span>;
      })}
    </div>
  );
};

export default GenreDisplay;
