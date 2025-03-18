import { dataOperations, stringOperations } from './src/index.js';
import process from 'process';

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'filter':
        console.log(dataOperations.filterArray(JSON.parse(args[1]), args[2]));
        break;
    case 'sort':
        console.log(dataOperations.sortArray(JSON.parse(args[1])));
        break;
    case 'ascii':
        console.log(stringOperations.convertToASCII(args[1]));
        break;
    case 'uppercase':
        console.log(stringOperations.uppercase(args[1]));
        break;
    case 'lowercase':
        console.log(stringOperations.lowercase(args[1]));
        break;
    default:
        console.log('Unknown command');
}
