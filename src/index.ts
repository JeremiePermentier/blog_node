import express from 'express';
import morgan from 'morgan';
import path from 'path';
import index from './routes';
import cors from 'cors';
require('./config/db');

const app: express.Application = express();
const port: string = process.env.port || '3000';

app.use(morgan('short'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(index);

app.listen(port);