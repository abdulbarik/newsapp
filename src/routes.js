import { Router } from 'express';

/**
 * Contains all API routes for the application.
 */
const router = Router();


/** 
 * 
 * To check if server is up and responding.
 */
router.get('/status', (req, res) => {
  res.json({status:true, server:'Server up'});
});

export default router;
