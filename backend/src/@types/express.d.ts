/* eslint-disable-next-line */
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      sub?: string;
    }
  }
}
