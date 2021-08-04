import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { logout } from '../actions/auth';

const Navbar = ({logout, isAuthenticated}) => {
    const [redirect,setRedirect] = useState(false);

    const logout_user = () => {
        logout();
        setRedirect(true);
    }

    const guestLinks = () => (
        <>
            <Link to="/login" class="btn btn-light mr-2">Login</Link>
            <Link to="/signup" class="btn btn-light mr-2">Sign Up</Link>
        </>
    );

    const authLinks = () => (
        <a href='/' class="btn btn-light mr-2" onClick={logout_user}>Logout</a>
    );

    if(redirect){
        window.alert("logout successful");
    }

    return(
        <>
            <div className="color">
                <nav className="navbar navbar-light">
                    <div className="container-fluid">
                        <h5>SlideR</h5>
                        <form className="d-flex">
                            <input className="form-control me-2 mr-1" type="search" placeholder="Search" aria-label="Search" size="70"/>
                            <button type="button" class="btn btn-dark">Search</button>
                        </form>
                        <div className="d-flex">
                        <Link to="/" class="btn btn-light mr-2">Home</Link>
                        {isAuthenticated ? authLinks() : guestLinks()}
                        </div>
                    </div>
                </nav>
                {redirect ? <Redirect to='/' /> : <> </>}
            </div>
        </>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {logout}) (Navbar);