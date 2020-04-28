import React, { useState, useContext } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";

const Login = ({ history }) => {
	const context = useContext(AuthContext);
	const [loginInfo, setLoginInfo] = useState({});
	const [errors, setErrors] = useState("");
	const [login] = useMutation(LOGIN_MUTATION, {
		onError(err) {
			console.log(err.graphQLErrors[0]);
			// setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		update(proxy, { data: { login: userData } }) {
			console.log(userData);
			context.login(userData);
			history.push("/");
		},

		variables: loginInfo,
	});

	const onChange = (e) => {
		setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		login();
	};
	return (
		<div className="row">
			<div className="col m6 offset-m3">
				<h4 className="center">Login</h4>
				<hr />
				<form onSubmit={handleSubmit}>
					<label>Username or Email</label>
					<input type="text" name="identifier" onChange={onChange} />

					<label>Password</label>
					<input type="password" name="password" onChange={onChange} />
					<button type="submit" className="btn green">
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

const LOGIN_MUTATION = gql`
	mutation Login($identifier: String!, $password: String!) {
		login(input: { identifier: $identifier, password: $password }) {
			jwt
			user {
				username
				email
				confirmed
				role {
					description
					name
				}
			}
		}
	}
`;

export default Login;
