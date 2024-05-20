import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

import { fetchAllEventsByQuery } from '../../mockAPI';
import Loader from '../../components/Loader/Loader';
import ListEvent from '../../components/ListEvent/ListEvent';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from './EventSearch.module.css';

const EventSearch = () => {
  const [query, setQuery] = useState('');
  const [searchEvent, setSearchEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [params, setParams] = useSearchParams();

  const submitOwnerFilter = (newFilter) => {
    if (!newFilter) {
      return toast('Please enter a text', {
        style: {
          color: '#ffffff',
          backgroundColor: '#ff8c00',
        }
      });
    }
    setParams({ searchEvent: newFilter });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const searchRequest = params.get('searchEvent');
        if (!searchRequest) {
          setSearchEvent([]);
          return;
        }
        const data = await fetchAllEventsByQuery(searchRequest);
        if (data.length === 0) {
          return setError(true);
        }
        setSearchEvent(data);
        setError(false);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (params !== '') {
      fetchData();
    }
  }, [params]);

  return (
    <div>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          submitOwnerFilter(query)
        }}
        className={css.form}
      >
        <input
          type='text'
          value={query}
          onChange={(evt) => { setQuery(evt.target.value) }}
          name='search'
          className={css.input}
        />
        <button type='submit' className={css.button}>Event search</button>
      </form>

      {isLoading && <Loader />}
      {searchEvent.length > 0 && <ListEvent events={searchEvent} />}
      {error && (
        <ErrorMessage
          message={'Failed to search event. Please try again later.'}
        />
      )}
      <Toaster position='top-right' containerStyle={{ zIndex: 99999999 }} />
    </div>
  )
}

export default EventSearch;
