const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

async function createContactInCRM(contact) {
    const config = {
        headers:{
            Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
            'content-Type': 'application/json',
        },
    };
    try {
        const response = await axios.post(`https://${process.env.FREASSALES_DOMAIN}/api/contacts`,
        contact, config);
        return response.data;
    } catch(error) {
        console.error("Error creating Contact:", error.response.data);
        throw error;
    }
};

async function readContactFromCRM(contact_id) {
    const config = {
        headers: {
            Authorization: `Token token= ${process.env.FRESHSALES_API_KEY}`,
            'content-Type': 'application/json',
        }
    };
    try {
        const response = await axios.get(`https://${process.env.FRESHSALES_DOMAIN}/api/contacts/${contact_id}`,
        config);
        return response.data;
    } catch (error) {
        console.log("Error getting contact:", error.response.data);
        throw error;
    }
};

async function updateContactInCRM(contact_id, updates) {
    const config = {
        headers: {
            Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
            'content-Type': 'application/json'
        },
    };
    try {
        const response = await axios.put(`https://${process.env.FRESHSALES_DOMAIN}/api/contacts/${contact_id}`,
        updates, config);
        return response.data;
    } catch(error) {
        console.log("Error updating contact:", error.response.data);
        throw error;
    }
};

async function deleteContactFromCRM(contact_id) {
    const config = {
        headers: {
            Authorization: `token token=${process.env.FRESHSALES_API_KEY}`,
            'content-Type': 'application/json',
        },
    };
    try {
        const response = await axios.delete(`https://${process.env.FRESHSALES_DOMAIN}/api/contacts/${contact_id}`,
        config);
        return response.data;
    } catch (error) {
        console.log("Error deleting contact:", error.response.data);
        throw error;
    }
};

module.exports ={
    createContactInCRM,
    readContactFromCRM,
    updateContactInCRM,
    deleteContactFromCRM
}