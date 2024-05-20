import { useEffect, useState } from 'react';

import { fetchEvents } from '../../mockAPI';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import ListEvent from '../../components/ListEvent/ListEvent';
import Pagination from '../../components/Pagination/Pagination';
import css from './Home.module.css';

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function getEvents() {
      try {
        setEvents([]);
        setIsLoading(true);
        const data = await fetchEvents(currentPage);
        if (data.length === 0) {
          return setError(true);
        }
        setEvents(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getEvents();
  }, [currentPage]);

  return (
    <>
      <h1 className={css.title}>Home</h1>
      {isLoading && <Loader />}
      {events.length > 0 && <ListEvent events={events} />}
      {error && (
        <ErrorMessage
          message={'Failed to load event. Please try again later.'}
        />
      )}
      {events.length > 0 && <Pagination onPage={setCurrentPage} />}
    </>
  )
};

export default HomePage;
