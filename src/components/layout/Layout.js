import classes from './Layout.module.css';
import React from 'react';
import MainNavigation from './MainNavigation';
const Layout=(props)=>{
    return(
        <React.Fragment>
            <MainNavigation/>
            <main className={classes.main} >{props.children}</main>
        </React.Fragment>

    );
}

export default Layout;