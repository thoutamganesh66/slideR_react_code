import React, {useState} from 'react';
import { DropzoneAreaBase} from "material-ui-dropzone";
import './upload.css';
import UploadIMG from '../assets/img/UploadIMG.png'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(3, 0, 6),
    },
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	  },
	  selectEmpty: {
		marginTop: theme.spacing(2),
	  },
	  indeterminateColor: {
		color: "#f50057"
	  },
	  selectAllText: {
		fontWeight: 500
	  },
	  selectedAll: {
		backgroundColor: "rgba(0, 0, 0, 0.08)",
		"&:hover": {
		  backgroundColor: "rgba(0, 0, 0, 0.08)"
		}
	  }
  }));

const options = [
	"CIVIL",
	"CSE",
	"MECH",
	"MME"
];

const options2 = [
	"Simple",
	"Complex",
	"Elegant",
	"Stylish"
];

const Upload = () => {

	const classes = useStyles();

	const [hashtag,setHashtag] = useState("");
	const [files,setFiles] = useState([]);
	const [uploaded,isUploaded] = useState(false);

	const [selectedDepartment, setSelectedDepartment] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState([]);
  	const isAllSelectedDepartment =
    	options.length > 0 && selectedDepartment.length === options.length;

	const isAllSelectedCategory =
    	options2.length > 0 && selectedCategory.length === options2.length;

	const onNameChange = (e) => {
		setFileName(e.target.value);
	}

	const handleChange2 = (event) => {
		const value = event.target.value;
		if (value[value.length - 1] === "all") {
		  setSelectedDepartment(
			selectedDepartment.length === options.length ? [] : options
		  );
		  return;
		}
		setSelectedDepartment(value);
	};

	const [filename,setFileName]=useState("");
	const handleChange3 = (event) => {
		const value = event.target.value;
		if (value[value.length - 1] === "all") {
		  setSelectedCategory(
			selectedCategory.length === options2.length ? [] : options2
		  );
		  return;
		}
		setSelectedCategory(value);
	};

    const handleAdd = newFiles => {
        newFiles = newFiles.filter(file => !files.find(f => f.data === file.data));
        setFiles([...files, ...newFiles]);
    };

    const handleDelete = deleted => {
        setFiles(files.filter(f => f !== deleted));
    };

	const submitHandler = (e) => {
		e.preventDefault();
		const uploadData = new FormData();
		uploadData.append('document',files[0].file,files[0].file.name);
		uploadData.append('department',selectedDepartment.join(","));
		uploadData.append('hashtags',selectedCategory.join(","));
		uploadData.append('name',filename);

		const url = 'http://localhost:8000/api/upload/';
		
		axios.post(url, uploadData, {
			headers: {
			  'content-type': 'multipart/form-data',
			  'Authorization': `JWT ${localStorage.getItem('access')}`
			}
		  })
		  .then(res => {
			console.log(res.data);
			isUploaded(true);
			window.alert("Upload Successful");
		  })
		  .catch(err => console.log(err))	
	}

	if(uploaded){
        return <Redirect to='/' />
    }

	return(
		<div className="container">
			<div className="d-flex flex-column">
				
				<div className = "img ">
					<img src={UploadIMG}/>
				</div>

				<div className="dropbox p-2">
					<DropzoneAreaBase
					type="file"
					name="files"
					fileObjects={files}
					onAdd={handleAdd}
					onDelete={handleDelete}
					dropzoneClass="box"
					/>
				</div>
			</div>
			<div className="d-flex flex-row">
				<div className="ml">
					<FormControl className={classes.formControl}>
						<div className="mr-5">
						<label for="dept" className="mr-3" id="department">Department</label>
						<Select
						value={selectedDepartment}
						name="department"
						multiple
						onChange={handleChange2}
						renderValue={(department) => department.join(",")}
						className={classes.selectEmpty}
						>
						<MenuItem
							value="all"
							classes={{
								root: isAllSelectedDepartment ? classes.selectedAll : ""
							}}
							>
							<ListItemIcon>
								<Checkbox
								classes={{ indeterminate: classes.indeterminateColor }}
								checked={isAllSelectedDepartment}
								indeterminate={
									selectedDepartment.length > 0 &&
									selectedDepartment.length < options.length
								}
								/>
							</ListItemIcon>
							<ListItemText
								classes={{ primary: classes.selectAllText }}
								primary="Select All"
							/>
						</MenuItem>
						{options.map((option) => (
							<MenuItem key={option} value={option}>
								<ListItemIcon>
								<Checkbox checked={selectedDepartment.indexOf(option) > -1} />
								</ListItemIcon>
								<ListItemText primary={option} />
							</MenuItem>
						))}
						</Select>
						</div>
					</FormControl>
				</div>
				<div className="mr">
					<FormControl className={classes.formControl}>
						<div className="mr-5">
						<label for="cat" className="mr-3" id="category">Category</label>
						<Select
						value={selectedCategory}
						name="category"
						multiple
						onChange={handleChange3}
						renderValue={(category) => category.join(",")}
						className={classes.selectEmpty}
						>
						<MenuItem
							value="all"
							classes={{
								root: isAllSelectedCategory ? classes.selectedAll : ""
							}}
							>
							<ListItemIcon>
								<Checkbox
								classes={{ indeterminate: classes.indeterminateColor }}
								checked={isAllSelectedCategory}
								indeterminate={
									selectedCategory.length > 0 &&
									selectedCategory.length < options2.length
								}
								/>
							</ListItemIcon>
							<ListItemText
								classes={{ primary: classes.selectAllText }}
								primary="Select All"
							/>
						</MenuItem>
						{options2.map((option) => (
							<MenuItem key={option} value={option}>
								<ListItemIcon>
								<Checkbox checked={selectedCategory.indexOf(option) > -1} />
								</ListItemIcon>
								<ListItemText primary={option} />
							</MenuItem>
						))}
						</Select>
						</div>
					</FormControl>					
				</div>
			</div>

			<div className="text-center">
				<label className="uploadfilename">Name:</label>
				<TextField id="name" name="name" label="Enter name of file" value={filename} onChange={ e => onNameChange(e)}/>
			</div>
			<div className="center">
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					onClick={(e) => submitHandler(e)}
				>
					Upload
				</Button>
			</div>
		</div>
	);

};

export default Upload;