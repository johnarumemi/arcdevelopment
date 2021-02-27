import axios from "axios";

export const services = {

    getAll: async function (){

        const response = await axios({
            url: 'http://localhost:4000/services',
            method: 'GET',
            responseType: 'json'
        });
        return {...response, ok: response.statusText === 'OK'}
    }
}
