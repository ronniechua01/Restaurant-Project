//import area

import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

//create express server
const app = express()

//middleware
//use cors module and express
app.use(cors())
app.use(express.json())

//use restaurants api (to be created)
app.use("/api/v1/restaurants", restaurants)

//if someone tries to go to a non-existent route
//"*" means wildcard, return an error
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

//export app as a module
export default app