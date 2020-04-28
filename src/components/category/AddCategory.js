import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { GET_CATEGORIES, CREATE_CATEGORY } from "../../graphql";

const CreateCategory = () => {
	const [name, setName] = useState("");
	const [createCategory] = useMutation(CREATE_CATEGORY, {
		variables: { name },
		onError(err) {
			console.log(err);
		},
		update(proxy, result) {
			const data = proxy.readQuery({ query: GET_CATEGORIES });
			// console.log(data);
			proxy.writeQuery({
				query: GET_CATEGORIES,
				data: {
					categories: [result.data.createCategory.category, ...data.categories],
				},
			});
			console.log(result.data.createCategory.category);
			setName("");

			// console.log(result);
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		createCategory();
	};

	return (
		<div className="row">
			<div className="col m6 offset-m3">
				<form onSubmit={handleSubmit}>
					<label>Category Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<button className="btn red">Add Category</button>
				</form>
			</div>
		</div>
	);
};

export default CreateCategory;
