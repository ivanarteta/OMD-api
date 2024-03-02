import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./topbar.css"

export const Topbar = () => {

    const [selectedTab, setSelectedTab] = useState(0);

    React.useEffect(() => {
        switch (location.pathname) {
            case "/":
                setSelectedTab(0);
                break;
            case "/search":
                setSelectedTab(1);
                break;
            default:
                setSelectedTab(0);
                break;
        }
    }, [location.pathname])

    return (
        <div className="topbar">
            <div className="navigation">
                <Link to={"/"} className={`${selectedTab === 0 ? 'selected' : ''}`} onClick={() => {setSelectedTab(0)}}>My movies</Link>
                <Link to={"/search"} className={`${selectedTab === 1 ? 'selected' : ''}`} onClick={() => {setSelectedTab(1)}}>Search</Link>
            </div>
        </div>
    )
}