import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_RESTAURANT, GET_RESTAURANTS } from "../../graphql";

const AddRestaurants = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [categories, setCategories] = useState([]);

	const [createRestaurant] = useMutation(CREATE_RESTAURANT, {
		variables: { name, description, categories },
		onError(err) {
			console.log(err);
		},
		update(proxy, result) {
			const data = proxy.readQuery({ query: GET_RESTAURANTS });
			// console.log("Data:", data);
			// console.log("Result:", result);

			proxy.writeQuery({
				query: GET_RESTAURANTS,
				data: {
					restaurants: [
						result.data.createRestaurant.restaurant,
						...data.restaurants,
					],
				},
			});
			setName("");
			setDescription("");
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		createRestaurant();
	};

	return (
		<div className="row">
			<div className="col m6 offset-m3">
				<form onSubmit={handleSubmit}>
					<label>Restaurant Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<label>Description</label>
					<input
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<button className="btn red">Add Category</button>
				</form>
			</div>
		</div>
	);
};

export default AddRestaurants;
