const router = require('express').Router();
const usersMiddleware = require('./user-controller');
const saltMiddleware = require('../middlewares/salt');
const userCodeMiddleware = require('../middlewares/user_code');

router.post('/register', userCodeMiddleware, usersMiddleware.registerPostMid);
router.post('/login', saltMiddleware, usersMiddleware.loginPostMid); 
router.post('/check/email', usersMiddleware.checkEmailPostMid);
router.patch('/forget/password', usersMiddleware.forgetPasswordPatchMid);
router.post('/:user_code/profile', usersMiddleware.profilePostMid);
router.post('/:user_code/profile/info', usersMiddleware.profileInfoPostMid);
router.get('/:user_code', userCodeMiddleware, usersMiddleware.usercodeGetMid);
router.get('/:user_code/check-first-login', usersMiddleware.checkFirstLoginGetMid);
module.exports = router;