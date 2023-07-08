import { Button } from "@mui/material";
import { cuisineData } from "../data/restaurantData";
import "../App.css";
import { useContext } from "react";
import { RestaurantContext } from "../context/RestaurantContext";
import { Link } from "react-router-dom";

export const Home = () => {
    const { selectedRestaurant, handleSelectedRestaurant } =
        useContext(RestaurantContext);
    function handleChange(id) {
        handleSelectedRestaurant(id);
    }

    return (
        <div className="home-container">
            <h1>Food Ordering App</h1>
            <h2>Select Your Cuisine: </h2>
            <div className="btn-container">
                {cuisineData.map((data) => (
                    <Button
                        key={data.id}
                        variant="contained"
                        onClick={() => handleChange(data.id)}
                    >
                        {data.name}
                    </Button>
                ))}
            </div>
            <div className="restaurant-container">
                {selectedRestaurant?.map((restaurant) => (
                    <div key={restaurant.id} className="restaurant">
                        <h3>Dishes by {restaurant.name}</h3>
                        <div className="restaurant-menu">
                            {restaurant.menu.map((item, index) => (
                                <div key={index} className="item">
                                    <Link to={`/restaurant/${restaurant.id}`}>
                                        <img
                                            src={item.imgSrc}
                                            className="item-image"
                                        />
                                        <div className="item-details">
                                            <p>
                                                <strong>{item.name}</strong>
                                            </p>
                                            <p className="secondary-details">{item.price} for one</p>
                                            <p className="secondary-details">{restaurant.name}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
