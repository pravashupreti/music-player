const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/user', userRouter);

app.use((req, res, next) => {
    res.status(404).json({ error: req.url + ' API not supported!' });
});

app.use((err, req, res, next) => {
    if (err.message === 'NOT Found') {
        res.status(404).json({ error: err.message });
    } else {
        console.log(err)
        res.status(500).json({ error: 'Something is wrong! Try later' });
    }
});

app.listen(3000, () => console.log('listening to 3000...'));