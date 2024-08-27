import User from "../model/userSchema.js";
import { hashPassword, isMatch } from "./auth.js";

const signUpHandler = async (request, response) => {
    try {
        const { name, email, password, cpassword, userType } = request.body;

        if (!name) {
            return response.json({ error: "Please add name" });
        }

        if (!email) {
            return response.json({ error: "Please add email" });
        }

        if (!password || password.length < 6) {
            return response.json({ error: "Password must be at least 6 characters" });
        }

        if (password !== cpassword) {
            return response.json({ error: "Passwords don't match" });
        }

        const user = await User.findOne({email});
        if(user) {
            return response.json({ error: "Email already exists" });
        }
        
        // Now create user
        await User.create({
            name,
            email,
            password: await hashPassword(password),
            userType
        });
        response.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.log("Input Error or Server Error", error);
    }
}

const loginHandler = async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({email});

        if (!user) {
            return response.json({ error: "User not found" });
        }

        if (user) {
            const matchResult = await isMatch(password, user.password);
            if (!matchResult) {
                return response.json({ error: "Invalid email or password" });
            }

            // Create a session for the user
            request.session.userId = user._id;
            request.session.userEmail = user.email;

            return response.status(200).json({ message: "Login successful", user: user });
        } 
        else {
            return response.json({ error: "Invalid email or password" });
        }
    } 
    catch (error) {
        console.log("Input Error or Server Error", error);
    }
}

const getSessionData = (request, response) => {
    try {
        if (request.session.userId) {
            return response.status(200).json({ success: true, user: request.session.userEmail });
        }
        else {
            return response.status(200).json({ success: false });
        }
    } 
    catch (error) {
        console.log("Session error: ", error);
    }
}

const logoutHandler = (request, response) => {
    try {
        // Destroy the session
        request.session.destroy((err) => {
            if (err) {
                console.log('Logout error: ', err);
                return response.status(500).json({ error: 'Logout error' });
            }

            // Optionally clear the cookie
            response.clearCookie('connect.sid', { path : '/' });

            return response.status(200).json({ message: 'Logout successful' });
        });
    } 
    catch (error) {
        console.log("Logout error: ", error);    
    }
}

export { signUpHandler, loginHandler, getSessionData, logoutHandler };