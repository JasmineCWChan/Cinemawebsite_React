import React, { useState } from "react";
import { useParams } from "react-router-dom";
import movies from "../data/movies";
import "./Checkout.css";

const Checkout = () => {
    const { id } = useParams();
    const movie = movies.find((m) => m.id === parseInt(id));

    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handlePayment = () => {
        const { cardNumber, expiryDate, cvv } = paymentDetails;
    
        if (!cardNumber || !expiryDate || !cvv) {
            alert("Please fill in all payment details.");
            return;
        }
    
        if (cardNumber.length < 16 || isNaN(cardNumber)) {
            alert("Invalid card number. Please enter a valid 16-digit number.");
            return;
        }
    
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            alert("Invalid expiry date format. Please use MM/YY.");
            return;
        }
    
        if (cvv.length < 3 || isNaN(cvv)) {
            alert("Invalid CVV. Please enter a 3-digit number.");
            return;
        }
    
        // If all validations pass
        alert("Payment successful! Enjoy the movie.");
    };

    if (!movie) {
        return <h2>Movie not found</h2>;
    }

    return (
        <div className="checkout">
            <h1>Checkout for {movie.title}</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={paymentDetails.cardNumber}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="expiryDate"
                    placeholder="Expiry Date (MM/YY)"
                    value={paymentDetails.expiryDate}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={paymentDetails.cvv}
                    onChange={handleChange}
                    required
                />
                <button type="submit" onClick={handlePayment}>
                    Complete Payment
                </button>
            </form>
        </div>
    );
};

export default Checkout;