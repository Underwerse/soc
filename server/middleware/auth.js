import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try{
    let token = req.header('Authorization')

    if (!token) {
      return res.sttaus(403).send('Access denied')
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft()
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch(error) {
    console.error('Error: ' + error.message);
    res.status(500).json({ error: error.message })
  }
  
}
