import axios from "axios"
import { AxiosResponse } from "axios";

export const BASE_URL = process.env.DATABACKEND_URL;

axios.defaults.baseURL = 'https://api.briggsdev.tech';

const API = {
    getOrganisationsByUser: (identityId: string): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.get('/userorganisations', {
                params: {
                    identityId: identityId
                }
            }).then(response => resolve(response))
        })
    }
}

export default API;