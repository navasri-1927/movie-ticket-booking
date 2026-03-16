import { useState } from "react";
import axios from "axios";

function ReviewForm({ movieId }) {

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const submitReview = async () => {

        await axios.post("http://localhost:5000/api/reviews", {
            movieId,
            rating,
            comment
        });

        alert("Review Added ⭐");

    };

    return (

        <div>

            <h3>Add Review</h3>

            <select onChange={(e) => setRating(e.target.value)}>
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>

            <textarea
                placeholder="Write review..."
                onChange={(e) => setComment(e.target.value)}
            />

            <button onClick={submitReview}>Submit</button>

        </div>

    );

}

export default ReviewForm;