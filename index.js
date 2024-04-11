import Alumno from "./src/models/alumno.js";
import {sumar, restar, multiplicar, dividir} from "./src/modules/matematica.js";
import {OMDBSearchByPage,OMDBSearchComplete, OMDBGetByImdbID} from "./src/modules/wrapper.js";

import express from "express";
import cors from "cors";
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

//Endpoints
app.get('/', (req, res) => {
res.status(200);
res.send("¡Ya Estoy Respondiendo!");
})
app.get('/saludar/:nombre', (req, res) => {
    res.status(200);
    res.send(`Hola ${req.params.nombre}`);
})

app.get('/validarfecha/:ano/:mes/:dia', (req, res) => {
    let date = Date.parse(`${req.params.ano}-${req.params.mes}-${req.params.dia}`)
    if (!isNaN(date)) {
        res.status(200).send("OK");
    }
    else{
        res.status(400).send("Not OK");
    }
})

//Inicio del servidor
app.listen(port, () => {
console.log(`Example app listening on port ${port}`)
})