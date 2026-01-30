const Controller = require("../controllers/userScanner");
const { userScannerValidation } = require("../validations/scannerValition");

module.exports.generateQR = async (req, res, next) => {
  try {
    const { error } = userScannerValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const result = await Controller.createDynamicQR(req.body);

    res.status(201).json({
      success:"Scanner Successfully Generated",
      data: result
    });

  } catch (error) {
    next(error);
  }
};

module.exports.scanQR = async (req, res, next) => {
  try {
    const {qrId} = req.params
    const data = await Controller.getScanData(qrId);
    res.json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};
