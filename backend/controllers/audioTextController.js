const {AudioMessage} = require("../models/chatModel");

const storingAudioMessage = async (req, res) => {
    
    try {
        console.log(req.user)
        const {content, fromUser } = req.body;
        const {_id} = req.user

        const newChatMessage = new AudioMessage({
            userId: _id,
            content: content,
            fromUser: fromUser
        });

        const savedMessage = await newChatMessage.save();
        const populatedMessage = await AudioMessage.populate(savedMessage, { path: 'userId' });

        res.status(200).json({ message: 'Chat message saved successfully.', data: populatedMessage });
    } catch (error) {
        console.error('Error saving chat message:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

module.exports = { storingAudioMessage };