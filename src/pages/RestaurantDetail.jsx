import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantContext";
import { Link } from "react-router-dom";
import "../App.css";
import { Button, Modal } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    backgroundColor: "red",
    color: "white",
    p: 4,
};

export const RestaurantDetail = () => {
    const { id } = useParams();
    const { selectedRestaurant, addReview } = useContext(RestaurantContext);
    const currRestaurant = selectedRestaurant.find(
        (restaurant) => restaurant.id == id
    );
    //console.log(currRestaurant);
    //console.log(selectedRestaurant);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [rating, setRating] = useState("Select Rating");
    const [comment, setComment] = useState("");
    const [reviews, setReviews] = useState(currRestaurant.ratings);
    function handleReview() {
        addReview(id, rating, comment);
        const myRating = {
            rating: parseInt(rating),
            revName: "dev",
            comment,
            pp: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAAB6CAMAAABHh7fWAAABIFBMVEX///8AAADt9f63VlfbWnnHWGbVWXO0YVXJWGjSWXDQWW6zZVTjW4G2WVa/WF+2W1a1Xlbz+//29vb3///Z2dnEW2aioqKvr69oaGi1tbVVVVXn5+fv7+/T09OFhYWWlpYrKysVFRWNjY2+vr5CQkJ0dHTl7PNLS0s7OzsdHR3JycleXl7aSW2eo6mPk5c0NDTqydbT2uHHztR5fIG2u8JZQEhgFi/HeY/91N9zWF9TKzj0fqLxWojpSXzzo7n63+bxuMf87vLx4+/leZjjZ4fhgZrrq7nhkaTlvMjdmaTQSGPWb4TJg48ADw09EhfWgI2DPETDRVbbrLakSFU4GxxVKCuUQ0lrMzYoGBVJJiKPSUWiVVBwPzSDST6YWEdaNC8GqlhbAAAIbUlEQVRoge1bbUPiSBKWgAouIk3kRV4CCAkIgoDc7tzp7KqMyjD75t7sra7M+v//xVV1J6GTdNIBwU8+SOh0kn5S3dXVVZW4tfWOd7zjHYAM4O1Zy5Vqt9Vut5tF/aj0lsQlrRbhUMyV34r5KOKB9jY93/AyAxpvwFyuc4TN3rlV1DdP3eGYj8moa++0Nj7i+QVzvVTg+7wN3PnC8ebugJe6VHSMd3NLh+3ZxlSuzHH1h2cObnYn2qaotxadXByr6thJTrEh4nLLZuipPf28N9brburNTLTywo61Sc3NaaK6EWpOrwqHPsyboeZmVqSuFH2oW4cboHZ0sTY88ZO7sHbykpNAoNyL+1rz7BasWb44We86nhdQtHtKX0y+1k73UJ9pQ0IUIuaurVPujqPlbn9kADGAjIVT/KS6vqUkYzVa18YVg6iKBWL0hdp+tj7D1jSbPFeJ4oQ67Asl19el6dZgDxUvVMXNfYYV9fVoW9VssytgVhTDxVwwL8i9nnjhGPTc3U3He+RkruE1hyj4qxdwak90ulobIqFV9xQr4FUZdN66rxvwY2wtv1UGTeuKhFZI10UNZyM0KBVfQUxvvok2Qvfpb8Wou6lrbFrnoFhdWW7qIVBPu3zm099EYGWP2NVVcNpaKzKX6raiVsBIqQpnTexSy0tthQV4v6uFCIfI3GFlGHJNJaO+wjqdDM+tUg/J2g7qrtUCBkur+C50glTMHZCtQYb1+mjMGCOR0dgUu1DsG8RoCaRmE7yzNHPpDOMMcwcH3SBD6PWIapqRk0jJ1DOUH4+5VJwC1LS9rKpl2rwxhKGuAScYlwKlJrrHti3ErnMLF97zsqal6OiqPC4dIGC/Z6l5v2/4Uef5dnC4lzPnaEm4lQ+EzOMgE3tqE+ck5zrcZbt1DMqWQMPVBPT+SDSrbeaFh+zW6PLJUpqGLig/QpmTSE1oUKw5Pmr5CU2t2hKGBfSyyeslBBxtf2ajwE/riruxTG0JsdE2Onw7cM66qoOOH2rHgl3zNpczV7MQKJ24u+2IKTjXxWNuLXFQC7yyjFsSf4BOtj333bepiaqiC64tboRjFi6TeliXpeKdicfciknGTeaM2XpHOGqhdJ2wK3fLa380jlpl6YXWQuM5ah/hOJMchI4gbuKlpt1bzPMqZ/viftpUCJdyANtw7K5zjPVoPB4qvC2z0wy+ouVDGfKSqAXQcJ2LOVyOkmpZMl/JDkNZFU10g6B5TaFjxm7FdAw9nWUjUw+RVhPPQTCkdVHkYVLrTPECmm2HiEbyYl0p8IPthop+b7BY3RC2tGD7kw50Ij4OKZUag4DgqFqTU2M6Unj3Lcs/EVGDZ1gL7s9j+exqcO6kAyi2OAQA6lyQilHkXL6LAJqvQUK3RTPEoc+R1N3Oy614y9+Rwhl0UjU8wT2LNSWrYlUqNYYbvgfNKdQzPGMeilqkvRyCl5iG6Yycu3XdkK5Mx1INz0viFDN31yce6lawsdKl1JqkX3BAWpGmW2qVPQAJQFPqjBckN4fUZDzypJGk+cmaNJHXEjiUPMow2opXxdUziVAleRjQlPhvlNoLXDUDqTtyn7TpCNXCU+sSO1mVWxQZdaYpppapZ1EykGGo28IFDNePQKns1E4gdeBYo9Qi6tG/vv/hw7XvZY0Q4YdMw7f+/R9hspJcXF5+vLz48SfxVZp83ZLM6+uri8sL0aJNJpfJZPIS6JM/imQHAyjNkAfd3oeLj9B+8sZLfIPEJi4/TjyiH4UJ9478bPj11adT1vbEZVGIcpV04uPkg/PibpgAoCJegjJXn7BNukne8v4CUQaTpBe3PzkbrcmTSBjeemunKPHp7Y3yKRZLwufqBqIAhGJMJ3AoxvisH/p7t7hcD5e2E1jE69vTWCz2aUAUMohRnMZu76aDwfTuNnka88HpxNK3Qz9P04Vzj224w9ZP7+miod4vmgb40ZpnTG2hQyXOOi6P9HoCBDs7A5anu5nADuz68+3AQfYBbtrplTAzC4GvgHAnfphBWzMmMlHucG8JzO63qJUKmaB15B7udnYSO4kpe5w22JvtJBL0jzbMF9mPuefgzodSb4oOF7Z9niX2Zl9uqMgG7iQS9JvY2zMLMsx+/iWEDTWBSS5mxjP3QDG7p7OYDL7M9lZA4le/aEaEqmX1foNLHz6zzr4D4ng8jl/cwI7VeJzumcdoPf7AJoGF38OnrbZYgI1T+zdo6uEPlXb2l4f4SvhvJHx3IzTaR58ftuMPU8o8eNjejsOHIk5/4/iLmzjWxM1fdppVtx3PBiR2hMA4t3MFdA9Utcn0YXtFfAUfebknADDatWw2m6LUZLqd5ZFKwRd+nbX0iKMqlU396U39yZABr/qvFGKqAnPKRJYvZK3drHUga9ZZp2WRWRLieYF5+P8x7mlqRVDmFZ4zYTgbTaWiqSj8YUNRq0VWiEZTVr1ZYX4Wp/wVWe1JLnb5Y9SFlLvCtxKq/1yRma2xT+JWQ2F1ZjbcL9Ho/v4qxM9fA1OHMuAT4JeDfV8csGPmGY4T/35cTcNsYMbo6WABaD4NGyyk6f6+WX1wkN63SvidY4p46Vnl4X58Ti8AlFaBbZwVrOr5CTOHsthOBuzzyLf0LnzS6V0AbNLmbpqW0+wQd3tzmpB//Tsp9FXdl2eT1YG0oJze/bseWcWEiVCib+HMd8PhGdUr0l3X+0c03fz47TsZdr/79kQz02sRmaFCBX+cBzP/M6cS19f4yhUix57nvPiLzgQGK7L2F+UzOfOpytP8Hy/t3OSNrFliCw376XT96WU+/4aYz1++2o/WCht8Rb2U87zvY99NIb/p9/LLDa3ofrWsXahW3uifEcqlSj6n6d1uV6/mGoelN/sfiHe84x3vCML/ASG28iqpPabAAAAAAElFTkSuQmCC",
        };
        setReviews((prev) => [...prev, myRating]);
        handleClose();
        setRating("Select Rating");
        setComment("");
    }

    return (
        <div className="restaruant-detail-container">
            <Link to="/" className="link-home">
                {"<-"}
            </Link>
            <h1>{currRestaurant.name}</h1>
            <p className="restaurant-detail-info">{currRestaurant.address}</p>
            <p className="restaurant-detail-info">Average Rating {currRestaurant.averageRating}</p>
            <div className="button-container">
                <Button
                    className="review-btn"
                    variant="contained"
                    onClick={handleOpen}
                >
                    Add Review
                </Button>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={style}>
                    <div className="modal-header">
                        <button className="close-btn" onClick={handleClose} size="small">X</button>
                        <h1>Add your Review</h1>
                    </div>
                    <div className="modal-content">
                        <label>Rating:</label>
                        <select
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        >
                            <option disabled={true}>Select Rating</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                        <label>Comment:</label>
                        <input
                            type="text"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></input>
                        <Button variant="contained" onClick={handleReview}>
                            Submit
                        </Button>
                    </div>
                </div>
            </Modal>

            <div className="Reviews">
                <h2>Reviews</h2>
                {reviews.map((review, ind) => (
                    <div key={ind}>
                        <div className="rev-header">
                            <img className="pp" src={review.pp} />
                            <p className="rev-name">{review.revName}</p>
                        </div>
                        <div className="rev">
                            <p>{review.comment}</p>
                            <p className="rating">{review.rating} *</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
