const { OAuth2Client } = require('google-auth-library');
const User = require('../../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: 'Token required' });

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload || !payload.email) return res.status(400).json({ message: 'Invalid Google token' });

    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = await User.create({
        email: payload.email,
        firstName: payload.given_name,
        lastName: payload.family_name,
        picture: payload.picture,
        verified: true ,
        role: "user"
      });
    } else if (!user.verified) {
      user.verified = true;
      await user.save();
    }

    res.status(200).json({
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.picture,
        verified: user.verified,
        createdAt: user.createdAt, 
        role: user.role
      }
    });
  } catch (error) {
    console.error('Google Auth failed:', error.message);
    res.status(401).json({ message: 'Google authentication failed' });
  }
};