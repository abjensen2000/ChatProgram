import { Router } from 'express'
const loginRouter = Router();
import { getData } from './get&post.js';

loginRouter.get('/', (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (isLoggedIn === true) {
        res.redirect('chats')
    } else {
        res.render('login')
    }
})

loginRouter.post('/', async (req, res) => {
    const data = await getData('users.json')
    console.log(req.body.brugernavn)
    for (const user of data.users) {
        if (user.brugernavn == req.body.brugernavn && user.kodeord == req.body.kodeord) {
            req.session.isLoggedIn = true;
            req.session.currentUser = user;
            console.log('Nice')
            res.status(201).send({ok: true })
        }
        console.log('Forkert')
    }
})



export {loginRouter}