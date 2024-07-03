import React from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import './HomeNavBar.css'

function HomeNavBar() {
  const location = useLocation();
  return (

    <div className="container-fluid background">
      <div className="row">
        <div className="col-lg-3 col-auto col-md-2 col-sm-2 min-vh-100 d-flex flex-column border-end">
          {/* <SideNavBar /> */}
        </div>
        <div className="col-lg-6 col-md-10 col-sm-8 min-vh-100 d-flex flex-column content-area border-end">
          {/* <Outlet /> */}
        </div>
        <div className="col-lg-3 d-none d-lg-block min-vh-100 d-flex flex-column border-end">
          {/* {location.pathname.includes('/HomeNavBar/message') ? <MessageSuggestion /> : <Suggestion />} */}
        </div>
      </div>
    </div>
  );
}

export default HomeNavBar;
