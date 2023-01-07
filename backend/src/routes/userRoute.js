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
const {sendOTP, verifyOTP} = require("../helpers/sendOTP");
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

router.post('/otp', async (req, res) => {
    try {
        const {phone} = req.body
        const sid = await sendOTP(phone)
        res.status(200).json({
            sid
        })
    }catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }


})

router.post('/verify-otp', async (req, res) => {
    try {
        const {phone, otp} = req.body
        const status = await verifyOTP(phone, otp)
        res.status(200).json({
            status
        })
    }catch (error) {
        console.log(error)
        res.status(500).json({
            error: error.message
        })
    }
})

module.exports = router;