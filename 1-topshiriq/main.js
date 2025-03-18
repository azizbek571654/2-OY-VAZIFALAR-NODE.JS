import { CaesarCipher } from "./math/index.js";

var c = new CaesarCipher(5); 
console.log(c.encode('Codewars'));
console.log(c.decode('BFKKQJX')); 
