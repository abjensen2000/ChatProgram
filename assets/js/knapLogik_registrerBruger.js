const navn = document.querySelector('#nytBrugernavn');
const password = document.querySelector('#nytPassword');
const password_Gentaget = document.querySelector('#nytPasswordGentaget');
const registrer = document.querySelector('#registrerKnap');


registrer.onclick = async () => {

    const navnValue = navn.value.trim();
    const pass1 = password.value.trim();
    const pass2 = password_Gentaget.value.trim();

    if (pass1 !== pass2) {
        alert("Passwords matcher ikke!");
        return;
    }

    const response = await fetch('/opretBruger', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            brugernavn: navnValue,
            password: pass1
        })
    });

    const result = await response.json();

    if (result.ok) {
        window.location.href = '/login';
    } else {
        alert(result.msg);
    }

    console.log('klikket');

};