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

app.post('/addGoal', async (req, res) => {
    try {
        await db.collection('goalColl').insertOne({goal: req.body.goalItem})
        console.log('Goal Added')
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
})


//Listen on port in process.env
app.listen(PORT, console.log(`Listening on port ${PORT}`))
 
    