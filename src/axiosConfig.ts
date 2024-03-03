import axios from 'axios';


// Create an Axios instance with default configuration
const token = localStorage.getItem('token');
const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // Additional default configurations can be added here
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
  timeout: 10000, // Optional: Set default request timeout
});

console.log(client)

export default client;