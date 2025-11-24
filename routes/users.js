import { Router } from 'express'
const userRouter = Router();
import fs from 'fs/promises'



userRouter.get('/api', async (req, res) => {
    const users = await getUsers()
    res.send(users)
})

userRouter.get('/', async (req, res) => {
    const users = await getUsers()
    res.render('usersPug', {users: users})
})

async function getUsers() {
    try {
        const data = await fs.readFile('assets/data/users.json', 'utf-8')
        const parsedData = JSON.parse(data)
        return parsedData.users;
    } catch (err) {
        console.log(err);
    }
}


async function post(url, objekt) {
    const respons = await fetch(url, {
        method: "POST",
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    })
    if (respons.status !== 201)
        throw new Error(respons.status)
    return await respons.json()
}

export { userRouter }