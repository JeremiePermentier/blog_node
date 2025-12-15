import express from 'express';
import morgan from 'morgan';
import path from 'path';
import index from './routes';
import cors from 'cors';
import { setupSwagger } from './swagger';
import cookieParser from 'cookie-parser';
require('./config/db');

const app: express.Application = express();
const port: string = process.env.port || '3000';

app.use(morgan('short'));
app.use("/img", express.static(path.resolve("img")));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(cookieParser());
app.use(index);

setupSwagger(app);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
  console.log(`Swagger UI disponible sur http://localhost:${port}/api-docs`);
});