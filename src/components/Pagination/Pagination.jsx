import { useEffect, useState } from 'react';
import { totalPageNavigation } from '../../mockAPI';

const Pagination = ({ onPage }) => {
  const [arrayPage, setArrayPage] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const totalPages = Math.ceil((await totalPageNavigation()) / 10);
      const pagesArray = [];
      for (let i = 1; i <= totalPages; i++) {
        pagesArray.push(i);
      }
      setArrayPage(pagesArray);
    };
    fetchData();
  }, []);

  return (
    <ul>
      {arrayPage.map((element) => (
        <button key={element} onClick={() => onPage(element)}
        >{element}</button>
      ))}
    </ul>
  )
}

export default Pagination;
