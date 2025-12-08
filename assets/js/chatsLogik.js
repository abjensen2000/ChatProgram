const chatNavn = document.querySelector('#chatNavn')
const opretKnap = document.querySelector('#opretButton')
const sletKnapper = document.querySelectorAll('.sletChatKnap')
const logUdKnap = document.querySelector('#logUdKnap')

logUdKnap.onclick = async () => {
    const data = await post('/chats/logUd', {})
    if (data.ok == true){
        window.location.href = '/login'
    } else {
        console.log('Du må ikke logge ud')
    }

}

for (const sletKnap of sletKnapper) {
    sletKnap.onclick = async () => {
        const chatId = sletKnap.dataset.chatId;
        console.log('hallo' + chatId)
        const data = await del('/chats', {chatId: chatId});
        if (data.ok == true) {
            console.log('Chat slettet')
            window.location.reload();
        } else {
            console.log('Kunne ikke slette')
        }
    }
}



opretKnap.onclick = async () => {
    const data = await post('/chats/opretChat', { chatNavn: chatNavn.value })
    if (data.ok == true) {
        console.log('Chat oprettet')
        window.location.reload();
    } else {
        console.log('Skibidinoob')
    }

}


async function post(url, objekt) {
    const respons = await fetch(url, {
        method: "POST",
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    })
    if (respons.status !== 201) {
        throw new Error(respons.status)
    }
    return await respons.json()
}

async function del(url, objekt = null) {
    const options = {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
    };
    if (objekt) {
        options.body = JSON.stringify(objekt);
    }
    const respons = await fetch(url, options);

    if (!respons.ok) {
        throw new Error(`Fejl: ${respons.status}`);
    }
    return await respons.json();
}