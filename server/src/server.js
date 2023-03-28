import app from "./index.js";
const port = 8000;
app.listen(port,() =>{
    console.log(` app listening on port http://localhost:${port}/api/v1/`);
})