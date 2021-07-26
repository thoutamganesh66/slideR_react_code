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
	"Oliver Hansen",
	"Van Henry",
	"April Tucker",
	"Ralph Hubbard",
	"Omar Alexander",
	"Carlos Abbott",
	"Miriam Wagner",
	"Bradley Wilkerson",
	"Virginia Andrews",
	"Kelly Snyder"
];


const Upload = () => {

	const classes = useStyles();

	const [hashtag,setHashtag] = useState("");
	const [files,setFiles] = useState([]);
	const [uploaded,isUploaded] = useState(false);

	const [selectedDepartment, setSelectedDepartment] = useState([]);
  	const isAllSelectedDepartment =
    	options.length > 0 && selectedDepartment.length === options.length;

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
		uploadData.append('department',selectedDepartment);
		uploadData.append('hashtags',hashtag);

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
						<div>
						<label for="hashtags" className="mr-3" id="hashtags">Hashtags</label>
						<Select
						value={hashtag}
						name="hashtags"
						onChange={(e) => setHashtag(e.target.value)}
						displayEmpty
						className={classes.selectEmpty}
						>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={"HASHTAG 0"}>Hashtag 0</MenuItem>
						<MenuItem value={"HASHTAG 1"}>Hashtag 1</MenuItem>
						<MenuItem value={"HASHTAG 2"}>Hashtag 2</MenuItem>
						</Select>
						</div>
					</FormControl>
				</div>
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