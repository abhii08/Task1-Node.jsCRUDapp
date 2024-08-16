const express = require('express');
const {
  createContactInCRM,
  readContactFromCRM,
  updateContactInCRM,
  deleteContactFromCRM,
} = require('../handlers/customerHandler');
const {
  createcontact,
  readContact,
  updateContact,
  deleteContact,
} = require('../handlers/dbHandler');

const router = express.Router();

router.post("/createContact", (req, res) => {
    const { first_name, last_name, email, mobile_number, data_store } = req.body;

    if(data_store === 'CRM') {
        createContactInCRM({ first_name, last_name, email, mobile_number })
            .then((response) => res.status(201).json(response))
            .catch((err) => res.status(500).json(err.message));
    } else if(data_store === 'DATABASE') {
        createcontact({ first_name, last_name, email, mobile_number }, (err, contactId) => {
            if (err) return res.status(500).json(err.message);
            res.status(201).json({ id: contactId });
        }); 
    } else {
        res.status(400).json({ error: 'Invalid data_store value' });
    }
});

router.post('/getContact', (req, res) => {
    const { contact_id, data_store } = req.body;
  
    if (data_store === 'CRM') {
      readContactFromCRM(contact_id)
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err.message));
    } else if (data_store === 'DATABASE') {
        readContact(contact_id, (err, contact) => {
        if (err) return res.status(500).json(err.message);
        if (!contact) return res.status(404).json({ error: 'Contact not found' });
        res.status(200).json(contact);
      });
    } else {
      res.status(400).json({ error: 'Invalid data_store value' });
    }
  });

  router.post('/updateContact', (req, res) => {
    const { contact_id, new_email, new_mobile_number, data_store } = req.body;
  
    if (data_store === 'CRM') {
      updateContactInCRM(contact_id, { email: new_email, mobile_number: new_mobile_number })
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err.message));
    } else if (data_store === 'DATABASE') {
      updateContact(contact_id, { email: new_email, mobile_number: new_mobile_number }, (err, rowsAffected) => {
        if (err) return res.status(500).json(err.message);
        if (rowsAffected === 0) return res.status(404).json({ error: 'Contact not found' });
        res.status(200).json({ message: 'Contact updated successfully' });
      });
    } else {
      res.status(400).json({ error: 'Invalid data_store value' });
    }
  });

  router.post('/deleteContact', (req, res) => {
    const { contact_id, data_store } = req.body;
  
    if (data_store === 'CRM') {
      deleteContactFromCRM(contact_id)
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err.message));
    } else if (data_store === 'DATABASE') {
      deleteContact(contact_id, (err, rowsAffected) => {
        if (err) return res.status(500).json(err.message);
        if (rowsAffected === 0) return res.status(404).json({ error: 'Contact not found' });
        res.status(200).json({ message: 'Contact deleted successfully' });
      });
    } else {
      res.status(400).json({ error: 'Invalid data_store value' });
    }
  });

  module.exports = router;