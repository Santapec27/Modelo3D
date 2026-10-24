var escena, renderer, controls;// Crear variable de renderización
renderer = new THREE.WebGLRenderer({ antialias: true });
var width = window.innerWidth;
var height = window.innerHeight;
renderer.setSize(width, height);

// Agregar al HTML
document.body.appendChild(renderer.domElement);

// Creación de la escena
escena = new THREE.Scene();
const ejes = new THREE.AxesHelper(2000); // Longitud de los ejes
escena.add(ejes);

// Cargar textura y asignar como fondo del espacio a la escena
var loaderFondo = new THREE.TextureLoader();
var bgTexture = loaderFondo.load('fondo espacio.jpg');
escena.background = bgTexture;

// Creo la cámara y la posiciono
var camara = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
camara.position.y = 16;
camara.position.z = 100;

// Materiales para Halos
var texturaHalo = new THREE.TextureLoader().load('halo.png');
var matHalo = new THREE.SpriteMaterial({ map: texturaHalo, color: 0xffffff, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false });
var texturaHaloW = new THREE.TextureLoader().load('halo_w.png');
var matHaloW = new THREE.SpriteMaterial({ map: texturaHaloW, color: 0xffffff, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false });

function agregarHalo(mesh, material, escala) {
    var sprite = new THREE.Sprite(material);
    sprite.scale.set(escala, escala, 1);
    mesh.add(sprite);
}

// Crear el objeto (Tierra)
var geometria = new THREE.SphereGeometry(0.6378, 32, 24);
var bgttextura = new THREE.TextureLoader().load('tierra.jpg');
var textura = new THREE.MeshBasicMaterial({ map: bgttextura });
var bola = new THREE.Mesh(geometria, textura);
agregarHalo(bola, matHalo, 0.6378 * 3.5);

// Crear Luna con textura de Mercurio (orbita la Tierra)
var geoLuna = new THREE.SphereGeometry(0.15, 32, 24);
var texLuna = new THREE.TextureLoader().load('mercurio.jpg');
var matLuna = new THREE.MeshBasicMaterial({ map: texLuna });
var luna = new THREE.Mesh(geoLuna, matLuna);
escena.add(luna);
agregarHalo(luna, matHalo, 0.15 * 3.5);

// Satélite (Telescopio) que orbita la Tierra
var satelite1 = new THREE.Group();
var loaderSatelite1 = new THREE.GLTFLoader();
loaderSatelite1.load('satelite.glb', function (gltf) {
    gltf.scene.scale.set(0.002, 0.002, 0.002); // Escala pequeña para orbitar la Tierra
    satelite1.add(gltf.scene);
});
escena.add(satelite1);

// Crear el Sol
var geometriasol = new THREE.SphereGeometry(6.957, 32, 24);
var bgtextura = new THREE.TextureLoader().load('images.jpg');
var textura2 = new THREE.MeshBasicMaterial({ map: bgtextura });
var sol = new THREE.Mesh(geometriasol, textura2);
agregarHalo(sol, matHaloW, 11.957 * 3.5);

// Crear Mercurio
var geometriaMercurio = new THREE.SphereGeometry(0.24, 32, 24);
var texturaMercurio = new THREE.TextureLoader().load('mercurio.jpg');
var materialMercurio = new THREE.MeshBasicMaterial({ map: texturaMercurio });
var mercurio = new THREE.Mesh(geometriaMercurio, materialMercurio);
agregarHalo(mercurio, matHalo, 0.24 * 3.5);

// Crear Venus
var geometriaVenus = new THREE.SphereGeometry(0.60, 32, 24);
var texturaVenus = new THREE.TextureLoader().load('venus.jpg');
var materialVenus = new THREE.MeshBasicMaterial({ map: texturaVenus });
var venus = new THREE.Mesh(geometriaVenus, materialVenus);
agregarHalo(venus, matHalo, 0.60 * 3.5);

// Crear Marte
var geometriaMarte = new THREE.SphereGeometry(0.33, 32, 24);
var texturaMarte = new THREE.TextureLoader().load('martes.jpg');
var materialMarte = new THREE.MeshBasicMaterial({ map: texturaMarte });
var marte = new THREE.Mesh(geometriaMarte, materialMarte);
agregarHalo(marte, matHalo, 0.33 * 3.5);

// Crear Júpiter
var geometriaJupiter = new THREE.SphereGeometry(3.5, 32, 24);
var texturaJupiter = new THREE.TextureLoader().load('jupiter.jpg');
var materialJupiter = new THREE.MeshBasicMaterial({ map: texturaJupiter });
var jupiter = new THREE.Mesh(geometriaJupiter, materialJupiter);
agregarHalo(jupiter, matHalo, 3.5 * 3.5);

// Crear Saturno
var geometriaSaturno = new THREE.SphereGeometry(3.0, 32, 24);
var texturaSaturno = new THREE.TextureLoader().load('saturno.jpg');
var materialSaturno = new THREE.MeshBasicMaterial({ map: texturaSaturno });
var saturno = new THREE.Mesh(geometriaSaturno, materialSaturno);
agregarHalo(saturno, matHalo, 3.0 * 3.5);

// Crear Anillo de Saturno
var geometriaAnillo = new THREE.TorusGeometry(4.5, 0.5, 16, 100);
var texturaAnillo = new THREE.TextureLoader().load('anillo_saturno.jpg');
var materialAnillo = new THREE.MeshBasicMaterial({ map: texturaAnillo });
var anillo = new THREE.Mesh(geometriaAnillo, materialAnillo);
anillo.rotation.x = Math.PI / 2; // Acostar el anillo para que sea horizontal

// Agrupar Saturno y su anillo
var saturnoGroup = new THREE.Group();
saturnoGroup.add(saturno);
saturnoGroup.add(anillo);
// Sin inclinación general de Saturno para que se vea recto
saturnoGroup.rotation.z = 26.73 * (Math.PI / 180);

// Crear Telescopio / Satélite (Cargando modelo GLB)
var telescopioGroup = new THREE.Group();
var loader = new THREE.GLTFLoader();
loader.load('satelite.glb', function (gltf) {
    gltf.scene.scale.set(0.05, 0.05, 0.05); // Tamaño mucho más reducido
    telescopioGroup.add(gltf.scene);
});

// Crear Asteroide
var geoAsteroide = new THREE.DodecahedronGeometry(2.0, 0); // 0 de detalle para que sea más poligonal/brusco
var matAsteroide = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('satelite2.jpg') });
var asteroide = new THREE.Mesh(geoAsteroide, matAsteroide);
asteroide.scale.set(1.5, 0.8, 1.2); // Escalarlo de forma desigual para hacerlo irregular

sol.position.set(0, 0, 0);

// Añadir objetos a la escena
escena.add(bola);
escena.add(sol);
escena.add(mercurio);
escena.add(venus);
escena.add(marte);
escena.add(jupiter);
escena.add(saturnoGroup);
escena.add(telescopioGroup);
escena.add(asteroide);

// Fuente de luz
var luz = new THREE.PointLight(0xFFFFFF);
luz.position.set(80, 150, 60);

// Luces para iluminar adecuadamente los modelos 3D (como RobotExpressive)
var luzAmbiente = new THREE.AmbientLight(0xffffff, 0.7);
var luzDireccional = new THREE.DirectionalLight(0xffffff, 0.8);
luzDireccional.position.set(20, 50, 50);

// Agregar a la escena la luz
escena.add(luz);
escena.add(luzAmbiente);
escena.add(luzDireccional);

// Variables para la animación del modelo RobotExpressive
var mixer; // Instancia de THREE.AnimationMixer
var clip;  // Instancia de THREE.AnimationClip
var robot;
var vectoranimacion = []; // Vector con los AnimationClip
var acciones = [];        // Vector con las acciones (AnimationAction)
var accion = acciones;    // Alias para manipular con accion[n] o acciones[n]
var caminando = false;    // Variable caminando inicializada en false
var caminar;              // Variable para la animación de caminar (Walking)

// Función para extraer las animaciones del robot
function extraerAnimaciones(gltf) {
    mixer = new THREE.AnimationMixer(robot);
    vectoranimacion = gltf.animations || [];

    // Bucle para sacar cada animación y guardarla en clip y acciones[j]
    for (var j = 0; j < vectoranimacion.length; j++) {
        clip = vectoranimacion[j];
        acciones[j] = mixer.clipAction(clip);
        if (vectoranimacion[j].name === 'Walking') {
            caminar = acciones[j];
        }
    }

    // Si no se asignó por nombre, accion[10] corresponde a Walking en RobotExpressive
    if (!caminar && acciones[10]) {
        caminar = acciones[10];
    }

    console.log("Animaciones extraídas del robot:");
    for (var i = 0; i < vectoranimacion.length; i++) {
        console.log(`accion[${i}] -> ${vectoranimacion[i].name}`);
    }
}

// Cargar el modelo RobotExpressive e integrar sus animaciones
var loaderRobot = new THREE.GLTFLoader();
loaderRobot.load('RobotExpressive.glb', function (gltf) {
    robot = gltf.scene;
    robot.scale.set(1.5, 1.5, 1.5); // Escala más visible (antes 0.5)
    robot.position.set(18, 0, 25);  // Posicionado al lado del Sol
    escena.add(robot);

    // Extraer animaciones y guardarlas en acciones[] / accion[]
    extraerAnimaciones(gltf);

    // Reproducir una animación inicial de pie ('Idle' en vez de 'Death')
    var idxIdle = vectoranimacion.findIndex(function (c) { return c.name === 'Idle'; });
    var animInicial = (idxIdle !== -1) ? acciones[idxIdle] : acciones[0];
    if (animInicial) {
        animInicial.play();
    }
}, undefined, function (error) {
    console.error('Error al cargar RobotExpressive.glb:', error);
});

// Función centralizada para caminar y girar con el robot
function accionarCaminarYGirar(angulo) {
    if (!robot || !mixer || acciones.length === 0) {
        console.warn("El robot aún no está cargado.");
        return;
    }
    caminando = true;
    var animCaminar = caminar || accion[10];
    if (animCaminar) {
        if (!animCaminar.isRunning()) {
            mixer.stopAllAction();
            animCaminar.reset().play();
        }
    }
    girar(robot, angulo);
}

// Evento keydown para cambiar de acción dependiendo de la tecla presionada
window.addEventListener('keydown', function (event) {
    var tecla = event.key ? event.key.toLowerCase() : '';
    if (tecla === 'a' || event.code === 'KeyA' || event.keyCode === 65) {
        accionarCaminarYGirar(5);
        console.log("Tecla 'a': Caminando y girando +5 grados el robot");
    } else if (tecla === 'd' || event.code === 'KeyD' || event.keyCode === 68) {
        accionarCaminarYGirar(-5);
        console.log("Tecla 'd': Caminando y girando -5 grados el robot");
    } else if (tecla === 'w' || event.code === 'KeyW' || event.keyCode === 87) {
        caminando = true;
        var animCaminar = caminar || accion[10];
        if (animCaminar) {
            if (!animCaminar.isRunning()) {
                mixer.stopAllAction();
                animCaminar.reset().play();
            }
        }
        desplazarse(robot);
        console.log("Tecla 'w': Caminando y desplazando el robot");
    } else if (event.code === 'Space' || tecla === ' ' || tecla === 'f') {
        disparar();
        console.log("Disparo: bala creada y añadida");
    }
});

controls = new THREE.OrbitControls(camara, renderer.domElement);

// Variables para la traslación (órbita)
let anguloTierra = 0;
let anguloLuna = 0;
let anguloOtroSat = 0;
let anguloMercurio = 0;
let anguloVenus = 0;
let anguloMarte = 0;
let anguloJupiter = 0;
let anguloSaturno = 0;
let anguloTelescopio = 0;
let tAsteroide = -200; // Variable para trayectoria parabólica
let factorCrecimientoSol = 0.0005;
let escalaMaximaSol = 7.5;
let escalaMinimaSol = 0.8;

// Distancias proporcionales al centro (Sol)
let radioTierra = 30;
let radioLuna = 1.5;
let radioOtroSat = 2.2;
let radioMercurio = 12;
let radioVenus = 22;
let radioMarte = 45;
let radioJupiter = 65;
let radioSaturno = 85;
let radioTelescopio = 100;

// Reloj para acceder al tiempo de la máquina
var clock = new THREE.Clock(); // Instancia de THREE.Clock para acceder al tiempo de la máquina
var reloj = clock; // Compatibilidad con referencias previas

// Función render con la variable mixer que se actualiza en función del tiempo de la máquina (clock)
function render() {
    requestAnimationFrame(render);

    // Acceder al tiempo transcurrido de la máquina con el clock
    var delta = clock.getDelta();

    // Actualizar mixer en función del tiempo de la máquina
    if (mixer) {
        mixer.update(delta);
    }

    // Actualizar traslación y rotación de los objetos de la escena
    proyectar(delta);

    // Renderizar escena y cámara
    renderer.render(escena, camara);
}

// ==========================================
// Configuración y función girar (rotación sobre eje Y mundial)
// ==========================================

// Objeto 'three' y métodos en minúsculas para compatibilidad total
var three = {
    ...THREE,
    mathutils: {
        ...THREE.MathUtils,
        degtorad: THREE.MathUtils.degToRad
    },
    vector3: THREE.Vector3
};
if (typeof window !== 'undefined') {
    window.three = three;
}

// Soporte para rotateonworldaxis y rotateOnworldaxis en prototipo Object3D
if (THREE.Object3D) {
    if (!THREE.Object3D.prototype.rotateonworldaxis) {
        THREE.Object3D.prototype.rotateonworldaxis = THREE.Object3D.prototype.rotateOnWorldAxis;
    }
    if (!THREE.Object3D.prototype.rotateOnworldaxis) {
        THREE.Object3D.prototype.rotateOnworldaxis = THREE.Object3D.prototype.rotateOnWorldAxis;
    }
}

// Función girar solicitada
function girar(objeto, angulo) {
    if (!objeto) return;
    const alfa = three.mathutils.degtorad(angulo);
    const axis = new three.vector3(0, 1, 0);
    objeto.rotateOnworldaxis(axis, alfa);
}
if (typeof window !== 'undefined') {
    window.girar = girar;
}

// Soporte para multiplayScalar en THREE.Vector3 por compatibilidad
if (THREE.Vector3 && !THREE.Vector3.prototype.multiplayScalar) {
    THREE.Vector3.prototype.multiplayScalar = THREE.Vector3.prototype.multiplyScalar;
}

// Función desplazarse solicitada
function desplazarse(objeto) {
    if (!objeto) objeto = robot;
    if (!objeto) return;
    const direccion = new THREE.Vector3();
    objeto.getWorldDirection(direccion);
    direccion.normalize();
    const direction = direccion;
    const posicionAnterion = direccion.clone();
    objeto.position.add(direction.multiplayScalar(2));
}
if (typeof window !== 'undefined') {
    window.desplazarse = desplazarse;
}

// Variables para el sistema de disparos
let balas = [];
const velocidadBala = 5;
let disparo = false;

// Configuración de audio para el disparo usando audioespaciaal.mp3
const listener = new THREE.AudioListener();
camara.add(listener);
const sonidoDisparo = new THREE.Audio(listener);
if (typeof window !== 'undefined') {
    window.sonidoDisparo = sonidoDisparo;
}
const audioLoader = new THREE.AudioLoader();
audioLoader.load('audioespaciaal.mp3', function (buffer) {
    sonidoDisparo.setBuffer(buffer);
    sonidoDisparo.setVolume(0.7);
}, undefined, function (err) {
    console.warn("Aviso al cargar audioespaciaal.mp3 con AudioLoader:", err);
});

// Función disparar solicitada
function disparar() {
    if (!robot) return;
    disparo = true;

    // Reproducir el sonido del disparo espacial
    if (sonidoDisparo && sonidoDisparo.buffer) {
        if (sonidoDisparo.isPlaying) {
            sonidoDisparo.stop();
        }
        sonidoDisparo.play();
    } else {
        // Reproducción de respaldo con HTML5 Audio
        const audioFallback = new Audio('audioespaciaal.mp3');
        audioFallback.volume = 0.7;
        audioFallback.play().catch(function () {});
    }

    const geoBala = new THREE.SphereGeometry(1.5, 16, 16); // Tamaño reducido (antes 5)
    const matBala = new THREE.MeshStandardMaterial({
        color: 0x0000ff,
        emissive: 0x0000ff
    });
    const bala = new THREE.Mesh(geoBala, matBala);

    // Definir la posición de la bala la misma del robot
    bala.position.copy(robot.position);

    // Dirección hacia donde está el robot (la misma de desplazarse)
    const direccion = new THREE.Vector3();
    robot.getWorldDirection(direccion);
    direccion.normalize();
    bala.userData.direccion = direccion.clone();
    bala.direccion = direccion.clone();

    // Agregar la bala a la escena y guardarla en el vector de balas
    escena.add(bala);
    balas.push(bala);
    return bala;
}
if (typeof window !== 'undefined') {
    window.balas = balas;
    window.disparar = disparar;
}

// Función moverBala solicitada
function moverBala(param) {
    if (param && param.position) {
        const dir = param.userData.direccion || param.direccion;
        if (dir) {
            param.position.addScaledVector(dir, velocidadBala);
        }
        return;
    }
    let factor = (typeof param === 'number') ? param : 1;
    for (let i = balas.length - 1; i >= 0; i--) {
        const b = balas[i];
        const dir = b.userData.direccion || b.direccion;
        if (dir) {
            b.position.addScaledVector(dir, velocidadBala * factor);
        }
        // Eliminar bala si se aleja demasiado de la escena
        if (b.position.length() > 1500) {
            escena.remove(b);
            balas.splice(i, 1);
        }
    }
}
if (typeof window !== 'undefined') {
    window.moverBala = moverBala;
}

function proyectar(dt) {
    let delta = (dt !== undefined) ? dt : clock.getDelta();
    let factorVelocidad = delta * 60;

    // Traslación (velocidad de giro alrededor del sol)
    anguloTierra += 0.01 * factorVelocidad;
    anguloLuna += 0.05 * factorVelocidad;
    anguloOtroSat += 0.07 * factorVelocidad;
    anguloMercurio += 0.0415 * factorVelocidad;
    anguloVenus += 0.0162 * factorVelocidad;
    anguloMarte += 0.0053 * factorVelocidad;
    anguloJupiter += 0.002 * factorVelocidad; // Júpiter va mas lentp
    anguloSaturno += 0.001 * factorVelocidad;
    anguloTelescopio += 0.003 * factorVelocidad;
    tAsteroide += 0.3 * factorVelocidad;
    if (tAsteroide > 200) {
        tAsteroide = -200; // Reinicia su posición para que vuelva a pasar
    }

    // Aumentar o reducir el tamaño del sol progresivamente en ciclo
    if (sol.scale.x >= escalaMaximaSol) {
        factorCrecimientoSol = -0.0005;
    } else if (sol.scale.x <= escalaMinimaSol) {
        factorCrecimientoSol = 0.0005;
    }

    let crecimiento = factorCrecimientoSol * factorVelocidad;
    sol.scale.set(
        sol.scale.x + crecimiento,
        sol.scale.y + crecimiento,
        sol.scale.z + crecimiento
    );

    // Calcular nuevas posiciones en X y Z
    bola.position.x = Math.cos(anguloTierra) * radioTierra;
    bola.position.z = Math.sin(anguloTierra) * radioTierra;

    // Lunas alrededor de la Tierra
    luna.position.x = bola.position.x + Math.cos(anguloLuna) * radioLuna;
    luna.position.z = bola.position.z + Math.sin(anguloLuna) * radioLuna;

    satelite1.position.x = bola.position.x + Math.cos(anguloOtroSat) * radioOtroSat;
    satelite1.position.z = bola.position.z + Math.sin(anguloOtroSat) * radioOtroSat;
    satelite1.position.y = Math.sin(anguloOtroSat) * 0.5; // Ligera inclinación

    mercurio.position.x = Math.cos(anguloMercurio) * radioMercurio;
    mercurio.position.z = Math.sin(anguloMercurio) * radioMercurio;

    venus.position.x = Math.cos(anguloVenus) * radioVenus;
    venus.position.z = Math.sin(anguloVenus) * radioVenus;

    marte.position.x = Math.cos(anguloMarte) * radioMarte;
    marte.position.z = Math.sin(anguloMarte) * radioMarte;

    jupiter.position.x = Math.cos(anguloJupiter) * radioJupiter;
    jupiter.position.z = Math.sin(anguloJupiter) * radioJupiter;

    saturnoGroup.position.x = Math.cos(anguloSaturno) * radioSaturno;
    saturnoGroup.position.z = Math.sin(anguloSaturno) * radioSaturno;

    telescopioGroup.position.x = Math.cos(anguloTelescopio) * radioTelescopio;
    telescopioGroup.position.z = Math.sin(anguloTelescopio) * radioTelescopio;
    telescopioGroup.position.y = 15; // Diferente altura (arriba del plano)

    // Movimiento parabólico para el asteroide (acercándose y alejándose del Sol)
    asteroide.position.x = tAsteroide;
    asteroide.position.z = (tAsteroide * tAsteroide) * 0.005 - 20; // Trayectoria parabólica
    asteroide.position.y = -10 + (tAsteroide * 0.05); // Ligeramente inclinado en Y

    // Rotación sobre su propio eje (Y) usando la función girar()
    girar(bola, 1.146 * factorVelocidad); // Rotación de la Tierra (~0.02 rad)
    girar(luna, 0.573 * factorVelocidad);
    girar(satelite1, 1.719 * factorVelocidad);
    satelite1.rotation.x += 0.02 * factorVelocidad;
    girar(mercurio, 0.573 * factorVelocidad); // Rotación de Mercurio
    girar(venus, -0.286 * factorVelocidad); // Rotación de Venus (sentido contrario)
    girar(marte, 1.089 * factorVelocidad); // Rotación de Marte
    girar(jupiter, 2.865 * factorVelocidad); // Júpiter gira muy rápido sobre su eje
    girar(saturnoGroup, 2.578 * factorVelocidad); // Rotación general del grupo de Saturno
    girar(sol, 0.115 * factorVelocidad); // Rotación del Sol

    telescopioGroup.rotation.x += 0.01 * factorVelocidad;
    telescopioGroup.rotation.y += 0.01 * factorVelocidad;

    asteroide.rotation.x += 0.02 * factorVelocidad; // El asteroide rota caóticamente
    asteroide.rotation.y += 0.03 * factorVelocidad;

    // Mover las balas usando la función moverBala
    moverBala(factorVelocidad);
}

// Iniciar el ciclo de renderizado
render();