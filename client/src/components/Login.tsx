import React, { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
	const auth = getAuth();
	const navigate = useNavigate();
	const [authing, setAuthing] = useState(false);

	const signInWithGoogle = async () => {
		setAuthing(true);

		signInWithPopup(auth, new GoogleAuthProvider())
			.then((response) => {
				console.log(response.user.uid);
				navigate("/");
			})
			.catch((error) => {
				console.log(error);
				setAuthing(false);
			});
	};

	return (
		<div>
			<p>Login Page</p>
			<Button
				sx={{
					backgroundColor: "#4285f4",
					color: "white",
					borderRadius: "5px",
					"&:hover": {
						backgroundColor: "#357ae8",
					},
				}}
				variant='contained'
				endIcon={<GoogleIcon />}
				onClick={() => signInWithGoogle()}
				disabled={authing}
			>
				Sign in with Google
			</Button>
		</div>
	);
};

export default LoginPage;
