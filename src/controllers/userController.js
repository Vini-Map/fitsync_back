const bcrypt = require('bcrypt');
const connection = require('../config/bDados');
const User = require('../models/userModel');

const registerUser = async (req, res) => {
    const { email, password } = req.body; 

    try {
        if (!password) {
            throw new Error('Senha é obrigatória');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = { email, password: hashedPassword };

        User.create(userData, (error, userId) => {
            if (error) {
                console.error('Erro ao cadastrar usuário:', error);
                return res.status(500).json({ message: 'Erro ao cadastrar usuário', error: error.message });
            }
            res.status(201).json({ message: 'Usuário cadastrado com sucesso!', userId });
        });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ message: 'Erro ao cadastrar usuário', error: error.message });
    }
};




const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM usuarios WHERE email = ?';
    connection.query(query, [email], async (error, results) => {
        if (error) {
            return res.status(500).json({ message: 'Erro ao realizar login', error });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.senha);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha inválida' });
        }

        res.status(200).json({ message: 'Login realizado com sucesso', userId: user.id });
    });
};

const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const query = 'UPDATE usuarios SET senha = ? WHERE email = ?';
        connection.query(query, [hashedPassword, email], (error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Erro ao resetar senha', error });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            res.status(200).json({ message: 'Senha resetada com sucesso' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao resetar senha', error });
    }
};

module.exports = { registerUser, loginUser, resetPassword };
