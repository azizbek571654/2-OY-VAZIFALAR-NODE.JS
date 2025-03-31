import { v4 as uuidv4 } from "uuid";

export default class Article {
    constructor(title, content, date) {
        this.id = uuidv4();
        this.title = title;
        this.content = content;
        this.date = date;
    }
}
