import { Router } from 'express'
const chatRouter = Router();
import { getData } from './get.js';
import fs from 'fs/promises'


chatRouter.get('/', async (req, res) => {
    const userData = await getData("users.json")
    const currentUserLevel = req.session.currentUser.brugerNiveau

    req.session.beskedId = 0;
    const isLoggedIn = req.session.isLoggedIn;
    if (isLoggedIn == true) {
        const data = await getData("chats.json")
        res.render('chats', { chats: data.chats, userData: userData, currentUserLevel: currentUserLevel})
    }
    else {
        res.redirect('/login')
    }
})

chatRouter.post('/', async (req, res) => {
    const parsedBeskedData = await getData("beskeder.json")
    console.log(JSON.stringify(parsedBeskedData.beskeder))
    const maxId = 0;
    for (const besked of parsedBeskedData.beskeder) {
        if (besked.beskedId > maxId) {
            maxId = besked.beskedId;
        }
        req.session.beskedId = maxId;
    }
    const besked = {
        id: req.session.beskedId,
        besked: req.body.data,
        oprettelsesDato: 'skibidi',
        brugerId: req.session.user.id,
        chatId: req.session.chatId
    }
    console.log(JSON.stringify(besked))
    console.log('--------------------------------------------------------------------')
    parsedBeskedData.beskeder.push(besked)
    console.log(JSON.stringify(parsedBeskedData.beskeder));
    await fs.writeFile('assets/data/beskeder.json', JSON.stringify(parsedBeskedData, null, 2));

    res.status(201).send({ ok: true, chatId: besked.chatId })
})

chatRouter.get('/:id', async (req, res) => {
    let chatId = req.params.id;
    req.session.chatId = chatId;
    const beskedData = await getData("beskeder.json")
    const chatData = await getData("chats.json")
    for (const chat of chatData.chats) {
        req.session.beskedId++;
        if (chat.id == chatId) {
            for (const besked of beskedData.beskeder) {
                if (besked.chatId == chat.id) {
                    chat.beskeder.push(JSON.stringify({ brugerId: besked.brugerId, besked: besked.besked }));
                }
            }
            res.render('chat', { chat })
        } else {
            console.log('Chat findes ikke')
        }
    }

})

export { chatRouter }