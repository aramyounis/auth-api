const joi = require("joi");

const liveSetting = async (req, res, next) => {
  var links = req.body.links;
  if (req.payload.Lv === 1) {
    const result = await joi
      .object({
        hostLink: joi.string().min(5).required(),
        links: joi.array().items(joi.string().min(5).required()).min(1).max(1),
      })
      .validateAsync(req.body);
    if (!result.error) {
      req.liveSeting = [
        "-re",
        "-i",
        `${req.body.hostLink}`,
        "-c",
        "copy",
        "-f",
        "flv",
        `${links[0]}`,
      ];
      next();
    } else {
      res.send(result);
    }
  } else if (req.payload.Lv === 2) {
    const result = await joi
      .object({
        hostLink: joi.string().min(5).required(),
        links: joi.array().items(joi.string().min(5).required()).min(1).max(2),
      })
      .validateAsync(req.body);
    if (!result.error) {
      var liveSeting = [];
      links.forEach((link) => {
        if (link !== "undefined" && link !== "") {
          liveSeting.push(
            "-re",
            "-i",
            `${req.body.hostLink}`,
            "-c",
            "copy",
            "-f",
            "flv",
            `${link}`
          );
        }
      });
      req.liveSeting = liveSeting;
      next();
    } else {
      res.send(result);
    }
  } else if (req.payload.Lv === 3) {
    const result = await joi
      .object({
        hostLink: joi.string().min(5).required(),
        links: joi.array().items(joi.string().min(5).required()).min(1).max(3),
      })
      .validateAsync(req.body);
    if (!result.error) {
      var liveSeting = [];
      links.forEach((link) => {
        if (link !== "undefined" && link !== "") {
          liveSeting.push(
            "-re",
            "-i",
            `${req.body.hostLink}`,
            "-c",
            "copy",
            "-f",
            "flv",
            `${link}`
          );
        }
      });
      req.liveSeting = liveSeting;
      next();
    } else {
      res.send(result);
    }
  }
};

module.exports = liveSetting;
