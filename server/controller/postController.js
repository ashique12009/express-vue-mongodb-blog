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

const createPost = async (request, response) => {
    try {
        const { title, description, author } = request.body;
        const newPost = new Post({
            title: title,
            description: description,
            author: author
        });
        await newPost.save();
        return response.status(200).json({ success: true, post: newPost, message: 'Post created successfully' });
    } catch (error) {
        console.log('Error creating post:', error);
    }
}

const getPost = async (request, response) => {
    try {
        const { id } = request.params;
        const post = await Post.findById(id);
        if (!post) {
            return response.status(404).json({ success: false, message: 'Post not found' });
        }
        return response.status(200).json({ success: true, post: post });
    } 
    catch (error) {
        console.log("Fetching error: ", error);    
    }
}

const deletePost = async (request, response) => {
    try {
        const { id } = request.params;
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return response.status(404).json({ success: false, message: 'Post not found' });
        }
        return response.status(200).json({ success: true, message: 'Post deleted successfully' });
    } 
    catch (error) {
        console.log("Delete error: ", error);
    }
}

export { getPosts, createPost, getPost, deletePost };