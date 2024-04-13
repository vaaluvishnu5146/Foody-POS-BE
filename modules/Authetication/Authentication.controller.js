const AuthenticationRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const UserModel = require("./Authentication.model");

AuthenticationRouter.post("/signup", async (req, res, next) => {
  try {
    const user = new UserModel(req.body);
    const response = await user.save();
    if (response && response._id) {
      res.status(201).json({
        success: true,
        message: "Account created successfully",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Account creation failed",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
      success: false,
      message: "Account creation failed",
    });
  }
});

AuthenticationRouter.post("/signin", async (req, res, next) => {
  const { mobileNumber, password } = req.body;
  try {
    const response = await UserModel.findOne({ mobileNumber }); // {} or null
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else if (response && response.password != password) {
      return res.status(400).json({
        success: false,
        message: "Bad credentials",
      });
    } else {
      var token = jwt.sign(
        { userId: response._id },
        "FOODY_APPLICATION_SECRET",
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({
        success: true,
        message: "Login successfull",
        token,
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = AuthenticationRouter;
