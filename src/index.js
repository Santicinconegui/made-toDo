import app from "./app.js";
import { connectDB } from "./db.js";

connectDB();
let PORT = 3000;

app.listen(PORT);
console.log(`Server listen on port ${PORT} 🍆`);
