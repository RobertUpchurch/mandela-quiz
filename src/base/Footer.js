import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';

const Footer = (props) => {

    const { app } = useContext(AppContext);
    const { APP_NAME, PAGES, SLOGAN } = app;

    return (
        <div className="ftr bg-b clr-w">
            <div className="ftr_section">
                <div className="footer_sub_section">
                    <h1>{APP_NAME}</h1>
                    <h3>{SLOGAN}</h3>
                    <h5>All Rights Reserved. {APP_NAME} 2020</h5>
                </div>
            </div>
            <div className="ftr_section">
                <div className="footer_sub_section">
                    <h3 className="underline">Navigation</h3>
                    {PAGES.map(page => {
                        return (
                            <h4 key={page.name}>
                                <Link to={page.path}>{page.name}</Link>
                            </h4>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Footer