import { ali, getRandomNumber, Getname} from "./sckript.js";

async function  imp() {
    const msd = getRandomNumber();
    console.log("kutilgan vaqt", msd);
    await ali(msd)
    const mal = new Getname("Azizbek", 2002)
    console.log(mal.getInfo());
}

imp();