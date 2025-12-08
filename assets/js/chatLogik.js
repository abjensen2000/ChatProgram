const chatInput = document.querySelector('#chatInput');
const sendChatKnap = document.querySelector('#sendChatKnap')

sendChatKnap.onclick = async () => {
    const data = await post('/chats/sendChat', { data: chatInput.value})
    if (data.ok == true) {
        console.log("Besked sendt")
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




