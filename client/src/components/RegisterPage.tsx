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
	const [dataDesc, setDataDesc] = useState("");
	const [dataId, setDataId] = useState("");
	const [dataDetectionText, setDataDetectionText] = useState("");

	const [isFormValid, setIsFormValid] = useState(false);

	const onDetectDataFormat = (str: string) => {				
		if (/^\s*(\{[^\{\}]*\}|\[[^\[\]]*\])\s*$/.test(str)) {			
			setDataDetectionText('json');		
		} else if (/^\s*</.test(str)) {			
			setDataDetectionText('xml');
		} else if (/[,\n]/.test(str)) {			
			
			const rows:Array<String> = str.split('\n');

			const columnCount:number = rows[0].split(',').length;
			const rowCount:number = rows.length;

			setDataDetectionText(`csv: ${columnCount} columns ${rowCount} rows`);

		} else {			
			setDataDetectionText('plain text');
		}
	}

	//TODO check local values as state slow to update
	const validateForm = (type = dataType) => {
		// if (serviceName && data && dataDesc && dataId && type === 'text') {
		// 	setIsFormValid(true);
		// } else {
		// 	setIsFormValid(false);
		// }

		setIsFormValid(true);
	}

	const onChangeServiceName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setServiceName(event.target.value);
		validateForm();
	};

	const onChangeDataDesc = (event: React.ChangeEvent<HTMLInputElement>) => {

		const value: string = event.target.value

		setDataDesc(value);

		setDataId(value.split(' ')[0]);

		validateForm();
	};

	const onChangeDataId = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDataId(event.target.value);
		validateForm();
	};

	const handleChangeDataType = (event: SelectChangeEvent) => {

		const type: string = event.target.value as string
		validateForm(type);
		setDataType(type);

	};


	const onChangeData = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

		const data: string = event.target.value;

		setData(data);

		if (data) {
			onDetectDataFormat(event.target.value);
		}

		validateForm();
	}

	const handleSubmit = () => {

		const payload = {
			serviceName,
			dataType,
			data,
			dataDesc,
			dataId
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
					variant='outlined'
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

				<div style={{ display: 'flex' }}>

					<div style={{ flex: 3 }}>
						<TextField
							fullWidth
							value={dataDesc}
							label="Data description"
							placeholder='e.g cars I fixed or customer bookings'
							onChange={onChangeDataDesc}
							id="outlined-basic"
							variant="outlined"
						/>
						<FormHelperText style={{ marginBottom: 12 }}>Data description</FormHelperText>
					</div>

					<TextField
						style={{ flex: 1 }}
						value={dataId}
						onChange={onChangeDataId}
						id="outlined-basic"
						label="Data Id"
						variant="outlined"
					/>
				</div>

				<div id='dataDetection'>
					<Typography>{dataDetectionText}</Typography>
				</div>

				{dataType === 'text' && (
					<TextareaAutosize
						value={data}
						onChange={onChangeData}
						aria-label="minimum height"
						minRows={10}
						placeholder="Your data as plain text"
						style={{
							border: '1px solid lightgrey'
						}}
					/>
				)}



				{dataType !== 'text' && (
					<div style={{ padding: 8 }}>
						<Typography color='error'>{`${dataType} data not yet supported`}</Typography>
					</div>

				)}

				<Button
					disabled={!isFormValid}
					onClick={handleSubmit}
					style={{ marginTop: 12 }}
					variant="contained">Submit
				</Button>

			</FormControl>

		</Paper>

	);
};

export default RegisterPage;
