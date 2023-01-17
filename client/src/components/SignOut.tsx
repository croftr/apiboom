import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { Button } from "@mui/material";

export interface IHomePageProps {}

const Signout: React.FunctionComponent<IHomePageProps> = (props) => {
	const auth = getAuth();

	return (
		<div>
			<Button
				sx={{
					backgroundColor: "#4285f4",
					color: "white",
					borderRadius: "5px",
					"&:hover": {
						backgroundColor: "#357ae8",
					},
				}}
				onClick={() => signOut(auth)}
			>
				Sign out
			</Button>
		</div>
	);
};

export default Signout;
