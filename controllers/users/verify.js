const { User } = require('../../model')
const { NotFound } = require('http-errors')

const verify = async (req, res) => {
  const { verifyToken } = req.params
  const user = await User.findOne({ verifyToken })

  if (!user) {
    throw new NotFound()
  }

  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true })

  res.json({ message: 'Verification successful' })
}

module.exports = verify
