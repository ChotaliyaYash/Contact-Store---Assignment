const { errorHandeler } = require("../utils/errorHandler");
const { addContactCall, deleteContactCall, getContactCall, getContactsCall, updateContactCall } = require("../helper/contactHelper");

module.exports = {
    addContact: async (req, res, next) => {
        try {
            const { name, email, phone } = req.body;
            const { userId } = req.user;

            if (!name || !email || !phone) {
                throw errorHandeler("Please enter all fields", 400);
            }

            const contact = await addContactCall(name, email, phone, userId);

            res.status(200).json({
                success: true,
                message: "Contact added successfully",
                data: contact
            });

        } catch (error) {
            next(error)
        }
    },

    deleteContact: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { userId } = req.user;

            const contact = await deleteContactCall(id, userId);

            res.status(200).json({
                success: true,
                message: "Contact deleted successfully",
                data: contact
            });

        } catch (error) {
            next(error)
        }
    },

    updateContact: async (req, res, next) => {
        try {
            const { name, email, phone } = req.body;
            const { id } = req.params;
            const { userId } = req.user;

            if (!name || !email || !phone) {
                throw errorHandeler("Please enter all fields", 400);
            }

            const contact = await updateContactCall(name, email, phone, id, userId);

            res.status(200).json({
                success: true,
                message: "Contact updated successfully",
                data: contact
            });

        } catch (error) {
            next(error)
        }
    },

    getContacts: async (req, res, next) => {
        try {
            const { userId } = req.user;

            const contacts = await getContactsCall(userId);

            res.status(200).json({
                success: true,
                message: "Contacts fetched successfully",
                data: contacts
            });

        } catch (error) {
            next(error)
        }
    },
    getContact: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { userId } = req.user;

            const contact = await getContactCall(id, userId);

            res.status(200).json({
                success: true,
                message: "Contact fetched successfully",
                data: contact
            });

        } catch (error) {
            next(error)
        }
    }
}