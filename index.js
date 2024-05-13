
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express()

app.use(cors(
    {
        origin: [
            "http://localhost:5173",
            "https://cardoctor-bd.web.app",
            "https://cardoctor-bd.firebaseapp.com",
        ],
        credentials: true,
    }
))

app.get('/', (req, res) => {
    res.send("WOLCOME TO OUR HOTEL");
})

app.use(express.json())
app.listen(port, () => console.log(`server ranning on ${port}`))