import { allowedOrigins } from "./allowedOrigins";

export const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  // methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  // allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  // exposedHeaders: ['Authorization'], // Headers exposed to the client
  credentials: true, // Allow cookies to be sent with requests
  // maxAge: 600, // Cache preflight request results for 10 minutes
  optionsSuccessStatus: 204 // Success status code for preflight requests
};