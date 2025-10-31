import express from 'express';
import {
  registerPhysiotherapist,
  getAllPhysiotherapists,
  getPhysiotherapistById,
  updatePhysiotherapist,
  loginPhysiotherapist,
  getDistricts,
  getSpecializations,
} from '../controllers/physiotherapistController.js';

const router = express.Router();

// Public routes
router.post('/register', registerPhysiotherapist);
router.post('/login', loginPhysiotherapist);
router.get('/', getAllPhysiotherapists);
router.get('/districts', getDistricts);
router.get('/specializations', getSpecializations);
router.get('/:id', getPhysiotherapistById);

// Protected routes (add auth middleware later)
router.put('/:id', updatePhysiotherapist);

export default router;
