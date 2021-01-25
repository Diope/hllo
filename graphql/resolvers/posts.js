const { AuthenticationError, UserInputError } = require('apollo-server');
const { post } = require('got');

const Post = require('../../models/Post');
const auth = require('../../utils/auth')

module.exports = {
    Query: {
        async getPosts () {
            try {
                const posts = await Post.find().sort({createdAt: -1});
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getPost(_, {postId}){
            try {
                const post = await Post.findById(postId);

                if (post) {
                    return post;
                } else {
                    throw new Error('Post not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    
    Mutation: {
        async createPost(_, {body}, context) {
            const user = auth(context);
            // console.log(user);

            const _post = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const post = await _post.save();
            return post;
        },
        async deletePost(_, {postId}, context) {
            const user = auth(context);
            const _post = await Post.findById(postId);

            try {
                console.log(user.id, typeof(user.id));
                console.log(typeof(_post.user));
                if (user.id == _post.user) {
                    await _post.delete();
                    return 'Post has been successfully deleted'
                } else {
                    throw new AuthenticationError('Action not allowed');
                }

            } catch (err) {
                throw new Error(err)
            }
        },
        
        likePost: async (_, {postId}, context) => { 
            const {id, username} = auth(context);
            const _post = await Post.findById(postId);

            if (_post) {
                if (_post.likes.find((like) => like.userId === (id).toString())) {
                    _post.likes = _post.likes.filter((like) => like.userId !== (id).toString());
                } else {
                    _post.likes.push({
                        userId: id,
                        username,
                        createdAt: new Date().toISOString()
                    })
                }
                await _post.save();
                return _post;
            } else throw new UserInputError("Post was not found");
        }
    }
}

