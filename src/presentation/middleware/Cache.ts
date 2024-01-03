import { Request, Response, NextFunction } from 'express';

const setCache = (req: Request, res: Response, next: NextFunction) => {
    // Keep cache for 5 minutes (in seconds)
    const PERIOD = 60 * 5;

    if (req.method === 'GET') {
        res.set('Cache-control', `public, max-age=${PERIOD}`);
    } else {
        res.set('Cache-control', 'no-store');
    }

    next();
};

export default setCache;
