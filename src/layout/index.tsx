import React, { ReactElement } from "react";
import Navbar from "../components/Navbar/";
import './style.scss'

interface props {
    children: ReactElement;
}

//
const Layout: React.FC<props> = ({ children }: props) => {
    return (
        <div className="layout">
            <Navbar />
            {children}
        </div>)
};

export default Layout;
