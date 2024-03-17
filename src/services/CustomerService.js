import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/customers'

export const listCustomers = () => {
    return axios.get(REST_API_BASE_URL);
}

export const createCustomer = (customer) => axios.post(REST_API_BASE_URL, customer);

export const getCustomer = (customerEmail) => axios.get(REST_API_BASE_URL + '/' + customerEmail);

export const updateCustomer = (customerEmail, customer) => axios.put(REST_API_BASE_URL + '/' + customerEmail, customer)

export const deleteCustomer = (customerEmail) => axios.delete(REST_API_BASE_URL + '/' + customerEmail)

