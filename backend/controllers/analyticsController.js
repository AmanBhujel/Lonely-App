const Analytics = require("../models/analyticsModel");
const { ChatMessage } = require("../models/chatModel");
const Goal = require("../models/goalsModel");

const getAnalytics = async (req, res) => {
    try {
        const { _id } = req.user;

        const totalChats = await ChatMessage.countDocuments({ userId: _id }) / 2;

        const goalsSet = await Goal.countDocuments({ userId: _id });
        const goalsAchieved = await Goal.countDocuments({ userId: _id, completed: true });

        const existingAnalytics = await Analytics.findOne({ userId: _id });

        if (existingAnalytics) {
            existingAnalytics.totalChats = totalChats;
            existingAnalytics.goalsSet = goalsSet;
            existingAnalytics.goalsAchieved = goalsAchieved;

            await existingAnalytics.save();
            res.status(200).json(existingAnalytics);

        } else {
            const analyticsData = new Analytics({
                totalChats,
                goalsSet,
                goalsAchieved,
                userId: _id
            });
            await analyticsData.save();
            res.status(200).json(analyticsData);
        }
    } catch (error) {
        console.error("Error fetching or saving analytics:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// --------TO increase Calls counter by 1 everytime user calls-----------
const updateAnalyticsCalls = async (req, res) => {
    try {
        const { _id } = req.user;
        const existingAnalytics = await Analytics.findOne({ userId: _id });
        if (existingAnalytics) {
            existingAnalytics.totalCalls += 1;
            await existingAnalytics.save();
            res.status(200).json(existingAnalytics);
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getAnalytics, updateAnalyticsCalls }