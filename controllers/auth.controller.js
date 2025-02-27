//Model Controller for User Authentication . Uses User Model .

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//importing the essental modules and files

import User from '../models/usermodel.js';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js'

//importing the model and jwt secret and expiry time from the env files.

//Create a New user . Which will be an async function.

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  //Start a Mongoose Session
  session.startTransaction();
  //Start a transaction

  try {
    const { name, email, password } = req.body;
    //Extract the details from the request body

    // Check if a user already exists
    const existingUser = await User.findOne({ email });

    if(existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 409; // Conflict
      throw error; // This will skip the rest of the code and go to the catch block
    }

    // Hash password
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt);
    // Hash the password with the generated salt

    const newUsers = await User.create([{ name, email, password: hashedPassword }], { session });
    // Create a new user with the hashed password

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    //Generates a JWT token whch will be used for authentication and authorization purposes. 

    await session.commitTransaction();
    //Commit the transaction
    session.endSession();
    //End the session

    res.status(201).json({ //Status 201 is for successful creation
      //Response Data in JSON format
      success: true,
      message: 'User created successfully',
      data: {
        token,
        user: newUsers[0],
      }
    })
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
}

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //Take data from the request body

    const user = await User.findOne({ email });
    //Find the user with the given email

    if(!user) {
      //if user is not found
      const error = new Error('User not found');
      error.statusCode = 404; // Not found
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    // Compare the password from the request with the hashed password in the database

    if(!isPasswordValid) {
      //If password is not valid
      const error = new Error('Invalid password');
      error.statusCode = 401;// Unauthorized  error   
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    //Generate a JWT token for the user

    res.status(200).json({ // Status 200 is for successful request
      success: true,
      message: 'User signed in successfully',
      data: {
        token,
        user,
      }
    });
  } catch (error) {
    next(error);
  }
}

export const signOut = async (req, res, next) => {}