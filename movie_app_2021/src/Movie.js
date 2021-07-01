import PropTypes from "prop-types";
import "./Movie.css";

function Movie({ year, title, summary, medium_cover_image, genres }) {
  return (
    <div className="movie">
      <img src={medium_cover_image} alt={title} title={title} />
      <div className="movie__data">
        <h3 className="movie__title">{title}</h3>
        <h3 className="movie__year">{year}</h3>
        <h3 className="movie__summary">{summary}</h3>
        <ul className="movie__genres">
          {genres.map((genre, index) => (
            <li key={index} className="movie__genre">
              {genre}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Movie.propTypes = {
  year: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  medium_cover_image: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
