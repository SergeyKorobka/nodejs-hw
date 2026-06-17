import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { errorHandler } from './middleware/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errors } from 'celebrate';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_DOMAIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(logger);
app.use(cookieParser());

app.use(userRoutes);
app.use(authRoutes);
app.use(notesRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
