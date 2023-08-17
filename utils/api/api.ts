import axios, { Axios } from "axios"
import { AxiosResponse } from "axios";
import { signOut } from "next-auth/react";
import { UserData } from "../data/types";

export const BASE_URL = process.env.DATABACKEND_URL;

axios.defaults.baseURL = 'https://api.briggsdev.tech';

const API = {
    getOrganisations: (): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.get('/organisations')
                .then(response => resolve(response))
                .catch(error => {
                    if(error.response.status === 401){
                        signOut();
                    }else{
                        reject(error)
                    }
                })
        })
    },
    getOrganisationsByUser: (): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.get('/userorganisations')
                .then(response => resolve(response))
                .catch(error => {
                    if(error.response.status === 401){
                        signOut();
                    }else{
                        reject(error)
                    }
                })
        })
    },
    getResultsByOrganisation: (slug: string): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.get(`/results/${slug}`)
                .then(response => resolve(response))
                .catch(error => {
                    if(error.response.status === 401){
                        signOut();
                    }else{
                        reject(error)
                    }
                })
        })
    },
    getUsersByOrganisation: (slug: string): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.get(`/organisations/${slug}/users`)
                .then(response => resolve(response))
                .catch(error => {
                    if(error.response.status === 401){
                        signOut();
                    }else{
                        reject(error)
                    }
                })
        })
    },
    getOrganisationInfo: (slug: string): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.get(`/organisations/${slug}`)
                .then(response => resolve(response))
                .catch(error => {
                    if(error.response.status === 401){
                        signOut();
                    }else{
                        reject(error)
                    }
                })
        })
    },
    createNewUser: (userData: UserData): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.post('/public/register', userData)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    getUserData: (): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.get('/user')
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    }
}

export default API;