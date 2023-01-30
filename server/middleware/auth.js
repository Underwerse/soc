import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try{
    const JWT_SECRET = process.env.JWT_SECRET || 'dfyguhjet8rg9786drutfgv43r786trufgvjhb'
    let token = req.header('Authorization')

    if (!token) {
      return res.sttaus(403).send('Access denied')
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft()
    }

    const verified = jwt.verify(token, JWT_SECRET)
    req.user = verified
    next()
  } catch(error) {
    console.error('Error: ' + error.message);
    res.status(500).json({ error: error.message })
  }
  
}
