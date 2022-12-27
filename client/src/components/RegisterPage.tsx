import React, { useState } from "react";

import logo from '../APIBoomLogo.png'

import TextareaAutosize from '@mui/base/TextareaAutosize';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';

import {
	TextField,
	Paper,
	Avatar,
	FormGroup,
	FormControl,
	MenuItem,
	FormHelperText
} from "@mui/material";

import Select, { SelectChangeEvent } from '@mui/material/Select';

import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

interface RegisterPageProps {
	// Props go here
}

const RegisterPage: React.FC<RegisterPageProps> = (props) => {

	const [serviceName, setServiceName] = useState("");
	const [dataType, setDataType] = useState("text");
	const [data, setData] = useState("");

	const onChangeServiceName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setServiceName(event.target.value);
	};

	const handleChangeDataType = (event: SelectChangeEvent) => {
		setDataType(event.target.value as string);
	};


	const onChangeData = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setData(event.target.value);
	}

	const handleSubmit = () => {
		// event.preventDefault();

		const payload = {
			serviceName,
			dataType,
			data
		}

		// Send the data to the Node.js application using axios
		axios.post("http://localhost:3001/register", payload)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};



	return (
		<Paper id='chips' style={{ height: '100%' }}>
			<Avatar
				alt="Remy Sharp"
				src={logo}
				sx={{ width: 156, height: 156 }}
				style={{ position: 'absolute', right: 0 }}
			/>

			<FormControl style={{ border: '0px solid', width: '70vw' }} sx={{ m: 3 }} component="fieldset" variant="standard">
				
				<TextField
					value={serviceName}
					onChange={onChangeServiceName}
					id="outlined-basic"
					label="Service Name"
					variant="outlined"
				/>

				<Select
					style={{ marginTop: 12 }}
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={dataType}					
					onChange={handleChangeDataType}
				>
					<MenuItem value='text'>text</MenuItem>
					<MenuItem value='file'>file</MenuItem>
					<MenuItem value='directory'>directory</MenuItem>
					<MenuItem value='database'>database</MenuItem>
				</Select>
				<FormHelperText style={{ marginBottom: 12 }}>What format is your data in?</FormHelperText>

				{dataType === 'text' && (
					<TextareaAutosize
						value={data}
						onChange={onChangeData}
						aria-label="minimum height"
						minRows={10}
						placeholder="Your data in CSV format"
						style={{							
							border: '1px solid lightgrey'
						}}
					/>
				)}

				{dataType !== 'text' && (
					<Typography>{`${dataType} data not yet supported`}</Typography>
				)}

				<Button 					
					onClick={handleSubmit}
					style={{ marginTop: 12 }} 
					variant="contained">Submit
				</Button>

			</FormControl>

		</Paper>

	);
};

export default RegisterPage;
