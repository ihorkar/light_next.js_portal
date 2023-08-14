import axios from "axios"
import { AxiosResponse } from "axios";

export const BASE_URL = process.env.DATABACKEND_URL;

axios.defaults.baseURL = 'https://api.briggsdev.tech';

const API = {
    getOrganisations: (): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.get('/organisations')
                .then(response => resolve(response))
        })
    },
    getOrganisationsByUser: (): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.get('/userorganisations')
                .then(response => resolve(response))
        })
    },
    getResultsByOrganisation: (slug: string): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.get(`/results/${slug}`)
                .then(response => resolve(response))
        })
    }
}

export default API;