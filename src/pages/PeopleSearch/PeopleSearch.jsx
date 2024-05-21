import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

import { getSearchPeople } from '../../mockAPI';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import SearchList from '../../components/SearchList/SearchList';
import css from './PeopleSearch.module.css';

const PeopleSearch = () => {
  const [search, setSearch] = useState('');
  const [dataPeople, setDataPeople] = useState([]);
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
    setParams({ searchPeople: newFilter });
  };

  useEffect(() => {
    const SearchPeople = async () => {
      try {
        setError(false);
        setDataPeople([]);
        setIsLoading(true);

        const searchRequest = params.get('searchPeople');
        if (!searchRequest) {
          setDataPeople([]);
          return;
        }
        const data = await getSearchPeople(searchRequest);

        if (data.length === 0) {
          setDataPeople([]);
          return toast('Unfortunately, not found.', {
            style: {
              color: '#ffffff',
              backgroundColor: 'red',
            }
          })
        } else {
          setDataPeople(data);
        }
      } catch (error) {
        setError(true);
        setDataPeople([]);
      } finally {
        setIsLoading(false);
      }
    };
    SearchPeople();
  }, [params]);

  return (
    <>
      <form
        onSubmit={(evt) => {
          evt.preventDefault();
          submitOwnerFilter(search)
        }}
        className={css.form}>
        <input
          type='text'
          value={search}
          onChange={(evt) => { setSearch(evt.target.value) }}
          name='search'
          className={css.input}
        />
        <button type='submit' className={css.button}>People search</button>
      </form>

      {isLoading && <Loader />}
      {dataPeople.length > 0 && <SearchList people={dataPeople} />}
      {error && (
        <ErrorMessage
          message={'Failed to search people. Please try again later.'}
        />
      )}
      <Toaster position='top-right' containerStyle={{ zIndex: 99999999 }} />
    </>
  )
}

export default PeopleSearch;
