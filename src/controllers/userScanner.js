const QRCode = require("qrcode");
const { v4: uuidv4 } = require("uuid");
const Scan = require("../models/Scan");

module.exports.createDynamicQR = async (data) => {
  try {
    const { message } = data
    const qrId = uuidv4();
    const dynamicUrl = `http://localhost:5000/useScanner/${qrId}`;
    const qrImage = await QRCode.toDataURL(message);

    // const ScannerData = await Scan.create({
    //   qrId,
    //   url: dynamicUrl,
    //   message
    // });

    return {
      qrId,
      qrImage,
      url: dynamicUrl
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports.getScanData = async (qrId) => {
  const data = await Scan.findOne({ qrId });

  if (!data) {
    throw new Error("QR not found");
  }

  return {
    message: data.message
  };

};
