import Post from "../model/postSchema.js";

const getPosts = async (request, response) => {
    try {
        // Get the page number and limit from query parameters and provide default values
        const pageNumer = parseInt(request.query.page) || 1;
        const limit = parseInt(request.query.limit) || 10;

        // Calculate the offset
        const offset = (pageNumer - 1) * limit;

        // Fetch the posts
        const posts = await Post.find().skip(offset).limit(limit);

        // Get the total number of posts
        const totalPosts = await Post.countDocuments();

        // Send the pagination response
        return response.status(200).json({
            success: true,
            posts: posts,
            totalPosts: totalPosts,
            totalPages: Math.ceil(totalPosts / limit),
            currentPage: pageNumer
        });
    } catch (error) {
        console.log('Error fetching posts:', error);
    }
}

export { getPosts };