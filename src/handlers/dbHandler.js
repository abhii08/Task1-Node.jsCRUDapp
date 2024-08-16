const db = require("../db")

function createcontact(contact, callback) {
    const query =  'INSERT INTO contacts (first_name, last_name, email, mobile_number VALUES (?, ?, ?, ?)';
    const values = [contact.first_name, contact.last_name, contact.email, contact.mobile_number];
    db.query(query, values, (err, results) => {
        if(err) return callback(err);
        callback(null, results.insertId);
    });
};

function readContact(contact_id, callback) {
    const query = 'SELECT * FROM contacts WHERE id = ?';
    db.query(query, [contact_id], (err, results) => {
        if(err) return callback(err);
        callback(null, results[0]);
    });
};

function updatecontact(contact_id, updates, callback) {
    const query = 'UPDATE contacts SET email = ?, mobile_number = ? WHERE id = ?';
    const values = [updates.email, updates.mobile_number, contact_id];
    db.query(query, values, (err, results) => {
        if(err) return callback(err);
        callback(null, results.affectedRows);
    });
};

function deleteContact(contact_id, callback) {
    const query = 'DELETE FROM contacts WHERE id = ?';
    db.query(query, [contact_id], (err, results) => {
        if(err) return callback(err);
        callback(null, results.affectedRows);
    });
};

module.exports = {
    createcontact,
    readContact,
    updatecontact,
    deleteContact
}