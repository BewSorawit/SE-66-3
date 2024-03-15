// index.js
const app = require('./config/express');
const db = require('./database/db');
const { readdirSync } = require('fs');


const port = process.env.PORT || 3001;

readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
