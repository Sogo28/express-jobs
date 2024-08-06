import fs from "fs/promises";
import { Request, Response, NextFunction } from "express";
import path from "path";
import url from "url";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";

const __filename = url.fileURLToPath(import.meta.url);
const __direname = path.dirname(__filename);


const logger = async (req: Request, res: Response, next: NextFunction) => {

  const message = `${req.method}\t${req.headers.origin}\t${req.url}`;
  const dateTime = `${format(new Date(), 'dd MM yyyy\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    await fs.appendFile(path.join(__direname, "..", 'logs', 'eventLog.txt'), logItem);
    next();
  } catch (error) {
    console.log(error);
  }

}

export default logger;
