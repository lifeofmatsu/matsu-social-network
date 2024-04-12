const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please enter a valid email address'
			]
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Thought'
			}
		],
		friends: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User'
			}
		]
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			getters: true
		},
	}
);

// Virtual for friendCount
userSchema.virtual('friendCount').get(function () {
	return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
