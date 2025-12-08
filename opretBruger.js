// opretBruger.js

import { Router } from "express";
import fs from 'fs/promises';

const opretRouter = Router();

opretRouter.get('/', (req, res) => {
    res.render('opretBruger');
});

opretRouter.post('/', async (req, res) => {
    const { brugernavn, password } = req.body;

    // Læs eksisterende brugere
    let db;
    try {
        db = JSON.parse(await fs.readFile('assets/data/users.json', 'utf-8'));
    } catch {
        db = { users: [] }; // fallback hvis filen ikke findes
    }

    const users = db.users;

    // Check om brugernavn findes
    if (users.some(u => u.brugernavn === brugernavn)) {
        return res.json({ ok: false, msg: "Brugernavn findes allerede" });
    }

    // Opret ny bruger med alle nødvendige felter
    const nyBruger = {
        brugernavn: brugernavn,
        kodeord: password,
        oprettelsesDato: new Date().toISOString(),
        brugerNiveau: "1" // standardniveau for nye brugere
    };

    users.push(nyBruger);

    // Gem filen – husk at gemme hele objektet
    await fs.writeFile(
        'assets/data/users.json',
        JSON.stringify({ users }, null, 2)
    );

    // Lav session
    req.session.user = brugernavn;

    res.json({ ok: true });
});

export { opretRouter };
