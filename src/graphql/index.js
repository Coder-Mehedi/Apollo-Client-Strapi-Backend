import gql from "graphql-tag";

export const GET_CATEGORIES = gql`
	query getCategories {
		categories {
			id
			name
			restaurants {
				name
				description
			}
		}
	}
`;

export const CREATE_CATEGORY = gql`
	mutation createCategory($name: String!) {
		createCategory(input: { data: { name: $name } }) {
			category {
				id
				name
				restaurants {
					name
					description
				}
			}
		}
	}
`;

export const GET_RESTAURANTS = gql`
	query {
		restaurants {
			id
			name
			description
			categories {
				name
				id
			}
		}
	}
`;

export const CREATE_RESTAURANT = gql`
	mutation createRestaurant($name: String!, $description: String!) {
		createRestaurant(
			input: { data: { name: $name, description: $description } }
		) {
			restaurant {
				id
				name
				description
				categories {
					name
					id
				}
			}
		}
	}
`;

export const DELETE_RESTAURANT = gql`
	mutation deleteRestaurant($id: ID!) {
		deleteRestaurant(input: { where: { id: $id } }) {
			restaurant {
				name
				id
			}
		}
	}
`;
