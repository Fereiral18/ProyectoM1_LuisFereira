const paletteContainer = document.getElementById('palette-container');
const generateBtn = document.getElementById('generate-btn');
const sizeSelect = document.getElementById('palette-size');
const toast = document.getElementById('toast');
const typeColor = document.getElementById('typeColor-btn')
// Función para generar color aleatorio HEX 
function generateRandomHex() {
const chars = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += chars[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Render dinámico de la paleta 
function createPalette() {
    paletteContainer.innerHTML = '';
    const size = parseInt(sizeSelect.value);
    let typeColors = "Hex"
    console.log(typeColor.value)

    for (let i = 0; i < size; i++) {
        const hex = generateRandomHex();
        const card = document.createElement('div');
        card.className = 'color-card';
        console.log(hex)
        card.innerHTML = `
            <div class="color-box" style="background-color: ${hex}" title="Click para copiar"></div>
            <p><strong>${hex}</strong></p>
        `;

        // Evento para copiar al portapapeles y mostrar feedback 
        card.querySelector('.color-box').addEventListener('click', () => {
            navigator.clipboard.writeText(hex);
            showToast();
        });
       
        paletteContainer.appendChild(card);
    }
}

function showToast() {
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2000);
}

// Event Listeners 
generateBtn.addEventListener('click', createPalette);

// Inicializar paleta al cargar
createPalette();