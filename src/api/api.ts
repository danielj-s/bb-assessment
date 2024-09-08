import express, { Request, Response} from 'express'
import cors from 'cors'
import { Sequelize, Model, DataTypes } from 'sequelize'
const app = express();
const PORT = 5001;

// This very permissive cors middleware is just to let the UI talk to this toy server;
// in production you would want a proper middleware that does things like
// validate authentication, parse tokens for profile claims, etc.
app.use(cors())

// In prod the DB logic would be extracted from the top-level API controllers,
// this just doesn't seem like enough to require a whole separate file or directory
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
  });

// Again, in production DB setup would be its own silo, with migrations written in sql (or whatever);
// also there'd be a user ID column to get the user's specific subscriptions, but for now max users is 1
class Subscriptions extends Model {}
Subscriptions.init({
    "the-dish": DataTypes.BOOLEAN,
    "the-scan": DataTypes.BOOLEAN
}, { sequelize, modelName: 'subscriptions' });

sequelize.sync();

app.get('/subscriptions', async (_, res: Response ) => {
    const subscriptions = await Subscriptions.findOrCreate({ where: {id: 1 } })
    res.json(subscriptions)
})

app.post('/subscriptions/:newsletter', async (req: Request, res: Response) => {
    const subscriptions = await Subscriptions.findOne()
    const key = req.params.newsletter
    if (subscriptions !== null) {
        await subscriptions.update({
            // I apologize for this; types would be derived from schema in production (ideally)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [key]: !(subscriptions as any)[key]
        })
        res.json(subscriptions)
    } else {
        // Would ideally create a row with default values for the user
        // in its own controller or as part of an onboarding flow
        Subscriptions.create({[req.params.newsletter]: true})
        const createdSubscriptions = await Subscriptions.findOne()
        res.json(createdSubscriptions)
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})