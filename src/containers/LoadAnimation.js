import React, {useState} from 'react';
import Loader from "react-loader-spinner";

const LoadAnimation = () => {
    return (
        <div className="center">
        <Loader
            type="Puff"
            color="#00BFFF"
            height={200}
            width={200}
            timeout={5000} //5 secs
        />
      </div>
    );
}

export default LoadAnimation;