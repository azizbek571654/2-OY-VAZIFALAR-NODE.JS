const http = require("http"); 
const url = require("url"); 

const PORT = 3000; 

let kitoblar = [
    { id: 1, nomi: "Atomik Odatlar", muallif: "Jeyms Klir" },
    { id: 2, nomi: "Alkimyogar", muallif: "Paulo Koelyo" }
];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); 
    const yol = parsedUrl.pathname; 
    const method = req.method; 

    if (yol === "/books" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(kitoblar));
}

    else if (yol === "/books" && method === "POST") {
let body = "";
req.on("data", (chunk) => {
    body += chunk.toString(); 
});
req.on("end", () => {
    const yangiKitob = JSON.parse(body); 
    yangiKitob.id = kitoblar.length + 1; 
    kitoblar.push(yangiKitob); 
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(yangiKitob));
});
    }

    else if (yol.startsWith("/books/update/") && method === "PUT") {
const kitobId = parseInt(yol.split("/")[3]); 
        let body = "";
req.on("data", (chunk) => {
    body += chunk.toString();
});
req.on("end", () => {
    const yangilanganMalumot = JSON.parse(body);
    const kitob = kitoblar.find(k => k.id === kitobId);
    if (!kitob) {
        res.writeHead(404, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ xabar: "Kitob topilmadi" }));
    }
    if (yangilanganMalumot.nomi) kitob.nomi = yangilanganMalumot.nomi;
    if (yangilanganMalumot.muallif) kitob.muallif = yangilanganMalumot.muallif;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(kitob));
});
    }

    else if (yol.startsWith("/books/") && method === "DELETE") {
const kitobId = parseInt(yol.split("/")[2]);
        kitoblar = kitoblar.filter(k => k.id !== kitobId);
res.writeHead(200, { "Content-Type": "application/json" });
res.end(JSON.stringify({ xabar: "Kitob o‘chirildi" }));
    }

    else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ xabar: "Sahifa topilmadi" }));
}
});


server.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} da ishlayapti`);
});
