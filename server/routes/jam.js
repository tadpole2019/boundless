import express from "express";
import db from "../db.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.get("/", async (req, res, next) => {
  // 取得目前時間
  const now = new Date();
  now.setDate(now.getDate() - 30);
  const thirtyDaysAgo = now.toISOString();
  console.log(thirtyDaysAgo);
  let [jam] = await db
    .execute("SELECT * FROM `jam` WHERE `valid` = 1")
    .catch(() => {
      return undefined;
    });

  if (jam) {
    res.send(jam);
  } else {
    res.send("發生錯誤");
  }
});

router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  console.log(id);
  let [jam] = await db
    .execute("SELECT * FROM `jam` WHERE `id` = ? ", [id])
    .catch(() => {
      return undefined;
    });

  if (jam) {
    res.send(jam);
  } else {
    res.send("發生錯誤");
  }
});

export default router;
