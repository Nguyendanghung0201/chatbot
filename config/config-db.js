var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'chatbot', 
    charset: 'utf8mb4'
  },

});

global.db = knex;
