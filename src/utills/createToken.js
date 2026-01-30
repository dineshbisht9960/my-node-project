const jwt = require("jsonwebtoken");
module.exports.createToken = (data) => {
    expiresIn = "1d",
        secret_key = "test"

   return jwt.sign({ data }, secret_key, { expiresIn })
}
