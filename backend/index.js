import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"

//allows to access env variables
dotenv.config()

//access to mongo client 
const MongoClient = mongodb.MongoClient

//create port number (if port cannot be access, use port:8000)
const port = process.env.PORT || 8000

//connect to database
MongoClient.connect(
    //pass information
    process.env.RESTREVIEWS_DB_URI,
    {
        //pass options for accessing db
        //only 50 can connect at a time
        maxPoolSize: 50,
        setTimeout: 2500,
        useNewURLParse: true 
    }
    //catch error
    .catch (err => {
        //write the error in the console and exit the process
        console.error(err.stack)
        process.exit(1)
    })
    .then (async client => {
        //start the webserver
        app.listen(port, () => {
            console.log('listening on port ${port}')
        })
    })
)