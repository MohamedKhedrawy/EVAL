import { Link } from "react-router-dom";


const LandingPage = () => {
    return <>
        <h1>Landing Page</h1>
        <Link to={'/login'}>Log in</Link>
        <Link to={'/register'}>Register</Link>
    </>
}

export default LandingPage;