import messageModal from "../../../db/models/messenger_modal.js";





export const getMessages = async (req, res, next) => {
    const messages = await messageModal.find().populate('sender').sort('timestamp');
    res.json(messages);


    // if (!messages) return next(new Error("no posts available"))
    // res.json({ message: "success", results: post.length, post })
}

export const postMessages = async (req, res, next) => {
    const newMessage = new messageModal(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);


    // if (!messages) return next(new Error("no posts available"))
    // res.json({ message: "success", results: post.length, post })
}

