export const ali = (a) => new Promise(res => setTimeout(res, a))

export const getRandomNumber =  () => Math.floor(Math.random() * (999 - 100 + 1)) + 100;


export class Getname {
    constructor(fullName, birthday) {
        this.fullName = fullName
        this.birthday = birthday
    }


    get yosh(){
        return new Date().getFullYear() - this.birthday
    }
    getInfo(){
        return `ism: ${this.fullName} yoshi: ${this.yosh}`
    }
}