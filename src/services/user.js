const { signUp } = require("../controllers/userController")
const { login } = require("../controllers/userController")
const {updateData} = require("../controllers/userController")

module.exports.signUp = async (req, res, next) => {
  try {
    const result = await signUp(req.body)
    return res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    next(error)

  }
}

module.exports.login = async (req, res, next) => {
  try {
    const result = await login(req.body);
    return res.status(201).json({ result });
  } catch (error) {
    console.log(error);
    next(error)
  }
}

module.exports.updateData = async (req, res, next) =>{
  try {
    const id = req.user.id;
    const result = await updateData(id ,req.body);
    
    return res. status(200).json({result});
  } catch (error) {
    console.log(error);
    next(error);
  }
}