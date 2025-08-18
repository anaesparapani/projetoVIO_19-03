import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  headers: {
    accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use( //resposta do servidor
  (response) => response, //se houver uma resposta, recupera e passa para frente
  (error) => { //se houver um erro, analisa o que tem de errado
    if (error.response) {
      if (error.response.status === 401 && error.response.data.auth === false) { //401 = sua autorização expirou
        localStorage.setItem("refresh_token", true);
        localStorage.removeItem("token");
        localStorage.removeItem("authenticated");
        window.location.href = "/"; //usa se por causa do arquivo js, e não react 
      }
      else if (error.response.status === 403 && error.response.data.auth === false) { //403 = requisição inválida
        localStorage.setItem("refresh_token", true);
        localStorage.removeItem("token");
        localStorage.removeItem("authenticated");
        window.location.href = "/"; //usa se por causa do arquivo js, e não react 
      }
    }
    return Promise.reject(error);
  }
);

const sheets = {
  getUsers: () => api.get("user"),
  postLogin: (user) => api.post("login/", user),
  deleteUser: (id) => api.delete("user/" + id),
  getEvento: () => api.get("evento"),
  deleteEvento: (id) => api.delete("evento/" + id),
  createIngresso: (ingresso) => api.post("/ingresso", ingresso),
  createEvento: (form, imagem) => {
    const data = new FormData();
    for (let key in form) data.append(key, form[key]);
    if (imagem) data.append("imagem", imagem);

    return api.post("/evento", data, {
      headers: {
        "Content-Type": "multpart/form-data",
        Accept: "application/json",
      },
    });
  },
};

export default sheets;
