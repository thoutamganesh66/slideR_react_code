import React from 'react';
import { Link } from 'react-router-dom';
import './home.css'
import Group from '../assets/img/Group.png'
import PostsApp from './PostsApp';

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
                    <Link to="/postsapp" className="btn btn-dark mb-3 radius">Get Started</Link>        
                    <Link to="/upload" className="btn btn-light radius">Upload Slides</Link>
                    </div>
                </div>
                <div className="col-sm person">
                    <img src={Group}/>
                </div>
            </div>
        </div>
);

export default Home;