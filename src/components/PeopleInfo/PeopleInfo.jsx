import css from './PeopleInfo.module.css';

const PeopleInfo = ({ info }) => {
  return (
    <>
      <li className={css.item}>
        <h3>{info.fullName}</h3>
        <p>{info.email}</p>
      </li>
    </>
  )
};

export default PeopleInfo;
