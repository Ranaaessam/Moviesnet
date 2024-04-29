import React, { useState } from "react";
import "./Moviesapicss.css"
import { Link } from "react-router-dom";

const Movie = (props) => {
  // const { name, imgSrc, rate } = props;
  const { id,name, original_language,vote_count,imgSrc } = props;


  const [isHovered, setIsHovered] = useState(false);


// const titleStyle = {
//     position: "absolute",
//     top: "20px",
//     bottom:"40px",
//     left: "20px",
//     fontSize: "42px",
//     fontWeight: "bold",
//     color: "red",
//     zIndex: "1", }

  const imageStyle = {
    width: "200px",
    height: "300px",
  };

  const textStyle = {
    fontWeight: "bold",
    marginBottom: "2px",
    color:"white"
  };



  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img src={imgSrc} alt={name} style={imageStyle} />
      <div style={textStyle}>
        {!isHovered ? (
          <span>
            Title: {name.length > 10 ? name.substring(0, 10) + "..." : name}
          </span>
        ) : (
          <span>Title: {name}</span>
        )}
      </div>
      {/* <div style={titleStyle}>Movies Website</div>Link */}
       {/* <Link style={titleStyle} elem>Movies Website</Link> */}
      <div style={textStyle}>Language: {original_language}</div>
      <div style={textStyle}>Vote: {vote_count}</div>
      <Link to={`/movies/${id}`}>
        <button className="btn btn-danger"  >SeeMore</button>
        </Link>
    </div>
  );
  
};

export default Movie;
