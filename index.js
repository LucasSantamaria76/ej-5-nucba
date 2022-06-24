let listadoPizzas;

const getData = async () => {
  try {
    const res = await fetch('./pizzas.json');
    if (res.ok) {
      const data = await res.json();
      listadoPizzas = data;
      localStorage.setItem('listadoPizzas', JSON.stringify(data));
    } else throw new Error(res);
  } catch (error) {
    let msg = error.statusText || 'Error al cargar los datos';
    Swal.fire({
      text: msg,
      confirmButtonText: 'Aceptar',
    });
  }
};

const cardImage = document.querySelector('.card-img');
const cardTitle = document.querySelector('.card-title');
const cardPrice = document.querySelector('.card-price');
const cardIngredient = document.querySelector('.text-ingredient');
const form = document.querySelector('form');
const SearchInput = document.querySelector('.search');

const parseCurrency = (value) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(value);

const renderCard = (pizza) => {
  cardImage.src = pizza.imagen;
  cardTitle.textContent = pizza.nombre;
  cardPrice.textContent = `Precio: ${parseCurrency(pizza.precio)}`;
  cardIngredient.textContent = pizza.ingredientes.join(', ');
  SearchInput.focus();
};

document.addEventListener('DOMContentLoaded', async () => {
  localStorage.getItem('listadoPizzas')
    ? (listadoPizzas = JSON.parse(localStorage.getItem('listadoPizzas')))
    : await getData();

  renderCard(listadoPizzas[0]);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const pizza = listadoPizzas.find((pizza) =>
    pizza.nombre.includes(e.target[0].value.toLocaleUpperCase())
  );
  Boolean(pizza)
    ? renderCard(pizza)
    : Swal.fire({
        text: 'Pizza no encontrada',
        confirmButtonText: 'Aceptar',
      });
});
