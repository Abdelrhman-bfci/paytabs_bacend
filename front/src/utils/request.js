import {getToken, isLogged, setLogged, notHasPermissions} from '../utils/auth';
import router from '../routes/index';
import Vue from 'vue'
import Swal from "sweetalert2";

const axios = require('axios');
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 150000000, // Request timeout
});

// Request intercepter
service.interceptors.request.use(
  config => {
    // const token = isLogged();
    // if (token) {
      config.headers['Authorization'] = 'trustRequest2022' ;                 //'Bearer ' + getToken();
      config.headers['Content-Type'] = 'application/json';
      config.headers['Accept'] = 'application/json';


    // }
    return config;
  },
  error => {
    // Do something with request error
    let message = error.message;
    if (error.response.data && error.response.data.errors) {
      message = error.response.data.errors;
    } else if (error.response.data && error.response.data.error) {
      message = error.response.data.error;
    }
    if (error.response.status !== 401 && error.response.status !== 404) {

    }
    Promise.reject(error);
  }
);

// response pre-processing
service.interceptors.response.use(
  response => {
    // if (response.headers.authorization) {
    //   setLogged(response.headers.authorization);
    //   response.data.token = response.headers.authorization;
    // }

    return response.data;
  },
  error => {
    let message = error.response.data;
    if (error.response.data && error.response.data.message) {
      message = error.response.data.message;
    } else if (error.response.data && error.response.data.error) {
      message = error.response.data.error;
    } else if (error.response.data && error.response.data.message) {
      message = error.response.data.message;
    }

    if (error.response.status !== 401 && error.response.status !== 404) {
      if (message) {
        Swal.fire({
          icon: 'error',
          text: message,
          confirmButtonClass: 'btn btn-info btn-fill',
          buttonsStyling: false
        })
      } else {
        Swal.fire({
          icon: 'error',
          confirmButtonClass: 'btn btn-info btn-fill',
          buttonsStyling: false
        })
      }
    }
    if ((error.response.status === 404 && !message) || (error.response.status === 404 && !message.name)) {
      router.push('/404');
    }
    if (error.response.status === 401 && !notHasPermissions()) {
      setLogged('2');
      router.push('/401');
    }
    return Promise.reject(error);
  }
);

export default service;
