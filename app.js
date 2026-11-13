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
