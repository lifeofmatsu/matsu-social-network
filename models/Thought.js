const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Reaction Schema as a subdocument
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => new Date(timestamp).toLocaleString() 
    }
    }, {
    toJSON: {
        getters: true
    },
    id: false
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => new Date(timestamp).toLocaleString()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
});

// Virtual for reactionCount
thoughtSchema.virtual('reactionCount').get(() => this.reactions.length);

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
