// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
var mysql      = require('mysql');
const deleteNewestTask = () =>{
  var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    database : 'tsharingdb'
  });
  connection.connect();
  connection.query('DELETE FROM Tasks WHERE id = (select max from (SELECT MAX(t.id) as max FROM Tasks as t) as deletedId)', function (error, results, fields) {
    if (error) throw error;
    connection.end();
  });
  return null;
};

const deleteNewestUser = () =>{
  var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    database : 'tsharingdb'
  });
  connection.connect();
  connection.query('DELETE FROM Users WHERE id = (select max from (SELECT MAX(u.id) as max FROM Users as u) as deletedId)', function (error, results, fields) {
    if (error) throw error;
    connection.end();
  });
  return null;
};

const deleteNewestBoard = () =>{
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  database : 'tsharingdb'
});
  connection.connect();
  connection.query('DELETE FROM Boards WHERE id = (select max from (SELECT MAX(b.id) as max FROM Boards as b) as deletedId)', function (error, results, fields) {
    if (error) throw error;
    connection.end();
  });
  return null;
};

module.exports = (on) => {
  on('task', {
    'deleteTask' () {
        return deleteNewestTask();
      },
    'deleteUser' () {
        return deleteNewestUser();
    },
    'deleteBoard' () {
        return deleteNewestBoard();
    }
  })
}