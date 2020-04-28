import React, {useState, useEffect} from 'react';
import { Link, withRouter } from 'react-router-dom';
// Images

export default withRouter(function Navigation({ setActiveMenu, blur, user, logout, isMobile, offline }){

    // Sets highlighted link in bottom navbar.
    const [activeLink, setActiveLink] = useState(0);

    // menuActive = hover state of slide menu. activeMenu (passed as prop) = blur state to align w/ menuActive.
    const [menuActive, setMenuActive] = useState(false);

    // Delegates which content to show in side nav.
    const [slideContent, setSlideContent] = useState(JSON.stringify(user));

    const [dropmenu, setDropmenu] = useState(false);
    

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
        let targetName = e.target.className;
        if(targetName !== "overlay" && (!targetName.includes("button-primary") && !targetName.includes("button-secondary"))){
            e.preventDefault();
        } else {
            setActiveMenu(!menuActive);
            setMenuActive(!menuActive);
        }
    };

    // Create side menu content for user who is not logged in
    const slideContentUnauthed = ()=>{
        return(
            <section className="slide-menu__content">
                <header>

                </header>
                <section className="slide-menu__content-main">
                    <p>Having an account means you can post your own recipes!</p>
                    <Link to="/login" className="button-primary">Login</Link>
                    <Link to="/register" className="button-secondary">Sign Up</Link>
                </section>
                <section>
                    
                </section>
                
            </section>
        );
    };

    // Create side menu content for user who is logged in
    const slideContentAuthed = ()=>{
        return(
            <article className="slide-menu__content">
                <header className="slide-menu__header">
                    <p className="slide-menu__name">{`Welcome, ${user.name.split(" ")[0]}.`}</p>
                </header>
                <section className="slide-menu__content-main">
                    <Link to="/user/recipes" className="button-primary slide-menu__link">My Recipes</Link>
                    <Link to="/recipes/new" className="button-primary slide-menu__create-link">Create Recipe</Link>
                </section>
                <section>
                    <button className="button" onClick={()=>logout()}>Log out</button>
                </section>
            </article>
        );
    };

    function MobileNavigation(){
        return(
            <nav className={`navigation__list ${blur ? "blur":""}`}>
                {!offline ? <Link to="/" className={`navigation__link ${activeLink === 0 ? "active" : ""}`} onClick={()=>navClick(0)}>
                    <img src="/assets/icons/search.svg"/>
                </Link> : null}
    
                <Link to="/saved" className={`navigation__link ${activeLink === 1 ? "active" : ""}`} onClick={()=>navClick(1)}>
                    <img src="/assets/icons/bookmark.svg"/>
                </Link>
                
                <Link to="/ingredients" className={`navigation__link ${activeLink === 2 ? "active" : ""}`} onClick={()=>navClick(2)}>
                    <img src="/assets/icons/shopping-basket.svg"/>
                </Link>
                
                {!offline ? <a className={`navigation__link ${activeLink === 3 ? "active" : ""}`} onClick={()=>navClick(3)}>
                    <img src="/assets/icons/bars.svg"/>
                </a> : null }
            </nav>
        );
    }
    
    function MobileOverlay(){
        return(
            <section className={`overlay${!menuActive ? "--hidden" : ""}`} onClick={(e)=>overlayClick(e)}>
                <section className={`slide-menu${!menuActive ? "--hidden" : ""}`}>
                    {slideContent}
                </section>
            </section>
        );
    }

    document.addEventListener("click",(e)=>{
        let ignore = ["navigation__profile-droplink", "dropmenu__link"];

        if(!ignore.includes(e.target.className)){
        setDropmenu(false);
        }
    });

    function DesktopNavAuth(){
        if(offline){
            return(
                <section className="navigation__auth">
                    <p class="navigation__offline">You are currently offline</p>
                    <a href="/" className="button-primary">Reconnect</a>
                </section>
            );
            
        } else if(user){
            return(
                <section className="navigation__auth">
                    <a className="navigation__profile-droplink" onClick={()=>setDropmenu(!dropmenu)}>
                        {user.name} <img src="/assets/icons/chevron-down.svg"/>
                    </a>
                    <div className={`dropmenu ${dropmenu ? "active" : ""}`}>
                        <Link to="/user/recipes" className="dropmenu__link">My recipes</Link>
                        <Link to="/recipes/new" className="dropmenu__link">Create new recipe</Link>
                        <button onClick={()=>logout()} className="dropmenu__link button">Log out</button>
                    </div>
                </section>
            );
        } else {
            return(
                <section className="navigation__auth">
                    <Link to="/login"  className="button-primary--light">Log in</Link>
                    <Link to="/register" className="button-primary">Create an account</Link>
                </section>
            );
        }
    }

    // Run on component mount and when user changes.
    useEffect(()=>{
        setSlideContent(user ? slideContentAuthed : slideContentUnauthed);
    }, [user]);

    return (     
        isMobile ? 
        <section className="navigation">
            <MobileOverlay/>
            {offline ? <a href="/" class="navigation__offline">You're offline <span>Reconnect?</span></a> : null}
            <MobileNavigation/>
        </section>
        :
        <section className="navigation">
            <div className="nav-container">
                <section className="navigation__sect">
                    <Link to={`${offline ? "/saved" : "/"}`}><img className="navigation__logo" src="/assets/images/webcipe-text.svg"/></Link>
                    <nav className="navigation__nav">
                        {!offline ? <Link to="/" className={`navigation-link${activeLink === 0 ? "--active" : ""}`}  onClick={()=>navClick(0)}>Explore</Link> : null}
                        <Link to="/saved" className={`navigation-link${activeLink === 1 ? "--active" : ""}`}  onClick={()=>navClick(1)}>Saved Recipes</Link>
                        <Link to="/ingredients" className={`navigation-link${activeLink === 2 ? "--active" : ""}`}  onClick={()=>navClick(2)}>Shopping List</Link>
                    </nav>
                </section>
                <DesktopNavAuth/>
            </div>
        </section>
            
    );
});