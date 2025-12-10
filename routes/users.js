import { Router } from 'express'
const userRouter = Router();
import { getData } from './get&post.js';

userRouter.get('/:id/beskeder', async (req, res) => {
    const userData = await getData("users.json")
    const beskedData = await getData("beskeder.json")
    let specifikBruger
    let beskeder = []
    for (const bruger of userData.users) {
        if(bruger.id == req.params.id){
            specifikBruger = bruger
        }
    }
    for (const besked of beskedData.beskeder) {
        if(besked.brugerId == specifikBruger.id){
            beskeder.push(besked)
        }
    }
    res.render('specifikBrugersBeskeder', {specifikBrugerNavn: specifikBruger.brugernavn, specifikBrugerBeskeder: JSON.stringify(beskeder)})
})


userRouter.get('/:id', async (req, res) => {
    const data = await getData("users.json")
    let specifikBruger
    for (const bruger of data.users) {
        if(bruger.id == req.params.id){
            specifikBruger = bruger
        }
    }
    res.render('specifikBruger', {specifikBruger: specifikBruger.brugernavn})
})



userRouter.get('/api', async (req, res) => {
    const data = await getData("users.json")
    res.send(data.users)
})

userRouter.get('/', async (req, res) => {
    const data = await getData("users.json")
    console.log(data)
    if (req.session.currentUser.brugerNiveau == 3) {
        res.render('usersPug', { users: data.users })
    } else {
        res.status(404).send('Du er ikke stærk nok')
    }
})




export { userRouter }