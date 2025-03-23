import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;
const filename = "Users.json";

function readData() {
    if (!fs.existsSync(filename)) return [];
    const data = fs.readFileSync(filename, "utf8");
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(filename, JSON.stringify(data, null, 4));
}

app.use(express.json());

app.get("/users", (req, res) => {
    res.json(readData());
});

app.post("/users", (req, res) => {
    let users = readData();
    let newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    writeData(users);
    res.json({ message: "User added!", user: newUser });
});

app.put("/users/:id", (req, res) => {
    let users = readData();
    let id = parseInt(req.params.id);
    let userIndex = users.findIndex(user => user.id === id);

    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...req.body };
        writeData(users);
        res.json({ message: "User updated!", user: users[userIndex] });
    } else {
        res.status(404).json({ error: "User not found!" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
