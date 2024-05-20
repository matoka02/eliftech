import { Link } from 'react-router-dom';

import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <>
      <h2 className={css.error}>Opps, page not found, sorry! Please visit out {''}
        <Link to='/'>to home</Link>
      </h2>
    </>
  )
};

export default NotFoundPage;
