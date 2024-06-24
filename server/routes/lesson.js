import express from "express";
import db from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let [lesson] = await db.execute("SELECT * FROM `teacher_info` WHERE `valid` = 1");

    if (lesson) {
      res.json(lesson);
    } else {
      res.json("沒有找到相應的教訓");
    }
  } catch (error) {
    console.error("發生錯誤：", error);
    res.json("發生錯誤");
  }
});



export default router;
