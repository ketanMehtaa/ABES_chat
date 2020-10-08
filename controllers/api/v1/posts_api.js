const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function (req, res) {

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    return res.json(200, {
        message: "List of posts",
        posts: posts
    })
}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);

        // if (post.user == req.user.id) {
            post.remove();
            // post.save();

            await Comment.deleteMany({
                post: req.params.id
            });
            // req.flash('success','post deleted Successfully');
            return res.json(200,{
                message:"post and associated comment deleted successfully"
            });
        // } 
        // else {
        //     req.flash('error','post deleted unSuccessfully');
        //     return res.redirect('back');
        // }
    } catch (err) {
        return res.json(500,{
            message:"Internal server error"
        });
    }
}