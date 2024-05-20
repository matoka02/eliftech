const PeopleInfo = ({ info }) => {
  return (
    <>
      <li>
        <h3>{info.fullName}</h3>
        <p>{info.email}</p>
      </li>
    </>
  )
};

export default PeopleInfo;
