const EventsRepository = require('../repositories/events');
const EventsUsersRepository = require('../repositories/events_users');

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
  create: async (req, res, next) => {
    try {
      const { body: newItem } = req;
      const createdItem = await EventsRepository.create(newItem);
      if (newItem.participantsIds) {
        const eventsUsersData = newItem.participantsIds
          .map((participantId) => ({ userId: participantId, eventId: createdItem.id }));
        // don't need to wait until finish, can proceed next
        console.log('eventsUsersData', eventsUsersData)
        EventsUsersRepository.bulkCreate(eventsUsersData)
      }
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
      await EventsRepository.update(body, eventId);
      if (body.participantsIds) {
        const eventsUsers = await EventsUsersRepository.findByEventId(eventId)
        const newEventsUsers = body.participantsIds
          // leave only unique participants (not added)
          .filter((participantId) => {
            return !eventsUsers.find((eU) => eU.userId === participantId)
          })
          .map((participantId) => ({ userId: participantId, eventId }));
        // don't need to wait until finish, can proceed next
        EventsUsersRepository.bulkCreate(newEventsUsers)
      }
      res.json({
        ...eventToUpdate.dataValues,
        ...body
      });
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
