import axios from "axios"
import { AxiosResponse } from "axios";
import { signOut } from "next-auth/react";

export const BASE_URL = process.env.DATABACKEND_URL;

axios.defaults.baseURL = 'https://api.briggsdev.tech';

const API = {
    getOrganisations: (): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.get('/organisations')
                .then(response => resolve(response))
                .catch(function (error) {
                    if (error.response.status === 401) {
                      signOut();
                    }
                  }
                )
        })
    },
    getOrganisationsByUser: (): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.get('/userorganisations')
                .then(response => resolve(response))
                .catch(function (error) {
                    if (error.response.status === 401) {
                      signOut();
                    }
                  }
                )
        })
    },
    getResultsByOrganisation: (slug: string): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.get(`/results/${slug}`)
                .then(response => resolve(response))
                .catch(function (error) {
                    if (error.response.status === 401) {
                      signOut();
                    }
                  }
                )
        })
    }
}

export default API;