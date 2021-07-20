import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'
import Group from '../assets/img/Group.png'

const Home = () => (
    <div className="container-fluid home">
            <div>
                <h1 className="white text-left">Want to have great Slides for your projects</h1>
            </div>
            
            <div className="row">
                <div className="col-sm text-center">
                    <div className="box white">
                    <h5>We Deliver Great Slide Designs with Better content</h5>
                    </div>
                    <div class="btn-group-vertical box">
                    <Link to="/login" className="btn btn-dark mb-3 radius">Get Started</Link>        
                    <button type="button" className="btn btn-light radius">Upload Slides</button>
                    </div>
                </div>
                <div className="col-sm person">
                    <img src={Group}/>
                </div>
            </div>
        </div>
);

export default Home;