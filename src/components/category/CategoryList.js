import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { GET_CATEGORIES, DELETE_CATEGORY } from "../../graphql";

const CategoryList = ({ category: { id, name, restaurants } }) => {
	const [deleteCategory] = useMutation(DELETE_CATEGORY, {
		variables: { id },
		onError(err) {
			console.log(err);
		},
		update(proxy) {
			const data = proxy.readQuery({ query: GET_CATEGORIES });
			console.log(data);

			proxy.writeQuery({
				query: GET_CATEGORIES,
				data: {
					categories: data.categories.filter((category) => category.id !== id),
				},
			});
		},
	});

	return (
		<div className="category">
			<li className="collection-header">
				<i className="material-icons" onClick={() => deleteCategory()}>
					delete
				</i>
				<h4>{name}</h4>
			</li>
			<ul className="collection with-header">
				{restaurants.map((restaurant) => (
					<li className="collection-item" key={restaurant.name}>
						<div>
							{restaurant.name}
							<a href="#!" className="secondary-content">
								{/* <i className="material-icons">delete</i> */}
							</a>
						</div>
					</li>
					// <li>
					// 	Restaurant Name: {restaurant.name} - Restaurant Description:{" "}
					// 	{restaurant.description}
					// </li>
				))}
			</ul>
		</div>
	);
};

export default CategoryList;
