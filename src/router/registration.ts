import express from 'express';

import { register } from '../controllers/registration';

export default (router: express.Router) => {
    router.post('/register',register);
    return router;
}