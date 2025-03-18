const fs = require('fs');

function writeNumbers(filename) {
    let numbers = '';
    for (let i = 0; i < 100; i++) {
        numbers += Math.floor(Math.random() * 100) + '\n'; 
    }
    fs.writeFileSync(filename, numbers, 'utf8');
    console.log(`100 ta tasodifiy son ${filename} fayliga yozildi.`);
}

function readNumbers(filename) {
    const data = fs.readFileSync(filename, 'utf8');
    const numbersArray = data.split('\n').filter(num => num !== '').map(Number);
    console.log('Fayldan o‘qilgan sonlar:', numbersArray);
    return numbersArray;
}

const filename = 'sonlar.txt';
writeNumbers(filename);
const numbers = readNumbers(filename);