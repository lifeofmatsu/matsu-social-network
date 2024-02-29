const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Reaction Schema as a subdocument
const reactionSchema = new Schema(
	{
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
			get: (timestamp) => new Date(timestamp).toLocaleString()
		}
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			getters: true
		}
	}
);

const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 280
		},
		createdAt: {
			type: Date,
			default: Date.now,
			get: (timestamp) => new Date(timestamp).toLocaleString()
		},
		username: {
			type: String,
			required: true
		},
		reactions: [reactionSchema]
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			getters: true
		}
	}
);

// Virtual for reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
	return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
