// require('dotenv').config();
const express = require('express');
const massive = require('massive');
const cors = require('cors');
const path = require('path');
const { DATABASE_URL } = process.env;
const { PORT } = process.env || 7777;
const cntl = require('./controllers')

const app = express();

app.use(express.json());
app.use(cors());
// app.use(express.static(`${__dirname}../public/index.html`));
app.use(express.static(path.resolve(__dirname, "../build")))

app.get("/user/:name/:pass", cntl.getUser);
app.get("/lists/:id", cntl.getLists);
app.post("/lists/:id", cntl.addList);
app.patch("/lists/:id", cntl.updateList);
app.delete("/lists/:id", cntl.deleteList);
app.post("/signup", cntl.signUp);
app.get("/items/:id", cntl.getItems);
app.post("/items/:id", cntl.addItem);
app.patch("/items/:id", cntl.updateItem);
app.delete("/items/:id", cntl.deleteItem);

app.get('*', (req, res) => { 
    res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

massive({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }
}).then(db => {
    app.set('db', db);
    console.log('db connected')
    app.listen(PORT, () => console.log(`Up on port ${PORT}`))
});