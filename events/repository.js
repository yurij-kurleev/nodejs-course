const path = require('path');
const fs = require('fs');
const { readFile, writeFile, mapRowOnHeaderTransformStream } = require('./csv_file_helper');

/* Events Schema
* id
* title
* description
* location
* timestamp
*/

const eventsFilePath = path.join('.', 'events', 'events.csv')

const EventsRepository = {
  batchFind: () => {
    return fs.createReadStream(eventsFilePath).pipe(mapRowOnHeaderTransformStream);
  },
  find: async (location) => {
    try {
      const events = await readFile(eventsFilePath);
      if (!location || location === 'all') {
        return events;
      }
      return events.filter((event) => event.location === location);
    } catch (err) {
      throw err;
    }
  },
  findOne: async (id) => {
    try {
      const events = await readFile(eventsFilePath);
      return events.find((event) => event.id === id);
    } catch (err) {
      throw err;
    }
  },
  update: async (newEvent) => {
    try {
      const events = await readFile(eventsFilePath);
      const eventToReplaceIndex = events.findIndex((event) => event.id === newEvent.id)
      if (eventToReplaceIndex !== -1) {
        events.splice(eventToReplaceIndex, 1, newEvent);
        await writeFile(events, eventsFilePath);
        return newEvent;
      }
      return null;
    } catch (error) {
      throw error;
    }
  },
  create: async (newEvent) => {
    try {
      const events = await readFile(eventsFilePath);
      events.push(newEvent);
      await writeFile(events, eventsFilePath);
      return newEvent;
    } catch (err) {
      throw err;
    }
  },
  remove: async (id) => {
    try {
      const events = await readFile(eventsFilePath);
      const eventToDeleteIndex = events.findIndex((event) => event.id === id)
      if (eventToDeleteIndex !== -1) {
        events.splice(eventToDeleteIndex, 1);
        await writeFile(events, eventsFilePath);
        return id;
      }
      return null;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = EventsRepository;
