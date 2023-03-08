const express = require("express");
const {
  getContact,
  createContact,
  getContacts,
  updateContact,
  deleteContact,
  
} = require("../controller/contactsController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();
router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").put(updateContact).delete(deleteContact).get(getContact);
module.exports = router;
