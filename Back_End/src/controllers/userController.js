import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const secret = 'your_jwt_secret';

export const registerUser = async (req, res) => {
  const { email, password, rol, lenguage } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *',
    [email, hashedPassword, rol, lenguage]
  );
  res.status(201).json(result.rows[0]);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  const user = result.rows[0];
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

export const getUser = async (req, res) => {
    const { email } = req.user;
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  };