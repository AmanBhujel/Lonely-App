const { ChatMessage } = require("../models/chatModel");

const storingTextMessage = async (req, res) => {
    try {
        const {content, fromUser } = req.body;
        const {_id} = req.user

        const newChatMessage = new ChatMessage({
            userId: _id,
            content: content,
            fromUser: fromUser
        });

        const savedMessage = await newChatMessage.save();
        const populatedMessage = await ChatMessage.populate(savedMessage, { path: 'userId' });

        res.status(200).json({ message: 'Chat message saved successfully.', data: populatedMessage });
    } catch (error) {
        console.error('Error saving chat message:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const getTextMessages = async (req, res) => {
    try {
        const {_id} = req.user;

        const chatMessages = await ChatMessage.find({ userId: _id });

        console.log('Chat messages for userId:', chatMessages);

        res.status(200).json({ message: 'Successfully retrieved chat messages.', data: chatMessages });
    } catch (error) {
        console.error('Error getting chat messages:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};


module.exports = { storingTextMessage, getTextMessages }