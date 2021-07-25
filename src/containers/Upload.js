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
	  }
  }));

const Upload = () => {

	const classes = useStyles();

	const [department,setDepartment] = useState("");
	const [hashtag,setHashtag] = useState("");
	const [files,setFiles] = useState([]);

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
		uploadData.append('document',files[0],files[0].name);
		uploadData.append('department',"1");
		uploadData.append('hashtags',"HASHTAG 0");

		const url = 'http://localhost:8000/api/upload/';
		
		axios.post(url, uploadData, {
			headers: {
			  'content-type': 'multipart/form-data',
			  'Authorization': `JWT ${localStorage.getItem('access')}`
			}
		  })
		  .then(res => {
			console.log(res.data);
		  })
		  .catch(err => console.log(err))	
	}

	return(
		<div className="container">
			<div className="d-flex flex-column">
				
				<div className = "img ">
					<img src={UploadIMG}/>
				</div>

				<div className="dropbox p-2">
					<DropzoneAreaBase
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
						<label for="dept" className="mr-3" id="dept">Department</label>
						<Select
						value={department}
						name="department"
						onChange={(e) => setDepartment(e.target.value)}
						displayEmpty
						className={classes.selectEmpty}
						>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={"dept1"}>Dept1</MenuItem>
						<MenuItem value={"dept2"}>Dept2</MenuItem>
						<MenuItem value={"dept3"}>Dept3</MenuItem>
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
						<MenuItem value={"hash1"}>hash1</MenuItem>
						<MenuItem value={"hash2"}>hash2</MenuItem>
						<MenuItem value={"hash3"}>hash3</MenuItem>
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