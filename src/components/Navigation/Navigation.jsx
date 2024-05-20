import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/event'>Event</NavLink>
        <NavLink to='/peopleSearch'>People</NavLink>
      </nav>
    </>
  )
}

export default Navigation;
