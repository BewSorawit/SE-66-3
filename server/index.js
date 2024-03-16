// index.js
const app = require('./config/express');
const db = require('./database/db');
const { readdirSync } = require('fs');

const port = process.env.PORT || 3001;

readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));


//   for pull the value and check the database data        LOGIN
app.post('/api/login',(req,res) => {  // this is important   youtube " create a registration from with react.js Express.js/Node.js & MySQL "   or    ologin and registration from using react + node + mysql | login and sign up from with validation
  const sql = " SELECT * FROM user WHERE  `email` = ?  AND `passwordUser` = ? " ;
  db.query(sql,[req.body.email,req.body.passworduser],(err,data) => {
      if(err) {
          return res.json("Error");
          // return res.json(err);
      }
      if(data.length > 0 ){
          return res.json("Success") ;
      }
      else{
          return res.json("Fail") ;
      }
  })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
