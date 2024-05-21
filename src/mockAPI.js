import axios from 'axios';
import toast from 'react-hot-toast';


axios.defaults.baseURL = 'https://6647822c2bb946cf2f9dfe43.mockapi.io';

export const fetchEvents = async (currentPage) => {
  const response = await axios.get('/api/v1/events', {
    params: {
      page: currentPage,
      limit: 10
    }
  });
  return response.data;
};

export const totalPageNavigation = async () => {
  const response = await axios.get('/api/v1/events');
  const totalEvents = response.data.length;
  return totalEvents;
};

export const fetchAllEventsByQuery = async (query) => {
  const response = await axios.get('/api/v1/events');
  const filteredEvents = response.data.filter((event) => event.title.includes(query) || event.date.includes(query));
  return filteredEvents;
};

export const addPeople = async (person, eventId) => {
  try {
    const response = await axios.get(`/api/v1/events/${eventId}`);
    const eventData = response.data;
    eventData.people.push(person);

    await axios.put(`/api/v1/events/${eventId}`, eventData);
    return toast('Successfully', {
      style: {
        color: '#ffffff',
        backgroundColor: 'green',
      }
    })
  } catch (error) {
    return toast('Oops, an error occurred.', {
      style: {
        color: '#ffffff',
        backgroundColor: 'red',
      }
    })
  }
};

export const getInfoPeople = async (eventId) => {
  const response = await axios.get(`/api/v1/events/${eventId}`);
  return response.data.people;
};

export const getSearchPeople = async (search) => {
  const response = await axios.get('/api/v1/events');
  console.log(response);
  const data = response.data.map((element) => ({
    ...element,
    people: element.people.filter(
      (person) => (person.fullName && person.fullName.toLowerCase() === search.toLowerCase()) || (person.email && person.email.toLowerCase() === search.toLowerCase())
    ),

  })).filter((element) => element.people.length > 0);
  return data;
};

