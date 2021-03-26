const router =require('express').Router();
const messageController=require('../controllers/messaging');
const isAuth=require('../helper/isAuth');


router.post('/sendmessage',isAuth,messageController.sendMessage);
router.get('/getmessages',isAuth,messageController.getMessages);
router.get('/getchats',isAuth,messageController.getAllChats);

module.exports = router;