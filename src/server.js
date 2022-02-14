import csvtojson from 'csvtojson'
import express from 'express'
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

app.get('/covidArapiraca', (req, res) => {
    csvtojson()
        .fromFile('src/assets/dados.csv')
        .then((casos) => {
            console.log(casos)
            res.json(casos)
        })
})

app.listen(PORT, () => [
    console.log(`Server running on port ${PORT}`)
])