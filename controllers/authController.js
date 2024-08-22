const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.redirect('/login');
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).send('Error signing up');
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      console.error('User not found');
      return res.status(401).send('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Incorrect password');
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/add-product');
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).send('Error logging in');
  }
};

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.error('No token provided');
    return res.status(401).redirect('/login');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Invalid token');
      return res.status(401).redirect('/login');
    }
    req.userId = decoded.userId;
    next();
  });
};




// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// exports.signup = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = new User({ username, password });
//     await user.save();
//     res.redirect('/login');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error signing up');
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).send('Invalid credentials');
//     }
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.cookie('token', token, { httpOnly: true });
//     res.redirect('/add-product');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error logging in');
//   }
// };

// exports.requireAuth = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(401).redirect('/login');

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(401).redirect('/login');
//     req.userId = decoded.userId;
//     next();
//   });
// };
