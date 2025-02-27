const errorMiddleware = (err, req, res, next) => {
    try {
      let error = { ...err };
      //Shallow copy of the error object
  
      error.message = err.message;
      //Copy the error message
  
      console.error(err);
      //Log the error to the console
  
      // Mongoose bad ObjectId
      if (err.name === 'CastError') {
        const message = 'Resource not found';
        error = new Error(message);
        error.statusCode = 404; // Not found
      }
  
      // Mongoose duplicate key
      if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        error = new Error(message);
        error.statusCode = 400; // Bad request
      }
  
      // Mongoose validation error
      if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new Error(message.join(', '));
        error.statusCode = 400;//
      }
  
      res.status(error.statusCode || 500).json({ success: false, error: error.message || 'Server Error' });
      //500 is the default status code for server error
    } catch (error) {
      next(error);
    }
  };
  
  export default errorMiddleware;