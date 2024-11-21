//Importar metodos del api.js
import { getPastel, getPastelbyID, updatePastel, deletePastel } from "./api.js";

document.addEventListener("DOMContentLoaded", async() => {
    const pastelList = document.getElementById("pastel-list");

    const pastel = await getPastel();
    pastelList.innerHTML = pastel.map(pastel => `
          <div class="col-xs-12 col-sm-6 col-md-3 card">
            <div class="card-body d-flex flex-column justify-content-end">
              <h5 class="card-title">${pastel.name}</h5>
              <p class="card-text">${pastel.price}</p> 
              <a onclick="viewPastel(${pastel.id})" class="btn btn-primary">Ver mas</a>
            </div>
          </div>  
        `).join("");
});

//Metodo para ver los detalles del producto cuando damos clic en el boton "ver mas"
window.viewPastel = async (id) => {
    const pastel = await getPastelbyID(id);
    
    const pastelDetails = `
      <div class="col">
        <h3>${pastel.name}</h3>
        <p>${pastel.description}</p>
        <p>Precio: ${pastel.price}</p>
        <button class="btn btn-warning" onclick="enableEdit(${pastel.id})">Editar</button>
        <button class="btn btn-danger" onclick="deletePastel(${pastel.id})">Eliminar</button>
      </div>
    `;
    document.getElementById("pastel-list").innerHTML = pastelDetails;
};

//Vsita para editar la informacion
window.enableEdit = async (id) => {
  const pastel = await getPastelbyID(id);
  const editForm = `
    <div class="row gap-3">
      <imput type="text" id="name" value="${pastel.name}">
      <textarea id="description">${pastel.description}</textarea>
      <input type="number" id="price" value=${pastel.price}">
      <button class="btn btn-success" onclick="saveEdit(${id})">Guardar</button>
    </div>  
    `;
  document.getElementById("pastel-list").innerHTML = editForm;
};

//Guardar la informacion actualizada
window.saveEdit = async (id) => {
  const pastelUpdate = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: parseFloat(document.getElementById("price").value),

  };
  await updatePastel(id, pastelUpdate);
  location.reload(); // Recarga la pagina para ver los cambios
};

//Borrar el producto seleccionado
window.deletePastel = async (id) => {
    await deletePastel(id);
    location.reload(); //Recarga la pagina para ver los cambios
};