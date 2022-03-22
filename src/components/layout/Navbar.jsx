import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <h1>Navbar</h1>
      <ul>
        <li><Link to='/'>Home</Link></li>
        {/* if the user is logged in  */}
        <li><Link to='/profile'>Profile</Link></li>
        <li>
          <Link to='/'>
            <span>
              Log-out
            </span>
          </Link>
        </li>
        {/* if the user is logged out */}
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/login'>Log-in</Link></li>
      </ul>
    </div>
  );
}

export default Navbar;
