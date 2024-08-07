import express from "express";
import userRouter from "./routes/users";
import authRouter from "./routes/auth";
import logger from "./middlewares/logger";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./config/corsOptions";
import { checkAllowedOrigins } from "./middlewares/checkAllowedOrigins";
import jobsRouter from "./routes/jobs";
import companyRouter from "./routes/company";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(checkAllowedOrigins);

// Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/companies', companyRouter);

app.listen(PORT, () => {
  console.log(`Server running in developpment mode on port ${PORT}`);
});