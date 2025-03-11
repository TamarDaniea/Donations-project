
import { NavLink } from "react-router-dom";  
import './NavBar.css';  

const NavBar = (props) => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink 
                        to="/ListDontions" 
                        activeClassName="active"  
                    >
                        רשימת התרומות
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/AddDonatoin" 
                        activeClassName="active"
                    >
                        הוספת תרומה
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;






