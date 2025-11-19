import { Router } from 'express'
const userRouter = Router();
import fs from 'fs/promises'

userRouter.get('/', async (req, res) => {
    const users = await getUsers()
    res.send(users)
})

async function getUsers() {
    try {
        let users = await fs.readFile('assets/data/users.txt', 'utf-8')
        return JSON.parse(users);
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