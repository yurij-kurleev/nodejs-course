const { Events_Users } = require('../models');
const {Op} = require('sequelize');

const EventsUsersRepository = {
  bulkCreate: async (eventsUsersData) => {
    try {
      console.log('Events_Users', Events_Users)
      console.log('eventsUsersData2', eventsUsersData)
      return await Events_Users.bulkCreate(eventsUsersData);
    } catch (error) {
      console.error('Error while creating Events_Users in EventsUsersRepository')
      throw error;
    }
  },
  findByEventId: async (eventId) => {
    try {
      return await Events_Users.findAll({
        where: {
          eventId: { [Op.eq]: +eventId }
        }
      });
    } catch (error) {
      console.error('Error while fetching Events_Users in EventsUsersRepository#findByEventId')
      throw error;
    }
  },
};

module.exports = EventsUsersRepository;
