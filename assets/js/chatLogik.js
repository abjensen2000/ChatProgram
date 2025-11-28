const chatInput = document.querySelector('#chatInput');
const sendChatKnap = document.querySelector('#sendChatKnap')

sendChatKnap.onclick = async () => {
    console.log("Besked sendt")
    const data = await post('/chats', {
        data: chatInput.value,
    })
    if(data.ok == true){
        window.location.reload();
    }
}

async function post(url, objekt) {
    const respons = await fetch(url, {
        method: "POST",
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    })
    if (respons.status !== 201){
        throw new Error(respons.status)}
    return await respons.json()
}