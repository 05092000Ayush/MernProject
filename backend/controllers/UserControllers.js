const db = require('../models/index');
const User = db.user;
const UserDetails = db.userdetails;
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


// Configure nodemailer transporter to use Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ayushmalhotra020@gmail.com',
    pass: 'bgkh akai hact xzlg'
  }
});

module.exports = {
  async register(req, res) {
    try {
      const { firstName, lastName, email, password } = req.body;

      // Check if all required fields are provided
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Check if the email already exists in the database
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Hash the password
      const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

      // Create a new user record
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      // Generate a verification token
      const verificationToken = crypto.randomBytes(20).toString('hex');
      newUser.verificationToken = verificationToken;

      // Save the user with the verification token
      await newUser.save();

      // Send verification email
      const verificationLink = `http://localhost:3000/verify-email/${verificationToken}`;
      const mailOptions = {
        from: 'ayushmalhotra020@gmail.com',
        to: email,
        subject: 'Email Verification',
        text: `Please click on the following link to verify your email address: ${verificationLink}`
      };
      await transporter.sendMail(mailOptions);

      // Respond with success message
      res.status(201).json({ message: 'User registered successfully. Verification email sent.' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
      if (user.password !== hashedPassword) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      if (!user.isVerified) {
        await user.update({ isVerified: true });
      }
      const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async verifyEmail(req, res) {
    try {
      const token = req.params.token;
      const user = await User.findOne({ where: { verificationToken: token } });
      if (!user || user.verified) {
        return res.status(400).send('Invalid or expired token');
      }
      user.verified = true;
      user.verificationToken = null;
      await user.save();
      res.redirect('http://localhost:3001/login');
    } catch (error) {
      console.error('Error verifying email:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  async userDetail(req, res) {
    try {
      const { firstName, lastName, email } = req.body;

      // Check if all required fields are provided
      if (!firstName || !lastName || !email) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Check if the email already exists in the database
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Create a new user record
      const newUser = await UserDetails.create({
        firstName,
        lastName,
        email,
        isActive: true
      });


      // Save the user with the verification token
      await newUser.save();

      // Respond with success message
      res.status(201).json({ message: 'User registered successfully. Verification email sent.' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }

  },
  async getUserDetails(req, res) {
    try {
      const userDetails = await UserDetails.findAll({ where: { isActive: true } });
      res.status(200).json(userDetails);
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async deleteUser(req, res) {
    const userId = req.params.id; // Extract user ID from URL parameters

    try {
      // Find user by ID and delete
      const user = await UserDetails.findByPk(userId); // Assuming UserDetails has a primary key 'id'
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.destroy();
      res.status(204).end(); // Respond with no content on successful deletion
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  async updateUser(req, res) {
    const userId = req.params.id;
    const { firstName, lastName, email } = req.body;

    try {
      const user = await UserDetails.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      await user.save();

      res.json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

};
