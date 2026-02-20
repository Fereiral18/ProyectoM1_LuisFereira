const paletteContainer = document.getElementById("palette-container");
const generateBtn = document.getElementById("generate-btn");
const sizeSelect = document.getElementById("palette-size");
const mensajeError = document.getElementById("mensaje-error");
const toast = document.getElementById("toast");
const typeColor = document.getElementById("typeColor-btn");

// Función para generar color aleatorio HEX
let sizeValue = "";
function generateRandomHex() {
  const chars = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * 16)];
  }
  return color;
}

//Funcion para realizar la transformacion de HEX a RGB
function hexToRgb(hex = generateRandomHex()) {
  // Eliminar '#' si está presente
  hex = hex.replace(/^#/, "");

  // Manejar formatos de 3 dígitos (ej: "03F") convirtiéndolos a 6 ("0033FF")
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Convertir los pares a decimal
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
}

// Funcion para realizar la transformacion de RGB a HSL
function rgbToHsl(hsl = hexToRgb()) {
  // 1. Normalizar valores RGB (0-255 a 0-1)
  let r = hsl.r;
  r /= 255;
  let g = hsl.g;
  g /= 255;
  let b = hsl.b;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  // 2. Calcular Saturación y Matiz
  if (max === min) {
    h = s = 0; // Acromático
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  // 3. Escalar valores (h*360, s*100%, l*100%)
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// Render dinámico de la paleta
let currentPalette = [];
function createPalette() {
  paletteContainer.innerHTML = "";

  // Obtener el valor del select después de la inicialización
  sizeValue = sizeSelect.value;
  const types = typeColor.value;

  const size = parseInt(sizeValue);
  // Validación simple y directa (sin función externa)
  if (sizeValue == "0") {
    // Mostrar mensaje de error
    mensajeError.textContent = "Debes seleccionar una cantidad de colores";
    mensajeError.style.display = "block";
    sizeSelect.style.borderColor = "red";
    sizeSelect.style.backgroundColor = "#fff8f8";

    return; // Esto detiene la ejecución de createPalette
  } else {
    mensajeError.style.display = "none";
    sizeSelect.style.borderColor = "";
    sizeSelect.style.backgroundColor = "";
  }

  currentPalette = []; // Reiniciar la paleta
  console.log("Generando NUEVA paleta de colores...");

  // Generar 9 colores nuevos (el máximo posible)
  for (let i = 0; i < 9; i++) {
    const hex = generateRandomHex();
    const hsl = rgbToHsl();
    currentPalette.push({ hex, hsl });
  }
  renderPalette(size);
}
let allColorCards = [];
function renderPalette(size) {
  // Limpiar el contenedor
  paletteContainer.innerHTML = "";
  if (allColorCards.length === 0) {
     if (!currentPalette || currentPalette.length === 0) {
      console.error("No hay colores en currentPalette");
      return;
    }
    // Renderizar solo los primeros 'size' elementos de currentPalette
    for (let i = 0; i < size; i++) {
      const color = currentPalette[i];
      const card = document.createElement("div");
      card.className = "color-card";
      card.className = "color-card";
      card.dataset.index = i; // Guardar el índice para referencia

      // Solo mostrar las que están dentro del size inicial
      card.style.display = i < size ? "block" : "none";

      card.innerHTML = `
        <div class="color-box" style="background-color: ${typeColor.value === "hex" ? color.hex : `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`}" title="Click para copiar"></div>
        <p><strong class="color-value">${typeColor.value === "hex" ? color.hex : `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`}</strong></p>
    `;

      // Evento para copiar al portapapeles
      card.querySelector(".color-box").addEventListener("click", function () {
        const colorToCopy =
          typeColor.value === "hex"
            ? color.hex
            : `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
        navigator.clipboard.writeText(colorToCopy);
        showToast();
      });

      paletteContainer.appendChild(card);
    }
  } else {
    // Si ya existen tarjetas, solo cambiar su visibilidad según el nuevo size
    allColorCards.forEach((card, index) => {
      if (index < size) {
        card.style.display = "block"; // Mostrar
      } else {
        card.style.display = "none"; // Ocultar
      }
    });
  }
}
// Función para cambiar el tamaño desde el select
function updatePaletteSize() {
  const newSize = parseInt(sizeSelect.value);

  // Validar que no sea la opción por defecto
  if (newSize === 0) {
    mensajeError.textContent = "Debes seleccionar una cantidad de colores";
    mensajeError.style.display = "block";
    sizeSelect.style.borderColor = "red";
    sizeSelect.style.backgroundColor = "#fff8f8";
    return;
  }

  mensajeError.style.display = "none";
  sizeSelect.style.borderColor = "";
  sizeSelect.style.backgroundColor = "";

  // Si ya hay tarjetas creadas, solo cambiar su visibilidad
  if (allColorCards.length > 0) {
    allColorCards.forEach((card, index) => {
      card.style.display = index < newSize ? "block" : "none";
    });
    console.log(
      `Tamaño actualizado a ${newSize} tarjetas visibles (sin re-renderizar)`,
    );
  } else {
    // Si no hay tarjetas, llamar a renderPalette
    renderPalette(newSize);
  }
}

function showToast() {
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 2000);
}

// Función para actualizar la visualización de los colores
function updateColorDisplay() {
  const cards = document.querySelectorAll(".color-card");

  cards.forEach((card, index) => {
    const colorBox = card.querySelector(".color-box");
    const colorValueElement = card.querySelector(".color-value");
    const color = currentPalette[index];
    if (typeColor.value === "hex") {
      colorValueElement.textContent = color.hex;
      // El color de fondo no cambia, texto hexadecimal
    } else {
      colorValueElement.textContent = `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`;
      // El color de fondo no cambia, texto HSL
    }
  });
}
typeColor.addEventListener("change", updateColorDisplay);
("");
// Boton para generar la paleta de colores
generateBtn.addEventListener("click", createPalette);
sizeSelect.addEventListener("change", updatePaletteSize);
const mensajeBienvenida = document.createElement("div");
mensajeBienvenida.id = "mensaje-bienvenida";
mensajeBienvenida.textContent = "¡Bienvenido al generador de paletas Colorfly!";
document.body.appendChild(mensajeBienvenida);

// Mostrar contenido después de 2 segundos
setTimeout(() => {
  mensajeBienvenida.remove();
  document.getElementById("contenido-principal").style.display = "block";
}, 2000);
