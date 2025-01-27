import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Look out world!');
});

app.post('/echo', express.json(), (req, res) => {
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
