import { transformObjToArr } from "./utility";
export const api = process.env.NEXT_PUBLIC_DB_URL;

//================== EVENTS ====================

export const getAllEvents = async () => transformObjToArr(await (await fetch(api + "events.json")).json());

export const getFeaturedEvents = async () => (await getAllEvents()).filter(event => event.isFeatured);

export const getEventById = async id => (await getAllEvents()).find(event => event.id === id);

export const getFilteredEvents = async ({ year, month }) => {
  return (await getAllEvents()).filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });
};
