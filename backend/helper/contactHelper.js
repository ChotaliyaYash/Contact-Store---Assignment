const Contact = require("../model/contactModel");
const { errorHandeler } = require("../utils/errorHandler");

module.exports = {
    // add contact
    addContactCall: async (name, email, phone, user) => {
        try {

            const contact = await Contact.create({
                name,
                email,
                phone,
                user
            });

            return contact;

        } catch (error) {
            throw error
        }
    },

    // delete contact
    deleteContactCall: async (id, user) => {
        try {
            const contact = await Contact.findById(id);

            if (!contact) {
                throw errorHandeler("Contact not found", 404);
            }

            if (contact.user.toString() !== user) {
                throw errorHandeler("Not authorized", 401);
            }

            await Contact.findByIdAndDelete(id);

            return contact;

        } catch (error) {
            throw error
        }
    },

    // update contact
    updateContactCall: async (name, email, phone, id, user) => {
        try {
            const contact = await Contact.findById(id);

            if (!contact) {
                throw errorHandeler("Contact not found", 404);
            }

            if (contact.user.toString() !== user) {
                throw errorHandeler("Not authorized", 401);
            }

            contact.name = name;
            contact.email = email;
            contact.phone = phone;

            await contact.save();

            return contact;

        } catch (error) {
            throw error
        }
    },

    // get all contacts
    getContactsCall: async (user) => {
        try {
            const contacts = await Contact.find({ user });

            return contacts;
        } catch (error) {
            throw error
        }
    },

    // get contact
    getContactCall: async (id, user) => {
        try {
            const contact = await Contact.findById(id);

            if (!contact) {
                throw errorHandeler("Contact not found", 404);
            }

            if (contact.user.toString() !== user) {
                throw errorHandeler("Not authorized", 401);
            }

            return contact;
        } catch (error) {
            throw error
        }
    }
}