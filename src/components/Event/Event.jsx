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
  
  return (
    <>
      <li className={css.item}>
        <h2>{title}</h2>
        <p>{description}</p>
        <span>{date.split('T')[0]}</span>
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
