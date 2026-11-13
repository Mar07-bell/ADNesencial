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

document.getElementById("form-combinador").addEventListener("submit", function(e) {
  e.preventDefault();

  const estilo = document.getElementById("ia-estilo").value;
  const limite = Number(document.getElementById("ia-limite").value);
  const texto = document.getElementById("ia-prendas").value;
  const prendas = texto.split(",").map(function(p) { return p.trim(); }).filter(function(p) { return p !== ""; });

  const caja = document.getElementById("resultados-ia");
  caja.innerHTML = "";

  if (prendas.length < 2) {
    caja.innerHTML = `<p class="text-red-600 text-xs font-bold">Escribe al menos 2 prendas separadas por coma.</p>`;
    return;
  }

  for (let i = 1; i <= limite; i++) {
    const p1 = prendas[(i - 1) % prendas.length];
    const p2 = prendas[i % prendas.length];
    const p3 = prendas[(i + 1) % prendas.length];

    caja.innerHTML += `
      <div class="p-3 bg-white border border-stone-200 rounded-lg">
        <p class="font-bold text-stone-800 text-xs uppercase">Outfit #${i} — ${estilo}</p>
        <p class="text-stone-700 text-sm mt-1">Combina <strong>${p1}</strong> + <strong>${p2}</strong> con <strong>${p3}</strong>.</p>
      </div>
    `;
  }
});

function responderChatIA() {
  const pregunta = document.getElementById("chat-pregunta").value.toLowerCase();
  const cajaResp = document.getElementById("chat-respuesta");
  cajaResp.classList.remove("hidden");

  if (pregunta.includes("chaqueta") || pregunta.includes("cuero")) {
    cajaResp.innerHTML = "<strong>ADNesencial IA:</strong> Una chaqueta negra combina perfecto con camiseta blanca básica y pantalón vaquero azul para un look Aesthetic Casual.";
  } else if (pregunta.includes("oficina") || pregunta.includes("elegante")) {
    cajaResp.innerHTML = "<strong>ADNesencial IA:</strong> Para Oficina Elegante te recomiendo usar prendas de tonos neutros como blazer estructurado y pantalón sastre.";
  } else if (pregunta.includes("precio") || pregunta.includes("costo")) {
    cajaResp.innerHTML = "<strong>ADNesencial IA:</strong> Nuestras prendas y conjuntos esenciales van desde $45 hasta $75 USD. Puedes verlos en el Catálogo.";
  } else {
    cajaResp.innerHTML = "<strong>ADNesencial IA:</strong> Te sugiero combinar siempre 1 prenda básica neutra (como camiseta blanca) con 1 prenda protagonista (chaqueta o blazer).";
  }
}

document.getElementById("form-contacto").addEventListener("submit", function(e) {
  e.preventDefault();

  const prendasInput = document.getElementById("c-prendas").value;
  const listaPrendas = prendasInput.split(",").map(function(p) { return p.trim(); });

  const nuevoRegistro = {
    usuario: document.getElementById("c-usuario").value,
    correo: document.getElementById("c-correo").value,
    estilo_deseado: document.getElementById("c-estilo").value,
    limite_combinaciones_diarias: Number(document.getElementById("c-limite").value),
    prendas_disponibles: listaPrendas
  };

  usuarios.push(nuevoRegistro);
  guardarDatos();

  document.getElementById("form-contacto").reset();
  document.getElementById("alerta-guardado").classList.remove("hidden");
});
