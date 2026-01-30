module.exports = (schema) => {
  return (req, res, next) => {

    if (!schema) {
      return res.status(500).json({
        success: false,
        message: "Validation schema missing"
      });
    }

    const { error } = schema.validate(req.body, {
      abortEarly: true
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    next();
  };
};
