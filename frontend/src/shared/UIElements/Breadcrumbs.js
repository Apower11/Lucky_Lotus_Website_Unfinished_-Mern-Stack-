import React from 'react';
import './css/Breadcrumbs.css';

const Breadcrumbs = props => {
    return (
        <div className="breadcrumbs">
                <h1>{props.children}</h1>
        </div>
    )
}

export default Breadcrumbs;