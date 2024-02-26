import express from 'express';

import registration from './registration';
import users from './users';

const router = express.Router();

export default (): express.Router => {
    registration(router);
    users(router);
    return router;
}