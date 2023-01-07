const {
    register,
    login,
    profile,
    updateProfile,
    emailVerify,
    resendEmail,
    resetPassword,
    resetPasswordResponse,
    newPasswordCreate
} = require("../controllers/userController");
const {authVerifyMiddleware, isSuperAdmin} = require("../middleware/authVerifyMiddleware");
const router = require('express').Router();

router.post('/register', register)
router.post('/login', login);
router.get('/users', authVerifyMiddleware, profile)
router.put('/users', authVerifyMiddleware, updateProfile)
router.get('/email-verify/:email/:token', emailVerify);
router.get('/resend-email/:email', resendEmail);
router.post('/reset-password', resetPassword);
router.get('/reset-password/:email/:token', resetPasswordResponse);
router.patch('/password', newPasswordCreate);
router.get('/test', authVerifyMiddleware, isSuperAdmin, (req, res)=> {
    res.json({
        message: 'Super Admin Access'
    })
});

module.exports = router;