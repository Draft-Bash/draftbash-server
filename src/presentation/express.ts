import express from 'express';
import usersRouter from './routes/users';

const app = express();

app.use(express.json());

app.use('/api/v1/users', usersRouter);

app.get('/', (req, res) => {
    res.send('The Draftbash api');
});

app.get('/test', (req, res) => {
    res.send('Coolio.');
});

export default app;