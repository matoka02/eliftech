import People from '../People/People';
import css from './SearchList.module.css';

const SearchList = ({ people }) => {
  return (
    <ul className={css.list}>
      {people.length > 0 && people.map((item) => (
        <People
          key={item.id}
          title={item.title}
          description={item.description}
          date={item.date.split('T')[0]}
        />
      ))}
    </ul>
  )
}

export default SearchList;
