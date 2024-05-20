import { GrStatusGood } from 'react-icons/gr';

const People = ({ title, description, date }) => {
  return (
    <li>
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{date}</span>
      <GrStatusGood />
    </li>
  )
}

export default People;
