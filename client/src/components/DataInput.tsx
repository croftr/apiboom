import React, { useState } from "react";
import axios from "axios";

interface DataInputProps {
	// Props go here
}

const DataInput: React.FC<DataInputProps> = (props) => {
	const [databaseLink, setDatabaseLink] = useState("");
	const [file, setFile] = useState<File | undefined>();
	const [spreadsheet, setSpreadsheet] = useState<File | undefined>();
	const [inputType, setInputType] = useState("database"); // Set the initial input type to "database"

	const handleDatabaseLinkChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setDatabaseLink(event.target.value);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFile(event.target.files?.[0]);
	};

	const handleSpreadsheetChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setSpreadsheet(event.target.files?.[0]);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		let data: unknown;
		if (databaseLink) {
			// Retrieve data from the database using the provided link
			// and store it in the "data" variable
		} else if (file) {
			// Read the data from the file and store it in the "data" variable
		} else if (spreadsheet) {
			// Read the data from the spreadsheet and store it in the "data" variable
		}

		// Send the data to the Node.js application using axios
		axios.post("/api/data", data)
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
		>
			<p className='text-gray-700 text-sm'>Select an input type:</p>
			<div className='flex items-center justify-between'>
				<label className='inline-flex items-center mr-6'>
					<input
						className='form-radio'
						type='radio'
						name='input-type'
						value='database'
						checked={inputType === "database"}
						onChange={() => setInputType("database")}
					/>
					<span className='ml-2'>Database</span>
				</label>
				<label className='inline-flex items-center mr-6'>
					<input
						className='form-radio'
						type='radio'
						name='input-type'
						value='file'
						checked={inputType === "file"}
						onChange={() => setInputType("file")}
					/>
					<span className='ml-2'>File</span>
				</label>
				<label className='inline-flex items-center'>
					<input
						className='form-radio'
						type='radio'
						name='input-type'
						value='spreadsheet'
						checked={inputType === "spreadsheet"}
						onChange={() => setInputType("spreadsheet")}
					/>
					<span className='ml-2'>Spreadsheet</span>
				</label>
			</div>
			{inputType === "database" && (
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='database-link'
					>
						Database Link:
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='database-link'
						type='text'
						value={databaseLink}
						onChange={handleDatabaseLinkChange}
					/>
				</div>
			)}
			{inputType === "file" && (
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='file'
					>
						File:
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='file'
						type='file'
						onChange={handleFileChange}
					/>
				</div>
			)}
			{inputType === "spreadsheet" && (
				<div className='mb-4'>
					<label
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='spreadsheet'
					>
						Spreadsheet:
					</label>
					<input
						className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
						id='spreadsheet'
						type='file'
						onChange={handleSpreadsheetChange}
					/>
				</div>
			)}
			<div className='flex items-center justify-between'>
				<button
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
					type='submit'
				>
					Submit
				</button>
			</div>
		</form>
	);
};

export default DataInput;
