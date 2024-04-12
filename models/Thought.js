const { Schema, Types, model } = require('mongoose');
const moment = require('moment');

// Reaction Schema as a subdocument
const reactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId()
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
			get: (timestamp) => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a')
		}
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			getters: true
		},
		id: false
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
			get: (timestamp) => moment(timestamp).format('MMM DD, YYYY [at] hh:mm a')
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
		},
		id: false
	}
);

// Virtual for reactionCount
thoughtSchema.virtual('reactionCount').get(function () {
	return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
