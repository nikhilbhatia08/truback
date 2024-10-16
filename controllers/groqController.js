const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.API_KEY });

async function getGroqChatCompletion(question) {
  return groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: question,
      },
    ],
    model: 'llama3-8b-8192',
  });
}

const groqController = async (req, res) => {
  try {
    const token = req.header('auth-token');
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { question } = req.body;

    const chatCompletion = await getGroqChatCompletion(question);

    const user = await User.findOne({ email: verified.email });

    console.log(user);

    user.history.push({ question, answer: chatCompletion.choices[0]?.message?.content || '' });

    await user.save();

    res.status(200).json({ message: chatCompletion.choices[0]?.message?.content || '' });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { groqController };
