const { UserInputError, AuthenticationError } = require('apollo-server');
const Post = require('../../models/Post');
const auth = require('../../utils/auth');

module.exports = {
    Mutation: {
        async createComment (_, {postId, body}, context) {
            const {username, id} = auth(context);
            // console.log(typeof(id), id);
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
                    userId: id,
                    body,
                    username,
                    createdAt: new Date().toISOString()
                });
                await _post.save();
                return _post
            } else throw new UserInputError('Post not found');
        },
        async deleteComment(_, {postId, commentId}, context) {
            const {username, id} = auth(context);
            const _post = await Post.findById(postId);
            if (_post) {
                const _commentIdx = _post.comments.findIndex(c => c.id === commentId);
                // console.log(id, _post.comments[_commentIdx].userId);

                if(_post.comments[_commentIdx].userId === (_post.user).toString()){
                    _post.comments.splice(_commentIdx, 1);
                    await post.save();
                    
                    return post;
                } else {
                    throw new AuthenticationError("Please login to perform this action");
                }
            } else {
                throw new UserInputError("Post not found");
            }

        }
    },
    Query: {}
}