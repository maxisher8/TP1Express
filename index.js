import Alumno from "./src/models/alumno.js";
import {sumar, restar, multiplicar, dividir} from "./src/modules/matematica.js";
import {OMDBSearchByPage,OMDBSearchComplete, OMDBGetByImdbID} from "./src/modules/wrapper.js";

const alumnosArray = [];
alumnosArray.push(new Alumno("Esteban Dido" , "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao" , "32623391", 18));

import express, { query } from "express";
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

app.get('/matematica/sumar', (req, res) => {
    res.send(`${sumar(req.query.n2, req.query.n1)}`).status(200);

})

app.get('/matematica/restar', (req, res) => {
    res.send(`${restar(req.query.n2, req.query.n1)}`).status(200);

})

app.get('/matematica/multiplicar', (req, res) => {
    res.send(`${multiplicar(req.query.n2, req.query.n1)}`).status(200);

})

app.get('/matematica/dividir', (req, res) => {
    if(req.params.numero2 == "0"){
        res.send("El divisor no puede ser 0").status(400);
    }
    else{
        res.send(`${dividir(req.query.n2, req.query.n1)}`).status(200);
    } 
})

app.get('/omdb/searchbypage', async (req, res) => {
    const result = await OMDBSearchByPage(req.query.search, req.query.p);
    res.status(200).send(result);
})

app.get('/omdb/searchcomplete', async (req, res) => {
    const result = await OMDBSearchComplete(req.query.search);
    res.status(200).send(result);
})

app.get('/omdb/getbyomdbid/', async (req, res) => {
    const result = await OMDBGetByImdbID(req.query.imdbid);
    res.status(200).send(result);
})

app.get('/alumnos', (req, res) => {
    const result = alumnosArray;
    res.status(200).send(result);
})

app.get('/alumnos/:dni', (req, res) => {
    const result = alumnosArray.find(({ DNI }) => DNI === req.params.dni);
    res.status(200).send(result);
})

app.post('/alumnos', (req, res) => {
    let alumno = new Alumno(req.body.username, req.body.DNI, req.body.edad);    
    alumnosArray.push(alumno);
    res.status(201).send(alumnosArray);
})

app.delete('/alumnos/delete', (req, res) => {
    let alumno = new Alumno(req.body.username, req.body.DNI, req.body.edad);
    let encontrado = false;
    let i = 0;
    while(encontrado == false){
        if (alumnosArray[i].DNI == alumno.DNI) {
            encontrado = true;
            alumnosArray.splice(i, 1);
        }
        i++;
    }
    res.status(201).send(alumnosArray);
})

//Inicio del servidor
app.listen(port, () => {
console.log(`App iniciada en el puerto: ${port}`)
})