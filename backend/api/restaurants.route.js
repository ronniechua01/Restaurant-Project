import express from "express"

//get access to express router

const router = express.Router()

//demo route 
//root url responds hello world
router.route("/").get((req, res) => res.send("hello world"))

export default router