const { User } = require('../models');

const UsersRepository = {
  findOneByEmail: async (email) => {
    try {
      return await User.findOne({ where: { email } })
    } catch (error) {
      console.error('Error while fetching user in UsersRepository#findOneByEmail')
      throw error;
    }
  },
  findOneById: async (userId) => {
    try {
      return await User.findByPk(userId)
    } catch (error) {
      console.error('Error while fetching user in UsersRepository#findOneById')
      throw error;
    }
  },
  create: async (newUserData) => {
    try {
      return await User.create(newUserData);
    } catch (error) {
      console.error('Error while creating user in UsersRepository')
      throw error;
    }
  },
  remove: async (userId) => {
    try {
      return await User.destroy({
        where: {
          id: userId,
        },
        individualHooks: true
      });
    } catch (error) {
      console.error('Error while deleting user in UsersRepository')
      throw error;
    }
  },
};

module.exports = UsersRepository;
