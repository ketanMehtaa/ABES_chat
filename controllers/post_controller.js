const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

// using asyns await
module.exports.create = async function (req, res) {
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "post created"
            })
        }
        req.flash('success', 'post created Successfully');
        return res.redirect('back');
    } catch (err) {
        req.flash('error', 'post not created ');
        console.log('error in creating a post');
        return;
    }
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id) {

            await Like.deleteMany({
                likeable: post,
                onModel: 'Post'
            });
            await Like.deleteMany({
                _id: {
                    $in: post.comments
                }
            });

            post.remove();
            // post.save();

            await Comment.deleteMany({
                post: req.params.id
            });
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted successfully"
                })
            }
            req.flash('success', 'post deleted Successfully');
            return res.redirect('back');
        } else {
            req.flash('error', 'post deleted unSuccessfully');
            return res.redirect('back');
        }
    } catch (err) {
        console.log('error', err);
        return;
    }
}