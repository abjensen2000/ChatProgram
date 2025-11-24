import { Router } from 'express'
const loginRouter = Router();
import { getData } from './get.js';

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
    for (const user of data.users) {
        if (user.brugernavn == req.body.brugernavn && user.kodeord == req.body.kodeord) {
            req.session.isLoggedIn = true;
            console.log('Nice')
            res.status(201).send({ ok: true })
        }
        else {
            console.log('Forkert brugernavn eller kode')
        }
    }
})



export {loginRouter}