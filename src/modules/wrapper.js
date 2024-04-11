import axios from "axios";
const APIKEY = "15374cbd";
const OMDBSearchByPage = async (searchText, page = 1) => {
let returnObject = {
respuesta : false,
cantidadTotal : 0,
datos : []
};
let response = await(await(axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`))).data;
if (returnObject.datos != undefined && returnObject.datos != null){
    returnObject.respuesta = true;
}
response.Search.forEach(element => {
    returnObject.datos.push(element);
    returnObject.cantidadTotal++;
});
return returnObject;
};

const OMDBSearchComplete = async (searchText) => {
let returnObject = {
respuesta : false,
cantidadTotal : 0,
datos : []
};
let data = await(await(axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${1}`))).data;
console.log(Math.ceil(data.totalResults/10))
let response = null;
for (let page = 1; page <= Math.ceil(data.totalResults/10); page++)
{
    response = (await axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`)).data;
    console.log(response);
    response.Search.forEach(element => {
        returnObject.datos.push(element);
        returnObject.cantidadTotal++;
    });
    page++;
}
if (returnObject.datos != undefined && returnObject.datos != null){
    returnObject.respuesta = true;
}
return returnObject;
};
const OMDBGetByImdbID = async (imdbID) => {
let returnObject = {
respuesta : false,
cantidadTotal : 1,
datos : []
};
returnObject.datos = (await axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${imdbID}`)).data;
if (returnObject.datos != undefined && returnObject.datos != null){
    returnObject.respuesta = true;
}
return returnObject;
};

export {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID};