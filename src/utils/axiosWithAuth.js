import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('bearer-token')

    return axios.create({
        baseURL: 'https://cans-be.herokuapp.com/api/cans/',
        headers: {'Authorization': 'Bearer ' + token}
    })
}