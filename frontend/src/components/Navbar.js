import '../css/Navbar.css'
import SchoolLogo from '../assets/reportheader1.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar">
            <img className="school-logo" src={SchoolLogo}></img>
            <div className="nav-links">
                <Link to="/staffView/create" style={{textDecoration: 'none', color: 'black'}}>
                    <h2>Create</h2>
                </Link>
                <Link to="/staffView/experiments" style={{textDecoration: 'none', color: 'black'}}>
                    <h2>Experiments</h2>
                </Link>
                <Link to="/staffView/logs" style={{textDecoration: 'none', color: 'black'}}>
                    <h2>Student Logs</h2>
                </Link>
            </div>
        </div>
    )
}

export default Navbar