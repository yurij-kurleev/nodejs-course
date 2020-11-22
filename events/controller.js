const EventsRepository = require('./repository');

const EventsController = {
  show: async (req, res, next) => {
    try {
      const { query: { location = 'all' } } = req;
      const events = await EventsRepository.find(location);
      res.json(events);
    } catch (err) {
      next(err);
    }
  },
  showOne: async (req, res, next) => {
    try {
      const { params: { eventId } } = req;
      const event = await EventsRepository.findOne(eventId);
      if (!event) {
        return res.status(404).end();
      }
      res.json(event);
    } catch (err) {
      next(err);
    }
  },
  batchShow: async (req, res, next) => {
    try {
      EventsRepository.batchFind().pipe(res);
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const { body: newItem } = req;
      const isEventExist = await EventsRepository.findOne(newItem.id);
      if (isEventExist) {
        return res.status(409).send('Event already exists!')
      }
      const createdItem = await EventsRepository.create(newItem);
      res.json(createdItem);
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const { body, params: { eventId } } = req;
      const eventToUpdate = await EventsRepository.findOne(eventId);
      if (!eventToUpdate) {
        return res.status(404).send('Event doesn\'t exist!')
      }
      const updatedItem = await EventsRepository.update({ ...eventToUpdate, ...body });
      res.json(updatedItem);
    } catch (err) {
      next(err);
    }
  },
  remove: async (req, res, next) => {
    try {
      const { params: { eventId } } = req;
      const eventToDelete = await EventsRepository.findOne(eventId);
      if (!eventToDelete) {
        return res.status(404).send('Event doesn\'t exist!')
      }
      await EventsRepository.remove(eventId);
      res.json(eventToDelete);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = EventsController;
