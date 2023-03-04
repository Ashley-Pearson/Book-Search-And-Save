const { Book, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('Log in Please!')
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address')
            }

            const correctPW = await user.isCorrectPassword(password);
            if (!correctPW) {
                throw new AuthenticationError('Incorrect Password, please try again')
            }
            const token = signToken(user);
            return { token, user };

            //savebook

            saveBook: async (parent, { book }, context) => {
                if(context.user) {
                return updateUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: book } },
                    { new: true, runValidators: true }
                )
                return updateUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
            //remove book
            removeBook: async (parent, { bookId }, context) => {
                if (context.user) {
                    return updateUser = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { savedBooks: { bookId: bookId } } },
                        { new: true }
                    )
                    return updateUser;
                }
                throw new AuthenticationError('You need to be logged in!');

            },
        },

    };

    module.exports = resolvers;