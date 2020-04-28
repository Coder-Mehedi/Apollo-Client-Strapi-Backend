import React, { useState, useContext } from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../context/auth";

const Register = ({ history }) => {
	const context = useContext(AuthContext);
	const [registerInfo, setRegisterInfo] = useState({});
	const [errors, setErrors] = useState("");
	const [register, dunno] = useMutation(REGISTER_MUTATION, {
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		update(proxy, { data: { register: userData } }) {
			console.log(userData);
			context.login(userData);
			history.push("/");
		},

		variables: registerInfo,
	});
	const onChange = (e) => {
		setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		register();
		console.log(dunno);
	};
	return (
		<div className="row">
			<div className="col m6 offset-m3">
				<h4 className="center">Register</h4>
				<hr />
				<form onSubmit={handleSubmit}>
					<label>Username</label>
					<input type="text" name="username" onChange={onChange} />
					<label>Email</label>
					<input type="email" name="email" onChange={onChange} />
					<label>Password</label>
					<input type="password" name="password" onChange={onChange} />
					<button type="submit" className="btn green">
						Register
					</button>
				</form>
			</div>
		</div>
	);
};

const REGISTER_MUTATION = gql`
	mutation Register($username: String!, $email: String!, $password: String!) {
		register(
			input: { username: $username, email: $email, password: $password }
		) {
			jwt
			user {
				username
				email
				id
				role {
					name
				}
			}
		}
	}
`;

export default Register;
