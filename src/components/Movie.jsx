import React, { useState } from "react";
import "./Moviesapicss.css"
import { Link } from "react-router-dom";

const Movie = (props) => {
  const { id, name, original_language, vote_count, imgSrc,release_date } = props;

  const [isHovered, setIsHovered] = useState(false);

  const imageStyle = {
    width: "200px",
    height: "300px",
  };

  const textStyle = {
    fontWeight: "bold",
    marginBottom: "2px",
    color: "white"
  };

  const containerStyle = {
    backgroundColor: isHovered ? "#b71c1c" : "transparent",
    transition: "background-color 0.3s ease",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={imgSrc} alt={name} style={imageStyle} />
      <div style={textStyle}>
        <span>
          Title: {name && name.length > 10 ? name.substring(0, 10) + "..." : name}
        </span>
      </div>
      <div style={textStyle}>Language: {original_language}</div>


      <div style={textStyle}>Vote: {vote_count}</div>
      <div style={textStyle}>{release_date}</div>


      
      <Link to={`/movies/${id}`}>
        <button className="btn btn-danger">SeeMore</button>
      </Link>
    </div>
  );
};

export default Movie;
