require("dotenv").config()

const express = require('express');
const morgan = require("morgan")
const userRouter = require('./routes/userRouter');
const scannerRouter = require("./routes/scannerRouter")
const otpVerifyRouter = require("./routes/otpVerifyRouter")
const { connectDb } = require('./config/db');


const app = express();

app.use(express.json());
const cors = require('cors');
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
}))
  connectDb();


app.use('/api', userRouter);
app.use('/useScanner', scannerRouter)
app.use('/otp',otpVerifyRouter)

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 400).json({
    success: false,
    message: error.message || 'Internal Server Error'
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server started ${process.env.PORT}`);

})