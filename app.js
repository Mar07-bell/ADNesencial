AOS.init();

let productos = JSON.parse(localStorage.getItem("adnesencial_productos")) || [
  {
    nombre: "Conjunto Aesthetic Básico",
    estilo: "Aesthetic Casual",
    precio: 45,
    descripcion: "Pantalón vaquero azul + camiseta blanca básica + zapatillas blancas.",
    imagen: "https://unsplash.com"
  },
  {
    nombre: "Chaqueta de Cuero Negra",
    estilo: "Aesthetic Casual",
    precio: 60,
    descripcion: "Pieza esencial para combinar sobre camisetas básicas o vestidos.",
    imagen: "https://unsplash.com"
  },
  {
    nombre: "Set Oficina Elegante",
    estilo: "Oficina Elegante",
    precio: 75,
    descripcion: "Blazer estructurado + pantalón de vestir + blusa neutra.",
    imagen: "https://unsplash.com"
  }
];

let usuarios = JSON.parse(localStorage.getItem("adnesencial_usuarios")) || [
  {
    usuario: "Sofía Martínez",
    correo: "sofia@correo.com",
    estilo_deseado: "Aesthetic Casual",
    limite_combinaciones_diarias: 2,
    prendas_disponibles: [
      "pantalón vaquero azul",
      "camiseta blanca básica",
      "chaqueta de cuero negra",
      "zapatillas deportivas blancas"
    ]
  }
];

function guardarDatos() {
  localStorage.setItem("adnesencial_productos", JSON.stringify(productos));
  localStorage.setItem("adnesencial_usuarios", JSON.stringify(usuarios));
}

function renderizarCatalogo(filtro) {
  const grid = document.getElementById("grid-productos");
  grid.innerHTML = "";

  for (let i = 0; i < productos.length; i++) {
    const prod = productos[i];
    if (filtro === "Todos" || prod.estilo === filtro) {
      grid.innerHTML += `
        <div class="card-producto bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden flex flex-col justify-between">
          <div>
            <img src="${prod.imagen}" alt="${prod.nombre}" class="w-full h-48 object-cover">
            <div class="p-4">
              <span class="text-xs font-bold px-2 py-1 rounded bg-stone-100 text-stone-700">${prod.estilo}</span>
              <h3 class="font-bold text-lg text-stone-800 mt-2">${prod.nombre}</h3>
              <p class="text-stone-600 text-sm mt-1">${prod.descripcion}</p>
            </div>
          </div>
          <div class="px-4 py-3 bg-stone-50 border-t flex justify-between items-center">
            <span class="font-bold text-stone-900">$${prod.precio}</span>
            <a href="#closet" onclick="seleccionarParaContacto('${prod.nombre}')" class="text-xs font-bold text-blue-700 hover:underline">
              Solicitar
            </a>
          </div>
        </div>
      `;
    }
  }
}

function filtrarCatalogo(estilo) {
  renderizarCatalogo(estilo);
}

function seleccionarParaContacto(nombrePrenda) {
  document.getElementById("c-prendas").value = "Me interesa combinar o adquirir: " + nombrePrenda;
}
