<div align="center">

# 🌌 Modelo3D — Simulación Interactiva del Sistema Solar y Robot 3D

[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

</div>

Este proyecto es una escena 3D interactiva desarrollada con **Three.js** (WebGL) que combina una simulación dinámica del **Sistema Solar** con un personaje 3D animado (**RobotExpressive**) controlable mediante el teclado y con sistema de disparo y efectos de sonido.

---

## Características Principales

### 1. Sistema Solar Dinámico
- **El Sol:** Ubicado en el centro de la escena (`0, 0, 0`), con textura propia, halo luminoso (`THREE.Sprite` con `AdditiveBlending`), rotación sobre su eje y un ciclo continuo de pulsación (expansión y contracción de escala).
- **Planetas con Órbitas y Rotación Propia:**
  - **Mercurio** (`mercurio.jpg`)
  - **Venus** (`venus.jpg`) — incluye rotación retrógrada (en sentido contrario).
  - **Tierra** (`tierra.jpg`) — orbitada simultáneamente por la **Luna** y un **satélite artificial 3D** (`satelite.glb`) con inclinación orbital.
  - **Marte** (`martes.jpg`)
  - **Júpiter** (`jupiter.jpg`) — rotación rápida sobre su propio eje.
  - **Saturno** (`saturno.jpg`) — agrupado con su **anillo planetario** (`TorusGeometry` con textura `anillo_saturno.jpg`) e inclinación axial de `26.73°`.
- **Cuerpos Celestes y Satélites Adicionales:**
  - **Telescopio / Satélite Espacial (`satelite.glb`):** En órbita exterior elevada (`y = 15`).
  - **Asteroide (`DodecahedronGeometry`):** Describe una trayectoria parabólica acercándose y alejándose del Sol con rotación caótica.
- **Efectos Visuales:**
  - Halos atmosféricos y solares (`halo.png`, `halo_w.png`) aplicados mediante `THREE.SpriteMaterial`.
  - Fondo espacial inmersivo (`fondo espacio.jpg`).
  - Iluminación combinada (`PointLight`, `AmbientLight` y `DirectionalLight`) y ayuda visual de ejes (`THREE.AxesHelper`).

### 2. Personaje 3D Controlable (`RobotExpressive.glb`)
- Carga de modelo GLTF/GLB con extracción automática de clips de animación mediante `THREE.AnimationMixer` (`Idle`, `Walking`, etc.).
- Movimiento sobre el plano 3D calculando su vector de dirección frontal (`getWorldDirection`) y rotación sobre el eje mundial `Y` (`rotateOnWorldAxis`).
- **Sistema de Disparo Espacial:**
  - Emisión de proyectiles esféricos luminosos (`MeshStandardMaterial` con color emisivo azul) desde la posición y dirección actual del robot.
  - Sonido espacial sincronizado (`audioespaciaal.mp3`) implementado con `THREE.AudioListener` y `THREE.AudioLoader` (con respaldo en HTML5 `Audio`).
  - Limpieza automática de proyectiles al superar la distancia límite (`> 1500` unidades).

---

## Controles Interactivos

### Teclado (Control del Robot)
| Tecla | Acción |
| :---: | :--- |
| **`W`** | Avanzar hacia adelante activando la animación de caminar (`Walking`) |
| **`A`** | Girar a la izquierda (`+5°`) mientras camina |
| **`D`** | Girar a la derecha (`-5°`) mientras camina |
| **`Espacio`** / **`F`** | Disparar proyectil de energía con efecto de sonido espacial |

### Ratón (Cámara `OrbitControls`)
| Acción del Ratón | Función |
| :---: | :--- |
| **Clic izquierdo + arrastrar** | Rotar la cámara alrededor de la escena |
| **Rueda del ratón (Scroll)** | Acercar / Alejar el zoom |
| **Clic derecho + arrastrar** | Desplazar (paneo) el punto de vista |

---

## Estructura del Proyecto

```text
Modelo3D/
├── nbproject/                        # Configuración del proyecto en Apache NetBeans
├── .vscode/                          # Configuración de depuración para VS Code
└── public_html/                      # Directorio público de la aplicación web
    ├── index.html                    # Punto de entrada HTML
    ├── esenario.js                   # Lógica principal de la escena Three.js, órbitas, animaciones y controles
    ├── three.js / three.min.js       # Librería principal Three.js
    ├── OrbitControls.js              # Controlador de cámara orbital
    ├── GLTFLoader.js                 # Cargador de modelos 3D en formato .glb / .gltf
    ├── dat.gui.min.js                # Librería para interfaces de control
    │
    ├── 📦 Modelos 3D (.glb / .obj)
    │   ├── RobotExpressive.glb               # Robot animado controlable
    │   ├── satelite.glb                      # Modelo de satélite / telescopio orbital
    │   ├── nave_espacial.glb                 # Modelo de nave espacial
    │   ├── navecruzero.glb                   # Modelo de crucero espacial
    │   ├── naveX.glb                         # Modelo de caza espacial
    │   ├── NVEEEEE.glb                       # Variante de nave espacial
    │   ├── RenderCrate-Spaceship_2.glb       # Nave espacial detallada
    │   ├── piedrasacumuladas.glb             # Formación rocosa / asteroides
    │   ├── talking_pocoyo_animation_pack.glb # Pack de modelo con animaciones
    │   ├── Sniper_Scope.obj                  # Modelo 3D en formato OBJ
    │   └── Sting-Sword-lowpoly.obj           # Espada low-poly en formato OBJ
    │
    ├── 🎨 Texturas e Imágenes
    │   ├── fondo espacio.jpg                 # Textura de fondo estelar
    │   ├── images.jpg                        # Textura de la superficie solar
    │   ├── mercurio.jpg                      # Textura de Mercurio / Luna
    │   ├── venus.jpg                         # Textura de Venus
    │   ├── tierra.jpg                        # Textura de la Tierra
    │   ├── martes.jpg                        # Textura de Marte
    │   ├── jupiter.jpg                       # Textura de Júpiter
    │   ├── saturno.jpg                       # Textura de Saturno
    │   ├── anillo_saturno.jpg                # Textura de los anillos de Saturno
    │   ├── satelite1.jpg / satelite2.jpg     # Texturas para satélites y asteroide
    │   └── halo.png / halo_w.png             # Sprites de resplandor atmosférico y solar
    │
    └── 🔊 Audio
        └── audioespaciaal.mp3                # Efecto de sonido para los disparos
```

---

## Cómo Ejecutar el Proyecto

Debido a las políticas de seguridad de los navegadores modernos (**CORS**), los modelos 3D (`.glb`) y las texturas requieren servirse a través de un servidor HTTP local en lugar de abrir `index.html` directamente con `file://`.

### Opción 1: Con Visual Studio Code (Live Server)
1. Abre la carpeta del proyecto en **VS Code**.
2. Instala la extensión **Live Server**.
3. Haz clic derecho sobre `public_html/index.html` y selecciona **"Open with Live Server"**.

### Opción 2: Con Apache NetBeans
1. Abre el proyecto desde **NetBeans** (`File > Open Project...`).
2. Ejecuta el proyecto con el botón **Run Project (`F6`)** para lanzarlo en el servidor integrado de NetBeans.

### Opción 3: Con Python o Node.js desde la terminal
```bash
# Entra en la carpeta public_html
cd public_html

# Con Python 3:
python -m http.server 8000

# O con Node.js (npx):
npx serve .
```
Luego abre tu navegador en `http://localhost:8000`.

---

## 🛠️ Tecnologías Utilizadas
- **HTML5 & CSS3**
- **JavaScript (ES6+)**
- **[Three.js](https://threejs.org/)** (`WebGLRenderer`, `GLTFLoader`, `OrbitControls`, `AnimationMixer`, `AudioLoader`)
- **Apache NetBeans / VS Code**

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia **MIT**. Para más detalles, consulta el archivo [`LICENSE`](LICENSE).
