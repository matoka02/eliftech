import { useState } from 'react';
import Modal from 'react-modal';
import toast, { Toaster } from 'react-hot-toast';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { addPeople } from '../../mockAPI';
import css from './EventModal.module.css';

const EventModal = ({ isOpen, onRequestClose, eventId }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const validateDate = (value) => {
    const selected = new Date(value);
    const today = new Date();
    if (selected < today) {
      setSelectedDate(value);
      return value;
    } else {
      toast.error('Please select a past date', {
        style: {
          color: '#ffffff',
          backgroundColor: '#ff8c00',
        }
      });
      return '';
    }
  };

  const initialValues = {
    fullName: '',
    email: '',
    dateOfBirth: '',
    option: '',
  };

  const onSubmit = async (values) => {
    values.dateOfBirth = selectedDate;
    addPeople(values, eventId);
    onRequestClose();
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      maxWidth: '90%',
      maxHeight: '90%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      borderRadius: '10px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      overflow: 'hidden',
      transform: 'translate(-50%, -50%)',
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel='Modal form'
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        style={customStyles}
      >
        <div className={css.formContainer}>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <Form>

              <div className={css.formField}>
                <label htmlFor='fullName'>Full name</label>
                <Field id='fullName' name='fullName' type='text' required />
                <ErrorMessage name='fullName' component='div' className={css.errorMessage} />
              </div>

              <div className={css.formField}>
                <label htmlFor='email'>Email</label>
                <Field id='email' name='email' type='email' required />
                <ErrorMessage name='email' component='div' className={css.errorMessage} />
              </div>

              <div className={css.formField}>
                <label htmlFor='dateOfBirth'>Date of birth</label>
                <Field id='dateOfBirth' name='dateOfBirth' type='date' onChange={(evt) => { validateDate(evt.target.value) }} value={selectedDate} required />
                <ErrorMessage name='dateOfBirth' component='div' className={css.errorMessage} />

                <div className={css.radioGroup}>
                  <label>Where did you hear about this event?</label>
                  <div>
                    <label>
                      <Field name='option' type='radio' value='Social media' required />
                      Social media
                    </label>
                  </div>
                  <div>
                    <label>
                      <Field name='option' type='radio' value='Friends' required />
                      Friends
                    </label>
                  </div>
                  <div>
                    <label>
                      <Field name='option' type='radio' value='Found myself' required />
                      Found myself
                    </label>
                  </div>
                  <ErrorMessage name='option' component='div' className={css.errorMessage} />
                </div>

                <button
                  type='submit'
                  className={css.submitButton}
                >Send</button>

              </div>
            </Form>
          </Formik>
        </div>
      </Modal>

      <Toaster position='top-right' containerStyle={{ zIndex: 99999999 }} />
    </>
  )
};

export default EventModal;
