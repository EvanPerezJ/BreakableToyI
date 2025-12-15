import axios from 'axios';

// La URL base debe coincidir con tu Backend Spring Boot
const api = axios.create({
  baseURL: 'http://localhost:9090/api', // Recuerda que en el Controller pusimos @RequestMapping("/api/products")
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;