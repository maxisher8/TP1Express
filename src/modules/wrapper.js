import axios from "axios";
const APIKEY = "15374cbd";
const OMDBSearchByPage = async (searchText, page = 1) => {
    let returnObject = {
        respuesta: false,
        cantidadTotal: 0,
        datos: []
    };
    try {
        let response = await axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`);
        
        if (response.data.Search) {
            response.data.Search.forEach(element => {
                returnObject.datos.push(element);
                returnObject.cantidadTotal++;
            });
            returnObject.respuesta = true;
        }
    } catch (error) {
        console.error("Error al realizar la solicitud a la API de OMDB:", error);
    }
    return returnObject;
};


const OMDBSearchComplete = async (searchText) => {
    let returnObject = {
        respuesta: false,
        cantidadTotal: 0,
        datos: []
    };

    try {
        let data = (await axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${1}`)).data;
        console.log(Math.ceil(data.totalResults / 10));

        for (let page = 1; page <= Math.ceil(data.totalResults / 10); page++) {
            let response = (await axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`)).data;
            console.log(response);

            if (response.Search) {
                response.Search.forEach(element => {
                    returnObject.datos.push(element);
                    returnObject.cantidadTotal++;
                });
            } else {
                throw new Error("La respuesta de la API no contiene datos de búsqueda.");
            }
        }

        if (returnObject.datos.length > 0) {
            returnObject.respuesta = true;
        }
    } catch (error) {
        console.error("Error al realizar la solicitud a la API de OMDB:", error);
        returnObject.error = error.message;
    }

    return returnObject;
};

 
const OMDBGetByImdbID = async (imdbID) => {
    let returnObject = {
        respuesta: false,
        cantidadTotal: 1,
        datos: []
    };

    try {
        returnObject.datos = (await axios.get(`http://www.omdbapi.com/?apikey=${APIKEY}&i=${imdbID}`)).data;

        if (returnObject.datos !== undefined && returnObject.datos !== null) {
            returnObject.respuesta = true;
        }
    } catch (error) {
        console.error("Error al realizar la solicitud a la API de OMDB:", error);
        returnObject.error = error.message;
    }

    return returnObject;
};


export {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID};