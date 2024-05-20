import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';

import { getInfoPeople } from '../../mockAPI';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import PeopleInfo from '../../components/PeopleInfo/PeopleInfo';
import css from './PeopleDetails.module.css';

const PeopleDetails = () => {
  const { eventId } = useParams();
  const [people, setPeople] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [query, setQuery] = useState('');
  const [params, setParams] = useSearchParams();

  const location = useLocation();
  const backLink = useRef(location.state || '/');

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
    const getPeople = async () => {
      try {
        setIsLoading(true);
        const data = await getInfoPeople(eventId);

        if (params.has('searchEvent')) {
          const filterQuery = params.get('searchEvent');
          const filterInfo = data.filter((item) =>
            item.fullName.includes(filterQuery) || item.email.includes(filterQuery));
          filterInfo.length > 0 ? setPeople(filterInfo) : toast('Unfortunately, no one has been found', {
            style: {
              color: '#ffffff',
              backgroundColor: '#ff8c00',
            },
          });
        } else {
          if (data.length === 0) {
            return setEmpty(true);
          }
          setPeople(data);
        }
      } catch (error) {
        return toast('Oops, an error occurred.', {
          style: {
            color: '#ffffff',
            backgroundColor: 'red',
          }
        })
      } finally {
        setIsLoading(false);
      }
    };
    getPeople();
  }, [eventId, params]);

  return (
    <div>
      <Link to={backLink.current} className={css.linkGoBack}>Go back {' '}</Link>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          submitOwnerFilter(query.trim());
          setQuery('');
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
        <button type='submit' className={css.button}>Search</button>
      </form>

      {isLoading && <Loader />}
      <ul className={css.list}>
        {people.length > 0 && people.map((infoPeople, index) => (
          <PeopleInfo key={index} info={infoPeople} />
        ))}
      </ul>
      {empty && (
        <ErrorMessage
          message={'Unfortunately, no one has registered.'}
        />
      )}
      <Toaster position='top-right' containerStyle={{ zIndex: 99999999 }} />

    </div>
  )
};

export default PeopleDetails;
