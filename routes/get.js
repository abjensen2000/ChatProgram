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