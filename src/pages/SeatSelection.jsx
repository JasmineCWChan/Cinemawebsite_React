import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import movies from "../data/movies";
import "./SeatSelection.css";

const SeatSelection = () => {
    const { id } = useParams();
    const movie = movies.find((m) => m.id === parseInt(id));

    const [selectedSeats, setSelectedSeats] = useState([]);
    const seatPrice = 10;

    const toggleSeat = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((s) => s !== seat));
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    if (!movie) {
        return <h2>Movie not found</h2>;
    }

    return (
        <div className="seat-selection">
            <Link to={`/movies/${id}`}>Back to Movie Details</Link>
            <h1>Select Seats for {movie.title}</h1>
            <div className="seating">
                {Array.from({ length: 30 }, (_, i) => {
                    const seat = `S${i + 1}`;
                    return (
                        <button
                            key={seat}
                            className={`seat ${
                                selectedSeats.includes(seat) ? "selected" : ""
                            }`}
                            onClick={() => toggleSeat(seat)}
                        >
                            {seat}
                        </button>
                    );
                })}
            </div>
            <div className="summary">
                <h3>Selected Seats: {selectedSeats.join(", ") || "None"}</h3>
                <h3>Total Price: ${selectedSeats.length * seatPrice}</h3>
                <Link to={`/movies/${id}/checkout`}>
                    <button disabled={selectedSeats.length === 0}>
                        Proceed to Checkout
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default SeatSelection;