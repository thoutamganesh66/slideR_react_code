import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { checkAuthenticated,load_user} from '../actions/auth';
import queryString from 'query-string';

const Layout = (props) => {

    useEffect(() => {
     
            props.checkAuthenticated();
            props.load_user();  
    }, []);

    return(
        <div>
            <Navbar/>
            {props.children}
        </div>
    );
}

export default connect(null, { checkAuthenticated, load_user}) (Layout);