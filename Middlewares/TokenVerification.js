import jwt from "jsonwebtoken"
const auth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'No token found' });

  try {
    const decoded = jwt.verify(token, 'Ahmad123');
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default auth;
