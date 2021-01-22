const { UserInputError } = require('apollo-server');
const Post = require('../../models/Post');
const auth = require('../../utils/auth');

module.exports = {
    Mutation: {
        async createComment (_, {postId, body}, context) {
            const {username} = auth(context);
            if (body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Cannot submit an empty comment'
                    }
                })
            }
            const _post = await Post.findById(postId);
            if (_post) {
                _post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                });
                await _post.save();
                return _post
            } else throw new UserInputError('Post not found');
        }
    },
    Query: {}
}