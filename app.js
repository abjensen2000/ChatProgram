import express from 'express'
import session from 'express-session'
import { chatRouter } from './routes/chats.js'
import { userRouter } from './routes/users.js'
import { opretRouter } from './opretBruger.js'

const app = express();

app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));

app.use(session({ secret: 'dinmor', resave: true, saveUninitialized: true }));

app.use('/chats', chatRouter);
app.use('/users', userRouter);
app.use('/opretBruger', opretRouter);



app.get('/', (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (isLoggedIn === true) {
        res.redirect('/chats')
    } else { res.redirect('/login') }
})

app.get('/login', (req, res) => {
    const isLoggedIn = req.session.isLoggedIn;
    if (isLoggedIn === true) {
        res.redirect('chats')
    } else { res.render('login') }
})

app.post('/login', (req, res) => {
    for (const user of users) {
        if (user.brugernavn == req.brugernavn && user.kodeord == req.kodeord) {
            res.status(201).send({ ok: true })
        }
    }
})

app.listen(8080, (error) => console.log('Du er forbundet til chatprogram på port 8080'));