const knex = require('knex');

const connection = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: 'INVENTORY.sqlite3',
    }
  });

  module.exports = connection;