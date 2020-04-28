import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { GET_CATEGORIES } from "../../graphql";

const Categories = () => {
	const { loading, data } = useQuery(GET_CATEGORIES);
	let categoryList;
	if (data) {
		console.log(data);
		categoryList = data.categories.map((cat) => (
			<li key={cat.id}>{cat.name}</li>
		));
	} else {
		categoryList = <h5>Loading Categories...</h5>;
	}
	return (
		<div className="center">
			<h2>Category List</h2>
			<ul>{categoryList}</ul>
		</div>
	);
};

export default Categories;
