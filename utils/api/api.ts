import axios, { Axios } from "axios"
import { AxiosResponse } from "axios";
import { signOut } from "next-auth/react";
import { UserData } from "../data/types";
import { InvitationData } from "../data/types";
import { UserRole } from "../data/types";
import { resolve } from "path";

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
            axios.get(`/organisations/${slug}/results`)
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
    getResultContractURL: (slug: string, resultId: string): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.get(`/organisations/${slug}/results/${resultId}/contract`)
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
    getFormsByOrganisation: (slug: string): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.get(`/organisations/${slug}/forms`)
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
    },
    acceptOrganisationInvitation: (token: string): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.post(`/public/accept-invitation/${token}`)
                .then(response => resolve(response))
                .catch(error => reject(error))
        })
    },
    sendInvitation: (slug: string, data: InvitationData): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.post(`/organisations/${slug}/invite`, data)
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
    updateOrganisationUsers: (slug: string, data: {userId: string, role: string, updatedRole: string}): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.post(`/organisations/${slug}/users/update`, data)
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
    deleteOrganisationUsers: (slug: string, data: {userId: string, role: UserRole}): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.post(`/organisations/${slug}/users/delete`, data)
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
    createOrganisation: (data: {slug: string, name: string}): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.post(`/organisations`, data)
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
    updateOrganisation: (slug: string, data: any): Promise<AxiosResponse> => {
        return new Promise((resolve, reject) => {
            axios.post(`/organisations/${slug}/update`, data)
                .then(response => resolve(response))
                .catch(error => {
                    if(error.response.status === 401){
                        signOut();
                    }else{
                        reject(error)
                    }
                })
        })
    }
}

export default API;