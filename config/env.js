import { config } from 'dotenv';
//Load the config function that loads the .env to process.env

// Load the correct .env file based on NODE_ENV (default to development)
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { 
     PORT,
     NODE_ENV,
     DATABASE_URI ,
     JWT_SECRET,
     JWT_EXPIRES_IN,
     ARCJET_KEY,
     ARCJET_ENV,
     QSTASH_TOKEN,
     QSTASH_URL,
     SERVER_URL,
     EMAIL_PASSWORD
} = process.env;
// Export the PORT and NODE_ENV from the process.env object
// This will allow us to access the PORT and NODE_ENV variables in other files
// without having to load the .env file again.
// Also export the DATABASE_URI, JWT_SECRET, and JWT_EXPIRES_IN variables
// from the process.env object. These variables will be used in the database
