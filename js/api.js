const API_URL = "http://localhost:3000/api/pastel";

//Obtener todos los Productos
export const getPastel = async() => {
    const response = await fetch(API_URL);
    return response.json();
};

//Obtener Producto por ID
export const getPastelbyID = async(id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
};

//Crear un Producto
export const addPastel = async(pastel) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(pastel)
    });
    return response.json();
};

//Actualizar un Producto
export const updatePastel = async(id, pastel) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(pastel)
    });
    return response.json();
};

//Borrar un Producto
export const deletePastel = async(id) => {
    return fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    
};