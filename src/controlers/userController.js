/*
Create
Read
Update
Delete
*/
/*const U */

const users = require('../mocks/users');

module.exports = {
  listUsers(request, response) {
    const { order } = request.query;

    const sortedUsers = users.sort((a, b) => {
      if (order === 'desc') {
        return b.id - a.id;
      }
      return a.id - b.id;
    });

    response.status(200).send(sortedUsers);
  },

  getUserById(request, response) {
    const { id } = request.params;

    const user = users.find((user) => user.id === parseInt(id, 10));

    if (!user) {
      return response.status(404).send({ error: 'User not found' });
    }
    response.status(200).send(user);
  },

  createUser(request, response) {
    let body = '';

    request.on('data', (chunk) => { body += chunk });
    request.on('end', () => {
      try {
        body = JSON.parse(body);
      } catch (error) {
        return response.status(400).send({ error: 'Invalid JSON' });
      }

      if (!body.name) {
        return response.status(400).send({ error: 'Name is required' });
      }

      const lastUserId = users[users.length - 1].id;
      const newUser = {
        id: lastUserId + 1,
        name: body.name,
      };

      users.push(newUser);
      response.status(201).send(newUser); // 201 Created
    });
  },
};
