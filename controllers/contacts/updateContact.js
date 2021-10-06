const { Contact } = require('../../model')
const { NotFound, BadRequest } = require('http-errors')
const { isValidObjectId } = require('mongoose')

const { joiSchemaPatch } = require('../../model/contacts')

const updateContact = async (req, res) => {
  const { error } = joiSchemaPatch.validate(req.body)

  if (error) {
    throw new BadRequest(error.message)
  }

  const { contactId } = req.params

  if (!isValidObjectId(contactId)) {
    throw new NotFound('Not found')
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
    runValidators: true,
  })

  if (Object.keys(req.body).length === 0) {
    throw new BadRequest('missing fields')
  }

  if (!result) {
    throw new NotFound('Not found')
  }

  res.json(result)
}

module.exports = updateContact
