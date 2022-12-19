import { Router } from 'express';
import config from '../config/config.js';
import os from 'os';
import compression from 'compression'

const router = Router();

/* GET Info. */
router.get('/info', compression(), function (_, res, next) {
    try {
        const data = {
            argv: config.argv,
            directory: process.cwd(),
            processID: process.pid,
            nodeVersion: process.version,
            processTitle: process.title,
            memoryUsage: process.memoryUsage().rss,
            so: process.platform,
            CPUs: os.cpus().length
        }
        res.status(201).json(data);
    }
    catch (e) {
        console.log(e.message);
        next(e);
    }
});

/* GET Info. */
router.get('/info-no-compression', function (_, res, next) {
    try {
        const data = {
            argv: config.argv,
            directory: process.cwd(),
            processID: process.pid,
            nodeVersion: process.version,
            processTitle: process.title,
            memoryUsage: process.memoryUsage().rss,
            so: process.platform,
            CPUs: os.cpus().length
        }
        res.status(201).json(data);
    }
    catch (e) {
        console.log(e.message);
        next(e);
    }
});

export default router;