import { GrStatusGood } from 'react-icons/gr';
import css from './People.module.css';

const People = ({ title, description, date }) => {
  return (
    <li className={css.item}>
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{date}</span>
      <GrStatusGood fontSize={'35px'} className={css.icons} />
    </li>
  )
}

export default People;
