import fs from 'fs/promises'


export async function getData(filnavn) {
    try {
        const data = await fs.readFile(`assets/data/${filnavn}`, 'utf-8')
        const parsedData = JSON.parse(data)
        return parsedData;
    } catch (err) {
        console.log(err);
    }
}

export async function post(url, objekt) {
    const respons = await fetch(url, {
        method: "POST",
        body: JSON.stringify(objekt),
        headers: { 'Content-Type': 'application/json' }
    })
    if (respons.status !== 201){
        throw new Error(respons.status)}
    return await respons.json()
}