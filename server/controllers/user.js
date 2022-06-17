import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: 'User doesnt exist.' });
  
    const isPasswordCorrent = await bcrypt.compare(
      password,
      existingUser.password
    );
 
    if (!isPasswordCorrent)
      return res.status(400).json({ message: 'Invalid credentials.' });

    const token = bcrypt.signin(
      { email: existingUser.email, id: existingUser._id },
      'test',
      { expiresIn: '1h' }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = User.findOne({ email });

    if (existingUser)
      return res.status(404).json({ message: 'User already exist.' });

    if (password != confirmPassword)
      return res.status(400).json({ message: "Passwords don't match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = bcrypt.signin(
      { email: result.email, id: result._id },
      'test',
      { expiresIn: '1h' }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
