require('dotenv').config();
const express = require('express');
const massive = require('massive');
const cors = require('cors');
const path = require('path');
const { CONNECTION_STRING, SERVER_PORT} = process.env;
const cntl = require('./controllers')

const app = express();

app.use(express.json());
app.use(cors());
// app.use(express.static(`${__dirname}../public/index.html`));

// app.get('*', (req, res) => { 
//     res.sendFile(path.join(__dirname, '../public/index.html'))
// })

app.get("/user/:name/:pass", cntl.getUser);
app.get("/lists/:id", cntl.getLists);
app.post("/lists/:id", cntl.addList);
app.post("/signup", cntl.signUp);
app.get("/items/:id", cntl.getItems);

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(db => {
    app.set('db', db);
    console.log('db connected')
    app.listen(SERVER_PORT, () => console.log(`Up on port ${SERVER_PORT}`))
});