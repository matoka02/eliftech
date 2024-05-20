import People from '../People/People';

const SearchList = ({ people }) => {
  return (
    <ul>
      {people.length > 0 && people.map((item) => (
        <People
          key={item.id}
          title={item.title}
          description={item.description}
          date={item.date}
        />
      ))}
    </ul>
  )
}

export default SearchList;
