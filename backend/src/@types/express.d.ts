declare global {
  namespace Express {
    interface Request {
      sub?: string;
    }
  }
}
