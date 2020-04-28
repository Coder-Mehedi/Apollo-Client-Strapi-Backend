import React from "react";
import { useQuery } from "@apollo/react-hooks";
import AddRestaurants from "./AddRestaurant";
import { GET_RESTAURANTS } from "../../graphql";
import RestaurantsList from "./RestaurantsList";

const Restaurants = () => {
	const { loading, data } = useQuery(GET_RESTAURANTS);
	let restaurantsList;

	if (!loading && data) {
		restaurantsList = data.restaurants.map((restaurant) => (
			<RestaurantsList key={restaurant.id} restaurant={restaurant} />
		));
	} else {
		restaurantsList = <h5>Loading Restaurants...</h5>;
	}

	return (
		<div>
			<h1>Restaurants</h1>
			<AddRestaurants />
			<ul>{restaurantsList}</ul>
		</div>
	);
};

export default Restaurants;
