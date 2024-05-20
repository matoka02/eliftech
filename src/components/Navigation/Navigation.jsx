import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';

const Navigation = () => {
  return (
    <>
      <nav className={css.nav}>
        <NavLink to='/' className={css.link}>Home</NavLink>
        <NavLink to='/event' className={css.link}>Event</NavLink>
        <NavLink to='/peopleSearch' className={css.link}>People</NavLink>
      </nav>
    </>
  )
}

export default Navigation;
