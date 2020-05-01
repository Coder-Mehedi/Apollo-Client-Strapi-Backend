import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
	CREATE_RESTAURANT,
	GET_RESTAURANTS,
	GET_CATEGORIES,
} from "../../graphql";

const AddRestaurants = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [categories, setCategories] = useState([]);

	const { loading, data } = useQuery(GET_CATEGORIES);

	const [createRestaurant] = useMutation(CREATE_RESTAURANT, {
		variables: { name, description, categories },
		onError(err) {
			console.log(err);
		},
		update(proxy, result) {
			const data = proxy.readQuery({ query: GET_RESTAURANTS });

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
		refetchQueries: [{ query: GET_CATEGORIES }],
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		createRestaurant();
	};

	const checkboxChange = (categoryId) => {
		console.log(categories);
		if (categories.includes(categoryId)) {
			setCategories(categories.filter((category) => category !== categoryId));
		} else setCategories([...categories, categoryId]);
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
					{data &&
						data.categories.map((category) => (
							<p>
								<label>
									<input
										type="checkbox"
										onChange={() => checkboxChange(category.id)}
									/>
									<span>{category.name}</span>
								</label>
							</p>
						))}

					<button className="btn red">Add Restaurant</button>
				</form>
			</div>
		</div>
	);
};

export default AddRestaurants;
