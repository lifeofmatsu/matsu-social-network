const { User, Thought } = require('../models');

// CREATE a new thought
const createThought = async (req, res) => {
    try {
        const newThought = new Thought(req.body);
        const thought = await newThought.save();

        // Add thought to the user's thoughts array
        await User.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } });
        res.status(201).json(thought);
    } catch (error) { res.status(400).json({ message: error.message }); }

};

// READ all thoughts
const getAllThoughts = async (req, res) => {
    try {
        const thoughts = await Thought.find({});
        res.json(thoughts);
    } catch (error) { res.status(500).json({ message: error.message }); }

};

// READ a single thought by ID
const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);

        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        res.json(thought);
    } catch (error) { res.status(500).json({ message: error.message }); }

};

// UPDATE a thought
const updateThought = async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        res.json(updatedThought);
    } catch (error) { res.status(400).json({ message: error.message }); }
};

// DELETE a thought
const deleteThought = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);

        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        // Optionally remove the thought from the user's thoughts array
        await User.findByIdAndUpdate(thought.userId, { $pull: { thoughts: req.params.id } });
        res.json({ message: 'Thought successfully deleted' });
    } catch (error) { res.status(500).json({ message: error.message }); }
};

const addReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        );
        
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        res.json(thought);
    } catch (error) { res.status(400).json({ message: error.message }); }
};

const removeReaction = async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }

        res.json(thought);
    } catch (error) { res.status(400).json({ message: error.message }); }
};

module.exports = {
    createThought,
    getAllThoughts,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
};
