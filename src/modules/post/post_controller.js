import postModel from "../../../db/models/post_modal.js"



export const createPost = async (req, res, next) => {

    const post = await postModel.create({
        postImage: req.files?.postImage?.map((e) => "https://shaaban-facebook-node.up.railway.app/" + e.path),
        postContent: req.body.postContent,
        likes: req.body.likes,
        unLikes: req.body.unLikes,
        userId: req.user.id
    })
    if (!post) return next(new Error("fail to create post"))
    res.json({ message: "success", post })
}

// ========================================================================================
export const getAllPosts = async (req, res, next) => {
    const post = await postModel.find().populate("userId").sort({ createdAt: -1 })
    if (post.length == 0) return next(new Error("no posts available"))
    res.json({ message: "success", results: post.length, post })
}
// ========================================================================================
export const getUserPosts = async (req, res, next) => {
    const post = await postModel.find({ userId: req.user.id })
    if (post.length == 0) return next(new Error("no posts available"))
    res.json({ message: "success", results: post.length, post })
}


// ======================================================

export const deleteOnePost = async (req, res, next) => {
    const post = await postModel.deleteOne({ _id: req.params.postId })
    if (post.deletedCount === 0) return next(new Error("invalid post id", { cause: 409 }))
    res.status(201).json({ message: "success", deletedCount: post.deletedCount })
}
// ======================================================

export const editPost = async (req, res, next) => {

    const updatePost = await postModel.findOneAndUpdate(
        { userId: req.user.id, _id: req.params.postId },
        {
            postContent: req?.body?.postContent,
            postImage: req?.files?.postImage?.map((e) => "https://shaaban-facebook-node.up.railway.app/" + e.path),
        }, { new: true }

    )

    if (!updatePost) return next(Error("failed"))
    return res.status(200).json({ message: "updated post", updatePost })
}


// ======================================================

export const deleteAllPosts = async (req, res, next) => {
    const post = await postModel.deleteMany()
    if (post.deletedCount === 0) return next(new Error("there aren't any posts", { cause: 409 }))
    res.status(201).json({ message: "success", deletedCount: post.deletedCount })
}


