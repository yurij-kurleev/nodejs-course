const UsersRepository = require('../repositories/users');

const UsersController = {
  create: async (req, res, next) => {
    try {
      const { body: newItem } = req;
      const userToCreate = await UsersRepository.findOneByEmail(newItem.email);
      if (userToCreate) {
        return res.status(409).send('User with that email already exists')
      }
      const createdItem = await UsersRepository.create(newItem);
      res.json(createdItem);
    } catch (err) {
      next(err);
    }
  },
  remove: async (req, res, next) => {
    try {
      const { params: { userId } } = req;
      const userToDelete = await UsersRepository.findOneById(userId);
      if (!userToDelete) {
        return res.status(404).send('User doesn\'t exist!')
      }
      await UsersRepository.remove(userId);
      res.json(userToDelete);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = UsersController;
