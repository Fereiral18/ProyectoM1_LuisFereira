# ProyectoM1_LuisFereira
Herramienta web simple que permite generar paletas de colores de forma rápida e intuitiva.

Instrucciones de Uso - Manual de Usuario
Esta guía te ayudará a entender cómo funciona la aplicación y cómo sacarle el máximo provecho.

## 🚀 Demo en Vivo
Puedes acceder a la versión en vivo de la aplicación a través del siguiente enlace:
https://fereiral18.github.io/ProyectoM1_LuisFereira/

Al abrir la aplicación, te encontrarás con:

1. Área de visualización: Muestra los controles para generar las paletas los cuales son:
Controles de entrada: [Selector de tamaño de paleta, Tipos de colores hexadecimal o hsl, botón "Generar paleta"].

## 🎨 Cómo Usar la App

 **Seleccionar tamaño de la paleta -> Selector de tamaño de la paleta: La cual cuenta con 3 tipos: 6, 8, 9 tamaños, selecciona la cantidad deseada.

 **Seleccionar tipo de color -> Selector de tipo de color que deseas que se genere: Hexadecimal (Hex) o Hue, Saturation, Lightness - Tono, Saturación, Luminosidad (HSL).

 **Generar paleta de colores -> Al seleccionar el tamaño y el tipo de color, le damos click al boton de generar paleta, la cual nos desplegara una lista de colores segun la cantidad seleccionada y el tipo seleccionado. Si deseas generar otros colores, dale Click al boton de "Generar paleta" Y ¡Listo! La nueva paleta aparecerá en pantalla con la cantidad de tamaño seleccionada y sus variaciones de color con el tipo seleccionado.
    
   -> Códigos de color: Cada color se muestra con su valor hexadecimal (Ej: #FF5733) o hsl (Ej: hsl(11, 100%, 60%) ).
   
 **Intercambio de Hexadecima a Hsl -> Al generar una paleta de colores podremos intercambiar entre que tipo deseamos ver, hexadecimal o hsl de manera dinamica, de igual manera la cantidad que deseamos que nos muestre en la interfaz de usuario ya sea 6, 8 u 9.


2. Interacción con los colores

-> Copiar color: Haz clic en cualquier recuadro de color para copiar su código hexadecimal o hsl al portapapeles. Aparecerá una notificación de confirmación.

## 🛠️ Tecnologías Utilizadas

-> HTML5: Para la estructura semántica de la página.

-> CSS3 (Flexbox/Grid): Para el diseño responsivo y la disposición de los elementos en pantalla, asegurando que se vea bien en móviles y ordenadores.

-> JavaScript (Vanilla): Se optó por JavaScript puro (sin frameworks) para mantener el proyecto ligero, de rápido rendimiento y fácil de mantener. Además, facilita su despliegue en cualquier servidor estático.

4. Logica de generacion de colores.

-> Algoritmo: Al recibir un color base (en Hex o RGB), se convierte a HSL.

5. Gestión del Estado

-> El estado de la aplicación (color base, paleta actual, que modifique el estado en base al tamaño de las paletas) se maneja mediante variables globales en el script principal. La interfaz se actualiza manipulando el DOM directamente a través de eventos.

6. Estilos y UI/UX

-> Variables CSS: Se utilizaron variables CSS personalizadas para los colores de la interfaz, facilitando la creación de un tema visual coherente y la posibilidad de futuras modificaciones.

-> Responsive Design: Se emplearon media queries para ajustar el layout en dispositivos móviles, apilando los elementos verticalmente.

🛠️ Construido con:

- HTML5

- CSS3

- JavaScript(Vanilla)

## ⚙️ Instalación y Uso Local
Sigue estos pasos si deseas descargar el proyecto y ejecutarlo en tu propia computadora para desarrollo o prueba.

### 📋 Prerrequisitos

Solo necesitas un navegador web moderno (Chrome, Firefox, Edge, Safari) y un editor de código (como VS Code) si deseas modificar algo. No necesitas instalar servidores ni dependencias complejas.

### 🔧 Instalación

Abrir la terminal/consola.

Clonar el repositorio (necesitas tener Git instalado o descargar el ZIP):

- Si estas en linux recuerda abrir tu terminal:
    - Ejecutar ls -> para ver en que carpeta te posicionas.
    - Ejecuta cd Escritorio/
    - Luego: pwd y deberias ver algo asi "/home/criss/Escritorio"
    posterior a eso ejecuta:

1.  **Clona el repositorio**
    ```bash
    git clone https://github.com/Fereiral18/ProyectoM1_LuisFereira.git
    ```

- Navegar a la carpeta del proyecto con los siguientes comandos:
    
2. **Navega al directorio del proyecto**
    ```bash
    cd nombre-del-repo
    ```
    ```bash
    code .
    ```
    se abrira el proyecto en tu Visual studio code(vsc)
    Abre la carpeta del proyecto en Visual Studio Code.

    -> Instala la extensión "Live Server".

    -> Haz clic derecho sobre el archivo index.html y selecciona "Open with Live Server". Esto abrirá la aplicación en http://localhost:5500/ y se recargará automáticamente cuando guardes cambios.

7.1.1 Pasos para la instalacion sin Vsc 
Clona el repositorio con las instrucciones ya dadas y simplemente navega a la carpeta y haz doble clic en el archivo index.html. Se abrirá en tu navegador predeterminado.

Y ¡Pufff! estaras listo para usar la app de paletas de colores COLORFLY.

✒️ Autor

Luis Fereira - Desarrollo y documentación - Fereiral18