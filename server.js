import express from 'express';
import {db} from './VAZIFALAR/src/db.js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});