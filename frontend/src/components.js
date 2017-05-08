import React from 'react'

const Layout = ({ main, navbar, debug }) => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-xs navbar">
                { navbar }
            </div>
        </div>
        <div className="row content">
            <div className="col-xs main">
                { main }
            </div>
            { debug }
        </div>
    </div>
)

const Navbar = () => (
    <nav className="navbar navbar-fixed-top bg-inverse navbar-dark">
        <a className="navbar-brand" href="#">Integrator</a>
        <ul className="nav navbar-nav">
            <li className="nav-item">
                <a className="nav-link" href="#">Home</a>
            </li>
        </ul>
    </nav>
)

export { Navbar, Layout }
