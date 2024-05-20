import { useState } from 'react';
import Modal from 'react-modal';
import { Link, useLocation } from 'react-router-dom';

import EventModal from '../EventModal/EventModal';

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
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
        <span>{date}</span>
        <ul>
          <li>
            <button type='button' onClick={handleClick}>Register</button>
          </li>
          <li>
            <Link to={`/event/${eventId}`} state={location}>
              <button type='button'>View</button>
            </Link>
          </li>
        </ul>
      </div>

      <EventModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        eventId={eventId}
      />
    </>
  )
};

export default Event;
