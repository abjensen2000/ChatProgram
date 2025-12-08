const brugernavn = document.querySelector('#username');
const kodeord = document.querySelector('#password');
const loginKnap = document.querySelector('#loginButton');

loginKnap.onclick = async () => {
    const data = await post('/login', {
        brugernavn: brugernavn.value,
        kodeord: kodeord.value,
    })
    if (data.ok == true) {
        window.location.href = "/chats"
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