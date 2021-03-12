const sendLiveSetting = async (req, res, next) => {
  res.json({
    livesetting: req.liveSeting,
  });
};

module.exports = sendLiveSetting;
