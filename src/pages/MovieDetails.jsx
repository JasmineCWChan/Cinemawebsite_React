import React from "react";
import { useParams, Link } from "react-router-dom";
import movies from "../data/movies";

const MovieDetails = () => {
    const { id } = useParams();
    const movie = movies.find((m) => m.id === parseInt(id));

    if (!movie) {
        return <h2>Movie not found</h2>;
    }

    return (
        <div className="movie-details">
            <Link to="/">Back to Homepage</Link>
            <h1>{movie.title}</h1>
            <img src={movie.poster} alt={movie.title} />
            <p>{movie.description}</p>
            <p><strong>Genre:</strong> Sci-Fi</p>
            <p><strong>Cast:</strong> Example Cast</p>
            <div className="showtimes">
                <h3>Showtimes:</h3>
                <button>3:00 PM</button>
                <button>6:00 PM</button>
                <button>9:00 PM</button>
            </div>
            <Link to={`/movies/${id}/seats`}>
                <button>Select Seats</button>
            </Link>
        </div>
    );
};

export default MovieDetails;