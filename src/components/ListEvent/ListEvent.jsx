import Event from '../Event/Event';
import css from './ListEvent.module.css';

const ListEvent = ({ events }) => {
  return (
    <ul className={css.list}>
      {events.length > 0 && events.map((event) => (
        <Event
          key={event.id}
          title={event.id}
          description={event.description}
          date={event.date}
          eventId={event.id}
        />
      ))}
    </ul>
  )
};

export default ListEvent;
