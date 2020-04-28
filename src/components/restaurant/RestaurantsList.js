import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { GET_RESTAURANTS, DELETE_RESTAURANT } from "../../graphql";

const RestaurantsList = ({ restaurant: { name, id } }) => {
	const [deleteRestaurant] = useMutation(DELETE_RESTAURANT, {
		variables: { id },
		onError(err) {
			console.log(err);
		},
		update(proxy) {
			const data = proxy.readQuery({ query: GET_RESTAURANTS });
			console.log(data);

			proxy.writeQuery({
				query: GET_RESTAURANTS,
				data: {
					restaurants: data.restaurants.filter(
						(restaurant) => restaurant.id !== id
					),
				},
			});
		},
	});
	return <div onClick={() => deleteRestaurant()}>{name}</div>;
};

export default RestaurantsList;
