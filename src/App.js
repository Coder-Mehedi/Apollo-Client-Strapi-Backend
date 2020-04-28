import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import Restaurants from "./components/restaurant/Restaurants";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Menubar from "./components/Menubar";
import AuthRoute from "./utils/AuthRoute";

function App() {
	return (
		<AuthProvider>
			<Router>
				<Menubar />
				<Route exact path="/" component={Home} />
				<Route exact path="/restaurants" component={Restaurants} />
				<AuthRoute exact path="/login" component={Login} />
				<AuthRoute exact path="/register" component={Register} />
			</Router>
		</AuthProvider>
	);
}

export default App;
