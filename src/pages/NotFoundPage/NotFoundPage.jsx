import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <h2>Opps, page not found, sorry! Please visit out {''}
        <Link to='/'>to home</Link>
      </h2>
    </>
  )
};

export default NotFoundPage;
