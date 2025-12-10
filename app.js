import express from 'express'
import session from 'express-session'
import {chatRouter} from './routes/chats.js'
import {userRouter} from './routes/users.js'
import {loginRouter} from './routes/login.js'
import { opretRouter } from './routes/opretBruger.js'

const app = express();
app.set('view engine', 'pug');
app.use(express.static('assets'));
app.use(express.json());

app.use(session({
    secret: 'dinmor',
    resave: true,
    saveUninitialized: true
}));

app.use('/chats', chatRouter);
app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/opretBruger', opretRouter)



app.get('/', (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    //const userId = req.session.userId;
    //const chatId = req.session.chatId;
    if (isLoggedIn === true) {
        res.redirect('/chats')
    } else {
        res.redirect('/login')
    }
})









app.listen(8080, () => console.log('Du er forbundet til chatprogram på port 8080'));