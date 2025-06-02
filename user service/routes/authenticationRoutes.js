
import  express from 'express';
const router = express.Router();
import authorization from '../middleware/authorization.js';
import {signup,login,getprofile,updateprofile,deleteprofile} from '../controller/authenticationController.js';

router.post('/signup',signup);
router.post('/login',login);
router.get('/getprofiledata/:userId',getprofile);
router.put('/updateprofile',updateprofile);
router.delete('/deleteprofile',deleteprofile);


export default router;