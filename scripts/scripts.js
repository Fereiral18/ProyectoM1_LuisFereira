const paletteContainer = document.getElementById("palette-container");
const generateBtn = document.getElementById("generate-btn");
const sizeSelect = document.getElementById("palette-size");
const toast = document.getElementById("toast");
const typeColor = document.getElementById("typeColor-btn");
// Función para generar color aleatorio HEX

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
  hex = hex.replace(/^#/, '');

  // Manejar formatos de 3 dígitos (ej: "03F") convirtiéndolos a 6 ("0033FF")
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }

  // Convertir los pares a decimal
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return {r, g, b}
}

// Funcion para realizar la transformacion de RGB a HSL
function rgbToHsl(hsl= hexToRgb()) {
  // 1. Normalizar valores RGB (0-255 a 0-1)
 let r = hsl.r
 r /= 255
 let g = hsl.g
 g /= 255
 let b = hsl.b 
 b /= 255
 console.log(r,g,b)
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  // 2. Calcular Saturación y Matiz
  if (max === min) {
    h = s = 0; // Acromático
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  // 3. Escalar valores (h*360, s*100%, l*100%)
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}


// Render dinámico de la paleta

let colorsList = []
function createPalette() {
  paletteContainer.innerHTML = "";
  const size = parseInt(sizeSelect.value);
  colorsList = []
  for (let i = 0; i < size; i++) {
    
       const hex = generateRandomHex();
       const hsl = rgbToHsl()
       const card = document.createElement('div');
       colorsList.push({hex, hsl})
        card.className = 'color-card';
        
        card.innerHTML = `
        <div class="color-box" style="background-color: ${typeColor.value === "hex" ? hex : `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}" title="Click para copiar"></div>
        <p><strong class="color-value">${typeColor.value === "hex" ? hex :`${hsl.h}, ${hsl.s}%, ${hsl.l}%`}</strong></p>
        `;
        
        // Evento para copiar al portapapeles y mostrar feedback 
        card.querySelector('.color-box').addEventListener('click', function() {
            const colorToCopy = typeColor.value === 'hex' ? 
                hex : 
                `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
            navigator.clipboard.writeText(colorToCopy);
            showToast();
        });
       
        paletteContainer.appendChild(card);
      }
   
      console.log("lista de colores:", colorsList)
    }
    
function showToast() {
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 2000);
}

// Función para actualizar la visualización de los colores
function updateColorDisplay() {
    const cards = document.querySelectorAll('.color-card');
    
    cards.forEach((card, index) => {
        const colorBox = card.querySelector('.color-box');
        const colorValueElement = card.querySelector('.color-value');
        const color = colorsList[index];
        
        if (typeColor.value === 'hex') {
            colorValueElement.textContent = color.hex;
            // El color de fondo no cambia, solo el texto
        } else {
            colorValueElement.textContent = `${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%`;
            // El color de fondo no cambia, solo el texto
        }
    });
}
typeColor.addEventListener('change', updateColorDisplay);
console.log(updateColorDisplay())
""
// Event Listeners
generateBtn.addEventListener("click", createPalette);

// Inicializar paleta al cargar
createPalette();
