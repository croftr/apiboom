import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/firebase";
import AuthRoute from "./components/AuthRoute";
import "./App.css";

import RegisterPage from "./components/RegisterPage";
import Login from "./components/Login";

initializeApp(firebaseConfig);

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/register' element={<Login />} />
				<Route
					path='/'
					element={
						<AuthRoute>
							<RegisterPage />
						</AuthRoute>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
