const express = require('express');
const router = express.Router();
const { registerUser, loginUser, resetPassword } = require('../controllers/userController');
const { body, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.post('/register', 
    [
        body('name').notEmpty().withMessage('Nome é obrigatório'),
        body('email').isEmail().withMessage('E-mail inválido'),
        body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
    ],
    validateRequest,
    registerUser
);



router.post('/login', 
    [
        body('email').isEmail().withMessage('E-mail inválido'),
        body('password').notEmpty().withMessage('Senha é obrigatória') // Mantenha 'password'
    ],
    validateRequest,
    loginUser
);

router.post('/reset-password', 
    [
        body('email').isEmail().withMessage('E-mail inválido'),
        body('newPassword').isLength({ min: 6 }).withMessage('A nova senha deve ter pelo menos 6 caracteres')
    ],
    validateRequest,
    resetPassword
);

module.exports = router;
