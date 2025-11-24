import { Router } from 'express'
const chatRouter = Router();
import { getData } from './get.js';


chatRouter.get('/', async (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (isLoggedIn == true) {
        const data = await getData("chats.json")
        res.render('chats', { chats: data.chats })
    }
    else {
        res.redirect('/login')
    }
})

chatRouter.get('/:id', async (req, res) => {
    const chatId = req.params.id;
    const beskedData = await getData("beskeder.json") 
    const chatData = await getData("chats.json")
    for (const chat of chatData.chats) {
        if (chat.id == chatId) {
            for (const besked of beskedData.beskeder) {
                if(besked.chatId == chat.id){
                    chat.beskeder.push(JSON.stringify({brugerId: besked.brugerId, besked: besked.besked}));
                }
            }
            res.render('chat', {chat})
        } else {
            console.log('Chat findes ikke')
        }
    }

})

export { chatRouter }