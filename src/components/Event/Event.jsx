import { useState } from 'react';
import Modal from 'react-modal';
import { Link, useLocation } from 'react-router-dom';

import EventModal from '../EventModal/EventModal';
import css from './Event.module.css';

const Event = ({ title, description, date, eventId }) => {
  Modal.setAppElement('#root');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const location = useLocation();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleClick = () => {
    openModal();
  };

  const dateOfEvents = new Date(date);
  const year = dateOfEvents.getFullYear();
  const month = dateOfEvents.getMonth() + 1;
  const day = dateOfEvents.getDay() + 1;
  const correctDateOfEvents = (day < 10 ? '0' + day.toString() + '.' : day.toString() + '.') + (month < 10 ? '0' + month.toString() : month.toString()) + '.' + year.toString();

  return (
    <>
      <li className={css.item}>
        <h2>{title}</h2>
        <p>{description}</p>
        <span>{correctDateOfEvents}</span>
        <ul className={css.btns}>
          <li>
            <button
              type='button'
              onClick={handleClick}
              className={css.clickBtn}
            >
              Register
            </button>
          </li>
          <li>
            <Link to={`/event/${eventId}`} state={location}>
              <button
                type='button'
                className={css.clickBtn}
              >
                View
              </button>
            </Link>
          </li>
        </ul>
      </li>

      <EventModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        eventId={eventId}
      />
    </>
  )
};

export default Event;
