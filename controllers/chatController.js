const jwt = require('jsonwebtoken');
const User = require('../models/user');

const saveResponse = async (req, res) => {
  try {
    const token = req.header('auth-token');
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findOne({ email: verified.email });

    const { question, answer } = req.body;

    user.bookmarks.push({ question, answer });

    await user.save();
  } catch (err) {
    console.log(err);
  }
};

const getSaved = async (req, res) => {
  try {
    const token = req.header('auth-token');

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findOne({ email: verified.email });

    res.status(200).json({ bookmarks: user.bookmarks });
  } catch (err) {
    console.log(err);
  }
};

const getHistory = async (req, res) => {
  try {
    const token = req.header('auth-token');
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findOne({ email: verified.email });

    res.status(200).json({ history: user.history });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { saveResponse, getHistory, getSaved };
