import express from 'express';
import dotenv from 'dotenv';
import router from './routes/routes';
import cors from 'cors';

const app = express();
dotenv.config();

app.get('/', (req, res) => {
  res.send('Welcome! SaferRoad App');
});

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/v1/', router);

const { PORT } = process.env;

app.listen(PORT, () => console.log(`Server running on port ${ PORT }`));
