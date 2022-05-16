const express = require("express");
const Humidity = require("../models/Humidity");
const Light = require("../models/Light");
const Temperature = require("../models/Temperature");
const User = require("../models/User");
const router = express.Router();

router.post("/temperature", async (req, res) => {
  const { celcius, fahrenheit } = req.body;
  if (!celcius || !fahrenheit)
    return res.status(401).json({
      success: false,
      message: "Missing fields, please send both C and F for a better result",
    });

  try {
    const getDate = new Date().toString();
    const newTemp = await new Temperature({
      celcius,
      fahrenheit,
      updatedAt: getDate,
    });
    await newTemp.save();

    if (!newTemp)
      return res.status(404).json({
        success: false,
        message: "Cannot add new temp, please try again",
      });
    return res
      .status(200)
      .json({ success: true, message: "Add new temperature successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error " + err });
  }
});

router.post("/humidity", async (req, res) => {
  const { humidity } = req.body;
  if (!humidity)
    return res.status(401).json({
      success: false,
      message:
        "Missing fields: please send with humidity. check your field again",
    });

  try {
    const getDate = new Date().toString();
    const newHumi = await new Humidity({
      humidity,
      updatedAt: getDate,
    });
    await newHumi.save();

    if (!newHumi)
      return res.status(404).json({
        success: false,
        message: "Cannot add new humidity, please try again",
      });
    return res
      .status(200)
      .json({ success: true, message: "Add new humidity successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `Internal server error: ${err}` });
  }
});

router.post("/light", async (req, res) => {
  const { light, uv, windDensity } = req.body;
  if (!light || !uv || !windDensity)
    return res.status(401).json({
      success: false,
      message: "Missing fields, please doublecheck your fields",
    });

  try {
    const getDate = new Date().toString();
    const newLight = await new Light({
      light,
      uv,
      windDensity,
      updatedAt: getDate,
    });
    await newLight.save();

    if (!newLight)
      return res.status(404).json({
        success: false,
        message: "Cannot add new temp, please try again",
      });
    return res
      .status(200)
      .json({ success: true, message: "Add new temperature successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error " + err });
  }
});

router.get("/detail", async (req, res) => {
  try {
    const temp = await Temperature.find().skip(User.collection.count() - 1);
    const light = await Light.find().skip(Light.collection.count() - 1);
    const humid = await Humidity.find().skip(Humidity.collection.count() - 1);

    if (!temp || !light || !humid)
      return res.status(404).json({
        success: false,
        message:
          "Missing fields, please make sure you have inserted at lease 1 collecion before",
      });

    return res.status(200).json({
      success: true,
      message: "Get info successfully",
      info: {
        temp,
        light,
        humid,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: `Internal server error: ${err}` });
  }
});

module.exports = router;
