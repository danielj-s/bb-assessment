const express = require('express')
const cors = require('cors')
const { Sequelize, Model, DataTypes } = require('sequelize')

const app = express();
const PORT = 5001;

//This very permissive cors middleware is just to let the UI talk to this toy server;
//in production you would want a proper middleware that does things like
//validate authentication, parse tokens for profile claims, etc.
app.use(cors())

//In prod the DB logic would be extracted from the top-level API controllers,
//this just doesn't seem like enough to require a whole separate file or directory
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  });

//Again, in production DB setup would be its own silo, with migrations written in sql (or whatever);
//also there'd be a user ID column to get the user's specific subscriptions, but for this max users is 1
class Subscriptions extends Model {}
Subscriptions.init({
    theDish: DataTypes.BOOLEAN,
    theScan: DataTypes.BOOLEAN
}, { sequelize, modelName: 'subscriptions' });

sequelize.sync();

app.get('/subscriptions', async (_, res) => {
    const subscriptions = await Subscriptions.findOne()
    res.json(subscriptions)
})

app.post('/subscriptions/:newsletter', async (req, res) => {
    const subscriptions = await Subscriptions.findOne()
    if (subscriptions !== null) {
        await subscriptions.update({
            [req.params.newsletter]: !subscriptions[req.params.newsletter]
        })
        res.json(subscriptions)
    } else {
        Subscriptions.create({[req.params.newsletter]: true})
        const createdSubscriptions = await Subscriptions.findOne()
        res.json(createdSubscriptions)
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})