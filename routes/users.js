import { Router } from 'express'
const userRouter = Router();
import { getData } from './get.js';

userRouter.get('/api', async (req, res) => {
    const data = await getData("users.json")
    res.send(data.users)
})

userRouter.get('/', async (req, res) => {
    const data = await getData("users.json")
    console.log(data)
    res.render('usersPug', {users: data.users})
})




export { userRouter }