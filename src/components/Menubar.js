import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

const Menubar = () => {
	const { user, logout } = useContext(AuthContext);
	const menubar = user ? (
		<>
			<li>
				<Link to="restaurants">Restaurants</Link>
			</li>
			<li>
				<Link to="/" onClick={() => logout()}>
					Logout
				</Link>
			</li>
		</>
	) : (
		<>
			<li>
				<Link to="/login">Login</Link>
			</li>
			<li>
				<Link to="/register">Register</Link>
			</li>
		</>
	);
	return (
		<nav>
			<div className="nav-wrapper">
				<a href="#" className="brand-logo">
					Logo
				</a>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li>
						<Link to="/">Home</Link>
					</li>
					{menubar}
				</ul>
			</div>
		</nav>
	);
};

export default Menubar;
