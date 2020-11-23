const {Op} = require('sequelize');
const { Event, User } = require('../models');

const EventsRepository = {
  find: async (location) => {
    try {
      let events = [];
      if (!location || location === 'all') {
        events = await Event.findAll({
          include: [
            {
              model: User,
              as: 'creator'
            },
            {
              model: User,
              as: 'participants',
              attributes: ['email', 'firstName'],
              through: { attributes: [] },
            }
          ]
        })
      } else {
        events = await Event.findAll({
          where: {
            location: {
              [Op.eq]: location
            }
          },
          include: [
            {
              model: User,
              as: 'creator'
            },
            {
              model: User,
              as: 'participants',
              attributes: ['email', 'firstName'],
              through: { attributes: [] },
            }
          ]
        })
      }
      return events;
    } catch (error) {
      console.error('Error while fetching events in Events repository')
      throw error;
    }
  },
  findOne: async (eventId) => {
    try {
      return await Event.findByPk(eventId)
    } catch (error) {
      console.error('Error while fetching event in Events repository')
      throw error;
    }
  },
  update: async (newEventData, eventId) => {
    try {
      return await Event.update(newEventData, {
        where: {
          id: eventId,
        }
      });
    } catch (error) {
      console.error('Error while updating event in Events repository')
      throw error;
    }
  },
  create: async (newEventData) => {
    try {
      return await Event.create(newEventData);
    } catch (error) {
      console.error('Error while creating event in Events repository')
      throw error;
    }
  },
  remove: async (eventId) => {
    try {
      return await Event.destroy({
        where: {
          id: eventId,
        }
      });
    } catch (error) {
      console.error('Error while deleting event in Events repository')
      throw error;
    }
  },
};

module.exports = EventsRepository;
