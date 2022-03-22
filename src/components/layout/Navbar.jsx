import { Link } from 'react-router-dom';

function Navbar({ handleLogout, currentUser }) {
  //if the user is logged in

  const loggedIn = (
    <>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/">
          <span onClick={handleLogout}>Log-out</span>
        </Link>
      </li>
    </>
  );
  //if the user is logged out
  const loggedOut = (
    <>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Log-in</Link>
      </li>
    </>
  );

  return (
    <div>
      <h1>Navbar</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      {currentUser ? loggedIn : loggedOut}
      </ul>
    </div>
  );
}

export default Navbar;
