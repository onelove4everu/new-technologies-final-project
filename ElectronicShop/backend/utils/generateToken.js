import jwt from 'jsonwebtoken'

const JWT_SECRET = "mongodb-test"

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    // expire in 3 min equal to ms
    expiresIn: 3000,
  })
}

export default generateToken
