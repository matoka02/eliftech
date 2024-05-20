import Event from '../Event/Event';

const ListEvent = ({ events }) => {
  return (
    <ul>
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
