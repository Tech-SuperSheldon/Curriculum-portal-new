const express = require("express") ;
const app = express() ;
require("dotenv").config() ;
const main = require("./src/config/db") ;

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Importing Routers
const authRouter = require('./src/routes/authRoutes');
const pptRouter = require("./src/routes/pptRoutes") ;

// Handling Routers
app.use('/auth', authRouter);
app.use('/ppt' , pptRouter);

const initializeConnection = async () => {
  try {
    await main();
    console.log("MongoDB Connected!");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Error: " + err);
  }
};

initializeConnection();