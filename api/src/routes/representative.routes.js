import express from 'express';
import { getRepsByAddress } from '../controllers/representative.controller.js';

const router = express.Router();

router.get('/', getRepsByAddress);

export default router;
