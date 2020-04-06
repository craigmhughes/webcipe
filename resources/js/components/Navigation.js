import React, {useState} from 'react';
import { Link, withRouter } from 'react-router-dom';

export default withRouter(function Navigation({ setActiveMenu, blur }){

    const [activeLink, setActiveLink] = useState(0);
    // menuActive = hover state of slide menu. activeMenu (passed as prop) = blur state to align w/ menuActive.
    const [menuActive, setMenuActive] = useState(false);

    // Footer nav items click event
    const navClick = (i)=>{
        if(i === 3){
            setMenuActive(!menuActive);
            setActiveMenu(!menuActive);
        } else {
            setActiveLink(i);
        }
    };

    // Control click event of overlay menu
    const overlayClick = (e)=>{
        if(e.target.className !== "overlay"){
            e.preventDefault();
        } else {
            setActiveMenu(!menuActive);
            setMenuActive(!menuActive);
        }
    };

    const slideContentUnauthed = ()=>{
        return(
            <section className="slide-menu__content">
                <p>Having an account means you can post your own recipes and save across other devices!</p>
                <Link to="/login" className="button">Login</Link>
            </section>
        );
    };

    const slideContentAuthed = ()=>{
        return(
            <section className="slide-menu__content">
                <p>Bruh</p>
            </section>
        );
    };

    return (
        <section className="navigation">
            <section className={`overlay${!menuActive ? "--hidden" : ""}`} onClick={(e)=>overlayClick(e)}>
                <section className={`slide-menu${!menuActive ? "--hidden" : ""}`}>
                    {localStorage.user ? slideContentAuthed() : slideContentUnauthed()}
                </section>
            </section>
            <nav className={`navigation__list ${blur ? "blur":""}`}>
                <Link to="/" className={`navigation__link ${activeLink === 0 ? "active" : ""}`} onClick={()=>navClick(0)}>
                    <img src={require("../../assets/icons/search.svg")}/>Explore
                </Link>

                <Link to="/" className={`navigation__link ${activeLink === 1 ? "active" : ""}`} onClick={()=>navClick(1)}>
                    <img src={require("../../assets/icons/bookmark.svg")}/>Saved
                </Link>
                
                <Link to="/" className={`navigation__link ${activeLink === 2 ? "active" : ""}`} onClick={()=>navClick(2)}>
                    <img src={require("../../assets/icons/shopping-basket.svg")}/>Ingredients
                </Link>
                
                <Link to="/" className={`navigation__link ${activeLink === 3 ? "active" : ""}`} onClick={()=>navClick(3)}>
                    <img src={require("../../assets/icons/bars.svg")}/>Menu
                </Link>
            </nav>
        </section>
    );
});