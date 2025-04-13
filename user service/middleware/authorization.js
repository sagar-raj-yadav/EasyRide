import "dotenv/config"
import jwt from "jsonwebtoken";

const authorization = (req, res, next) => {
    const token = req.header('authToken');
  
    if (!token) {
      return res.status(401).json({ error: 'Please authenticate using a valid token' });
    }
  
    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = id;
      console.log('authorized', req.userId);
      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      res.status(401).json({ error: 'Please authenticate using a valid token' });
    }
  };
  

export default authorization;