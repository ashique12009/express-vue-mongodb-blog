import Post from "../model/postSchema.js";
import User from "../model/userSchema.js";

const getTotalPostNumber = async (request, response) => {
    try {
        const totalPostNumber = await Post.countDocuments();
        return response.status(200).json({ success: true, totalPostNumber: totalPostNumber });
    } catch (error) {
        console.log('Error fetching posts:', error);
    }
}

const getTotalPostNumberOfToday = async (request, response) => {
    try {
        const totalPostNumber = await Post.countDocuments({ date: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } });
        return response.status(200).json({ success: true, getTotalPostNumberOfToday: totalPostNumber });
    } catch (error) {
        console.log('Error fetching posts:', error);
    }
}

const getTotalUserNumber = async (request, response) => {
    try {
        const totalUserNumber = await User.countDocuments();
        return response.status(200).json({ success: true, totalUserNumber: totalUserNumber });
    } catch (error) {
        console.log('Error fetching posts:', error);
    }
}

export { getTotalPostNumber, getTotalUserNumber, getTotalPostNumberOfToday };