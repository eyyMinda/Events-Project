import { transformObjToArr } from "./utility";
export const api = process.env.NEXT_PUBLIC_DB_URL;

export async function getAllEvents() {
  const response = await fetch(api + "events.json");
  const data = await response.json();
  return transformObjToArr(data);
}


export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter(event => event.isFeatured);
}


export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find(event => event.id === id);
}


export async function getFilteredEvents(dateFilter) {
  const allEvents = await getAllEvents();
  const { year, month } = dateFilter;

  return allEvents.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });
}