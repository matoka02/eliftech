import css from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
  return (
    <div>
      <b className={css.error}>{message}</b>
    </div>)
}

export default ErrorMessage;
