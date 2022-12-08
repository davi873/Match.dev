import express from 'express'
import { routerAuth, routerSimplesNacional } from './routes';
import { requireJwtMiddleware } from './auth/Atuh';

const BASE_URL = '/api';
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(BASE_URL, routerAuth);
app.use(BASE_URL, requireJwtMiddleware, routerSimplesNacional, );

app.listen(PORT);

export { app }