const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const crypto = require("crypto");
const { User, PasswordResetToken } = require("../models/User.js");

const { hashPassword } = require("../helper/userHelper.js");
const { sendEmail } = require("../helper/sendEmail.js");
require("dotenv").config(); // Load environment variables

const registerController = async (req, res) => {
    try {
      console.log("Received Request Body:", req.body); // Add this line to debug
  
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const hashedPassword = await hashPassword(password);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      const savedUser = await newUser.save();
  
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: savedUser,
      });
    } catch (error) {
      console.error("Registration Error:", error);
      res.status(500).json({ success: false, error: "Error in user registration" });
    }
  };
  

// user login
const loginController  = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User  not found" });
      }
  
      // Log user details for debugging
      console.log("User  found:", user);
      
  
      // Compare hashed passwords
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      console.log("Plain password:", password);
      console.log("Hashed password:", user.password);
      console.log("Password match result:", isPasswordCorrect);
      res.status(200).json({ message: "Login successful" });
  
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // Generate JWT token (optional)
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
  
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
// const loginController = async (req, res) => {
//     try {
//         // const { email, password } = req.body;

//         const email = req.email;
//         const password = req.password;
        
//         // Check if user exists in MongoDB
//         const user = await User.findOne({ email });

//         console.log(email, password);

//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         // Compare provided password with stored hashed password
//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid email or password",
//             });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, {
//             expiresIn: "5d",
//         });

//         return res.status(200).json({
//             success: true,
//             message: "Login successful",
//             token,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//             },
//         });
//     } catch (error) {
//         console.error("Error in user login:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error",
//         });
//     }
// };

// const loginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log(email);
//     const em=email;
//     // Validate input
    
//     // Find the user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     // Check the password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: "Invalid credentials" });
//     }

//     // Respond with success
//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       user: { id: user._id, email: user.email, name: user.name },
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

  
// user update
const updateUserController = async (req, res) => {
    try {
        const { id } = req.params; // User ID from the request URL
        const { name, email } = req.body; // Fields to update

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (name) user.name = name;
        if (email) user.email = email;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: {
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error, "Error updating name and email");
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Delete user
const userDeleteController = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.log(error, "error in deleting user");
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};

// Get a single user (exclude password)
const getUserController = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id, "-password"); // Exclude password

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.log(error, "error in fetching user");
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};

// Get all users (exclude passwords)
const getAllUsersController = async (req, res) => {
    try {
        const users = await User.find({}, "-password"); // Exclude passwords

        return res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        console.log(error, "error in fetching all users");
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
};

const forgetPassword = async (req, res) => {
    try {
        console.log("Step 1: Received request body:", req.body);

        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }


        // Validate email format
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }
        if (!email || typeof email !== 'string') {
            return res.status(400).json({ message: "Email must be a valid string." });
        }

        // Check if User model is defined
        console.log("Step 1.5: Checking User model:", User);

        // Check if user exists
        const user = await User.findOne({ email });
        console.log("Step 2: Fetched user:", user);
        if (!user) {
            return res.status(404).json({ message: "User with this email does not exist." });
        }

        // Verify PasswordResetTokens model
        console.log("Step 2.5: Checking PasswordResetTokens model:", PasswordResetToken);

        console.log(user.email);

        // Remove existing tokens for the user
        // await PasswordResetToken.destroy({ where: { email } });
        // console.log("Step 3: Cleared old tokens for user:", email);


        // Generate token and hash
        const token = crypto.randomBytes(32).toString("hex");
        const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        console.log("Step 4: Generated token:", token);

        // Store token
        try {
            await PasswordResetToken.create({
                userId: user._id,
                token: tokenHash,
                expiresAt: expiresAt,
            });

        }
        catch (error) {
            console.error('Error creating password reset token:', error);
        }
        console.log(PasswordResetToken);


        // Construct reset URL
        if (!process.env.FRONTEND_URL) {
            throw new Error("FRONTEND_URL is not defined in environment variables.");
        }
        const resetUrl = `${process.env.FRONTEND_URL}/`;
        const resetToken = token;
        console.log("Step 6: Reset URL created:", resetUrl);

        // Send email
        await sendEmail(user.email, "Password Reset Request", `
        Hi ${user.name || "User"},
        You requested a password reset. Click the link below:
        ${resetUrl}
        Token: ${resetToken}
        If you did not request this, ignore this email.
      `);
        console.log("Step 7: Email sent to:", user.email);

        return res.status(200).json({ message: "Password reset link sent to your email." });
    } catch (error) {
        console.error("Error in forgetPassword:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// Reset Password
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ message: "Token and new password are required" });
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const resetToken = await PasswordResetToken.findOne({ token: tokenHash });

    if (!resetToken || resetToken.expiresAt < Date.now()) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(resetToken.userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.password = await hashPassword(newPassword);
    await user.save();
    await PasswordResetToken.deleteOne({ _id: resetToken._id });

    res.status(200).json({ message: "Password has been reset successfully" });
};

const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    await PasswordResetToken.create({
        userId: user._id,
        token: tokenHash,
        expiresAt: Date.now() + 1000 * 60 * 1000, // 15 minutes
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    await sendEmail(user.email, "Password Reset Request", `Reset link: ${resetLink}`);

    res.status(200).json({ message: "Password reset link sent to email" });
};

// Generate JWT token
const generateToken = (userId, email) => {
    return jwt.sign({ id: userId, email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  };
  const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized, token missing' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user info to request object
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized, invalid token' });
    }
  };

// Get user profile
const getUserProfile = async (req, res) => {

    try {
      const user = await User.findById(req.user.email).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };


module.exports = {
    forgetPassword,
    resetPassword,
    requestPasswordReset,
    registerController,
    getAllUsersController,
    getUserController,
    userDeleteController,
    updateUserController,
    loginController,
    getUserProfile,
    generateToken,
    verifyToken
};