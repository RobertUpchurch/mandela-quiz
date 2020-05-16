import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';

//COMPONENTS
import { Link, useLocation } from 'react-router-dom';

//STYLES
import './base.scss'

const Header = () => {
    
    const { app } = useContext(AppContext);
    const { APP_NAME, PAGES, BREAK_POINT } = app;
    const LOCATION = useLocation().pathname;

    const [isMobile, set_isMobile] = useState(window.innerWidth < BREAK_POINT);
    const [open, set_open] = useState(false);

    const handleResize = () => {
        set_isMobile(window.innerWidth < BREAK_POINT);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    });


    const handleOpen = () => {
        let new_open = !open;
        set_open(new_open);
    }

    if (isMobile) {
        return (
            <div>
                <div className="hdr bg-1 clr-w">
                    <div className="hdr_section hdr_left">
                        <Link to="/">
                            <div className="hdr_item clr-w">
                                <h2>{APP_NAME}</h2>
                            </div>
                        </Link>
                    </div>
                    <div className="hdr_section hdr_right">
                        <div className="hdr_item">
                            <p name='bars' onClick={handleOpen}>Menu</p>
                        </div>
                    </div>
                </div>
                <div className={open ? "hdr_dropdown" : "hdr_dropdown_hidden"} onClick={handleOpen}>
                    {PAGES.map(page => {
                        return (
                            <Link key={page.name} className="clr-w" to={page.path}>
                                <div className="hdr_drp_item brdr-b bg-1" onClick={handleOpen}>
                                    {page.name}
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return (
            <div className="hdr bg-1">
                <div className="hdr_section hdr_left">
                    <Link to="/">
                        <div className="hdr_item">
                            <h2 className="clr-w">{APP_NAME}</h2>
                        </div>
                    </Link>
                    {PAGES.map(page => {
                        if (page.side === "left") {
                            return (
                                <Link key={page.name} className="clr-w" to={page.path}>
                                    <div className={LOCATION === page.path ? "underline-w hdr_item" : "hdr_item"}>
                                        <h4>{page.name}</h4>
                                    </div>
                                </Link>
                            )
                        }
                        return null
                    })}
                </div>
                <div className="hdr_section hdr_right">
                    {PAGES.map(page => {
                        if (page.side === "right") {
                            return (
                                <Link key={page.name} className="clr-w" to={page.path}>
                                    <div className={LOCATION === page.path ? "underline-w hdr_item" : "hdr_item"}>
                                        <h4>{page.name}</h4>
                                    </div>
                                </Link>
                            )
                        }
                        return null
                    })}
                </div>
            </div>
        )
    }
};

export default Header;