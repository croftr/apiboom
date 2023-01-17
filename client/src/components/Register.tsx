import {
	Alert,
	Button,
	FormControl,
	TextField,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormValues } from "../types/types";

interface RegisterProps {
	onSubmit: (serviceName: string, email: string, password: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onSubmit }) => {
	const [formValues, setFormValues] = useState<FormValues>({
		serviceName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	// const { currentUser, register } = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		// if (formValues.password !== formValues.confirmPassword) {
		// 	setError("Passwords do not match");
		// 	return;
		// }
		// try {
		// 	await register({
		// 		serviceName: formValues.serviceName,
		// 		email: formValues.email,
		// 		password: formValues.password,
		// 	});
		// 	navigate("/login");
		// } catch (error: any) {
		// 	setError(error.message);
		// }
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	return (
		<FormControl
			style={{ border: "0px solid", width: "70vw" }}
			sx={{ m: 3 }}
			component='fieldset'
			variant='standard'
		>
			{error && <Alert severity='error'>{error} </Alert>}
			<Typography variant='subtitle2' gutterBottom>
				The Service name is used to create your URL and must be
				unique
			</Typography>
			{formValues.serviceName !== "" ? (
				<Typography variant='body1' gutterBottom>
					Your URL will be https://apiboom/
					{formValues.serviceName}/...
				</Typography>
			) : null}
			<TextField
				style={{ marginTop: 12 }}
				label='Service Name'
				variant='outlined'
				value={formValues.serviceName}
				onChange={handleInputChange}
			/>
			<TextField
				style={{ marginTop: 12 }}
				label='email'
				type='email'
				variant='outlined'
				value={formValues.email}
				onChange={handleInputChange}
			/>
			<TextField
				style={{ marginTop: 12 }}
				label='Password'
				type='password'
				variant='outlined'
				value={formValues.password}
				onChange={handleInputChange}
			/>
			<Button
				style={{ marginTop: 12 }}
				variant='contained'
				color='primary'
				onClick={handleSubmit}
			>
				Register
			</Button>
		</FormControl>
	);
};

export default Register;
