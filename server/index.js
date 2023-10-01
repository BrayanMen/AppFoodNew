const server = require('./src/server.js');
require('dotenv').config()
// const { conn } = require('./src/db.js');

const PORT = process.env.PORT || 3001;


server.listen(PORT, () => {
  console.log(`%s listening at http://localhost:${PORT}`); // eslint-disable-line no-console
});
// conn.sync({ force: false }).then(() => {
// });