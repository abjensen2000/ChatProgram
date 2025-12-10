import { Router } from 'express'
const chatRouter = Router();
import { getData } from './get&post.js';
import fs from 'fs/promises'
import { json } from 'stream/consumers';

chatRouter.post('/logUd', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            return res.status(500).send({ ok: false, message: "Kunne ikke logge ud" });
        }
        res.status(201).send({ ok: true });
    });
});

chatRouter.delete('/', async (req, res) => {
    const chatId = req.body.chatId
    console.log(chatId)
    const parsedChatsData = await getData("chats.json")

    for (let i = 0; i < parsedChatsData.chats.length; i++) {
        if (parsedChatsData.chats[i].id == chatId) {
            parsedChatsData.chats.splice(i, 1);
            break;
        }
    }
    await fs.writeFile('assets/data/chats.json', JSON.stringify(parsedChatsData, null, 2))
    res.send({ ok: true })

})

chatRouter.post('/opretChat', async (req, res) => {
    const chatNavn = req.body.chatNavn
    console.log(chatNavn)
    const parsedChatsData = await getData("chats.json")
    console.log(JSON.stringify(parsedChatsData.chats))

    let maxId = 0;
    for (const chat of parsedChatsData.chats) {
        maxId++
    }

    const newChatId = maxId + 1

    const chat = {
        id: newChatId,
        navn: chatNavn,
        oprettelsesDato: 'skibidi',
        ejerBrugerId: req.session.currentUser.userId,
        beskeder: []
    }
    console.log(JSON.stringify(chat))
    console.log('--------------------------------------------------------------------')
    parsedChatsData.chats.push(chat)
    console.log(JSON.stringify(parsedChatsData.chats));
    await fs.writeFile('assets/data/chats.json', JSON.stringify(parsedChatsData, null, 2));
    res.status(201).send({ ok: true, chatNavn: req.body.chatNavn })
})

chatRouter.post('/sendChat', async (req, res) => {
    const parsedBeskedData = await getData("beskeder.json")
    console.log(JSON.stringify(parsedBeskedData.beskeder))

    let maxId = 0;
    for (const besked of parsedBeskedData.beskeder) {
        maxId++
    }

    const newBeskedId = maxId + 1

    const besked = {
        id: newBeskedId,
        besked: req.body.data,
        oprettelsesDato: 'skibidi',
        brugerId: req.session.currentUser.id,
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
    const userData = await getData("users.json")
    let beskedStringsTilPug = []
    for (const chat of chatData.chats) {
        if (chat.id == chatId) {
            for (const besked of beskedData.beskeder) {
                let nyBesked 
                let beskedTilString = null
                let userTilString = null
                req.session.beskedId++;
                if (besked.chatId == chat.id) {
                    beskedTilString = besked.besked
                    chat.beskeder.push(JSON.stringify({ brugerId: besked.brugerId, besked: besked.besked }));
                    for (const user of userData.users) {
                        if (user.id == besked.brugerId) {
                            userTilString = user.brugernavn
                            nyBesked = userTilString + ": " + beskedTilString
                            beskedStringsTilPug.push(nyBesked)
                        }
                    }

                }
            }
            res.render('chat', { beskeder: beskedStringsTilPug, cssFil: 'chat' }) //TODO gør chatsne flotte
        } else {
            console.log('Chat findes ikke')
        }
    }

})

chatRouter.get('/', async (req, res) => {
    const userData = await getData("users.json")
    const currentUserLevel = req.session.currentUser.brugerNiveau

    req.session.beskedId = 0;
    const isLoggedIn = req.session.isLoggedIn;
    if (isLoggedIn == true) {
        const data = await getData("chats.json")
        res.render('chats', { cssFil: 'chats', chats: data.chats, userData: userData, currentUserLevel: currentUserLevel, currentUserId: req.session.currentUser.id })
    }
    else {
        res.redirect('/login')
    }
})

export { chatRouter }