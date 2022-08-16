const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

const PORT = process.env.PORT || 3000

let db,
    dbString = process.env.DB_STRING,
    dbName = 'goals'

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(dbString, {useUnifiedTopology: true})
    
    db = client.db('goals')
    console.log(`Connected to MongoDB: ${db}`)
  } catch (err) {
    console.log(err)
  }
}
connectDB()

app.set('view engine', 'ejs')                   
app.use(express.static('public'))               
app.use(express.urlencoded({ extended: true }))
app.use(express.json())    

app.get('/',async (request, response)=>{
    try {
    const itemsInDb = await db.collection('goalColl').find().toArray()
    
    response.render('index.ejs', { items: itemsInDb })

    } catch (error) {
        console.log(error)
    }
    
})

app.post('/addGoal', (req, res) => {
    try {
        
    } catch (err) {
        console.log(err)
    }
})
app.listen(PORT, console.log(`Listening on port ${PORT}`))
 
    