const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc get all contacts
//@route GET /api/contacts //these are called "labels"
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({
    user_id: req.user.id,
  });
  res.status(200).json(contacts);
});
//@desc create new contact
//@route POST /api/contacts
//@access private
//status code 201(resource created)
const createContact = asyncHandler(async (req, res) => {
  const { name, email, PhoneNumber } = req.body;
  if (!name || !email || !PhoneNumber) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    PhoneNumber,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});
//@desc get contact
//@route GET /api/contacts/:id
//@access private
//status code 200(resource created)
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("no contact ");
  }
  res.status(200).json(contact);
});
//@desc update contact
//@route PUT /api/contacts/:id
//@access private
//status code 201(resource created)
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("no contact ");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You are not authorised to update other user contacts");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(201).json(updatedContact);
});
//@desc delete contact
//@route DELETE /api/contacts/:id
//@access private
//status code 201(resource created)
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("no contact ");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("You are not authorised to delete other user contacts");
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.status(201).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
