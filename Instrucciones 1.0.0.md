# ITA

Instrucciones de ITA v1.0.0  
16/4/20

#### Overview

Este documento tiene una descripcion del proyecto ITA, parte de PAPITACORP. Las instrucciones son un documento vivo que debe ser modificado en la medida que el proyecto continue.

###### Equipo de desarrollo

Valeriano Arnaiz   
Juan Carlos Caro   
Jose Labrin   
Samuel Vargas      
Alberto Vargas Marte  

###### Que es ITA?

- Proposito: En cada familia hay gente que necesita apoyo y gente que provee apoyo. ITA entrega compañia y sugerencias a quienes proveen apoyo dentro del hogar. ITA es una herramienta digital de salud (digital health) para promover la auto-eficacia de los cuidadores en el hacia el aprendizaje de hábitos saludables. ITA está inicialmente enfocada en todo tipo de cuidadores dentro del hogar, pero inicialmente entregando soluciones para ninos entre 3 y 10 años de edad. Futuras expansiones de ITA esperan cubrir los primeros años de vida (0-2), así como el cuidado de individuos con necesidades especiales, independiente de la edad.

- PAPITA.ORG ITA vive en PAPITA.ORG. En rigor, PAPITA.ORG es el espacio virtual donde existe ITA, COMUNITA y otras futuras herramientas virtuales dirigidas a promover salud mental y hábitos saludables. la Corporación Papita es responsable del contenido en PAPITA.ORG (excepto por contenido redirigido de otras fuentes).

- Corporación Papita:
  Corporación Papita, o PAPITACORP, es una entidad sin fines de lucro, creada por un grupo de distintos actores de la sociedad civil, con el objetivo de promover la salud mental, el auto-cuidado y los hábitos saludables en el contexto familiar.

- COMUNITA, la comunidad de PAPITA.ORG:
  COMUNITA es una comunidad virtual organizada a través de canales moderados, con el fin de proveer información e interacción entre usuarios, con el fin de facilitar el acceso a recursos relativos a distintas necesidades de los cuidadores en el hogar.

###### ITA features

En la primera version de compilacion, se espera que ITA tenga las siguientes caracteristicas: 

- Login con correo y contrasena (tambien se puede conectar con facebook o google).
- Overview de la aplicación y cuestionario base para usuarios nuevos.
- Sugerencias personalizadas de actividades en tres áreas: ejercicio, alimentación y bienestar (i.e. desarrollo socioemocional).
- Mini-encuesta de satisfacción al final de cada actividad.
- Mensajes de promoción de salud, autocuidado y motivacion de forma aleatorizada.
- Para usuarios existentes, un dashboard con acceso a métrica de auto-eficacia (i.e. “energía”) y otros elementos visuales de progreso asociados al uso de la aplicación (i.e. “flores”).
- Presencia en redes sociales (Facebook, Instagram) con mensajes de promoción de salud.

###### ITA views

Para Front-end estamos usando Bootstrap (CSS) y Pug (compressed HTML). Abajo hay una descripcion de cada view (.pug) en la pagina.

- index: Login, acceso para usuarios nuevos y team info.
- layout: configuracion general. 
- start: Entrada pasa usuarios antiguos 9con cookies). Permite elegir el tipo de actividad y acceder a los stats (metrics). Te muestra en pantalla tu nivel de energia anterior (0-100).
- sobre: Explicacion de ITA, la ciencia, etc. Lleva a un registro (con EULA) y luego a encuesta inicial para usuarios nuevos. solo se ejecuta una vez. una vez terminado te manda a start.   
- loading: muestra un loading falso para entregar mensajes de salud.
- selector: muestra la actividad sugerida y tiene una opcion para buscar otra actividad (Skip).
- end: mini-encuesta al final de cada actividad. al terminar te devuelve a start.
- metrics: view que te muestra el nivel de energia, el tiempo y el tipo de actividad para el historial del usuario.
- team: credits

###### Branches

- Local
- Staging (compilacion)
- Production (models, controllers, etc)
- Bugs/Patches/Fixes (temp-page)

###### Lenguage backend

Tener instalado Node.JS y hacer npm install

Ingresar credenciales enviadas por correo a ./config/keys.js


#### Backend

###### Controllers

Estos consisten en objetos con funciones que interactuan con la base de datos a traves de _routes_ de nuestro propio API (ver Routers). Relativo a la base de nuestro proyecto, los controllers se ven asi:

```bash
./controllers/
├── actividades.js
├── hijos.js
├── historial.js
├── index.js
├── mensajes.js
├── usuarios.js
└── viewsControllers
    ├── index.js
    └── viewsControllers.js
```

Si se fijan, hay un archivo por cada tabla de nuestra base de datos. En cada uno de estos archivos se exportaran funciones de la biblioteca **[mongoose]**(https://mongoosejs.com/docs/queries.html). Necesitamos estas funciones especificas para cada uno de los archivos:

- Model.find()
- Model.findById()
- Model.deleteOne()
- Model.deleteMany()
- Model.updateOne()
- Model.create()

En el index.js, se exportaran todos los archivos en `./controllers` (vease `./viewsControllers/index.js` para un ejemplo practico).

#### Routes

Routes se ve asi:

```bash
`~./routes/api/`
├── actividades.js
├── hijos.js
├── historial.js
├── index.js
├── mensajes.js
└── usuarios.js
```

En este caso se enlazaran las funciones exportadas desde `~./controllers/index.js` con rutas usando el paquete de npm `express`.

En `~./routes/views.js` hay un ejemplo practico de como se efectua esto con funciones ubicadas en `~./controllers/viewsControllers/viewsControllers.js`. La idea es liar los controllers de nuestra base de datos a sus acciones 'GET', 'POST', 'PUT', 'DELETE' respectivas. Idealmente, queremos rutas a nuestro api en los formatos `/api/:tabla` y `/api/:tabla/:id` en donde `:tabla` corresponde cualquier tabla de nuestra base de datos (usuarios, actividades, etc.), mientras que `:id` se refiere a un parametro que representaria el codigo de identificacion de una observacion en cualquiera de estas tablas. Por ejemplo, para hacer llamados para un usuario con ID `123493` el llamado fuese a `/api/usuarios/123493`. Hay unos ejemplos buenos que explican como hacer rutas con express [aqui](https://expressjs.com/en/guide/routing.html). [Este video](https://www.youtube.com/watch?v=cVYQEvP-_PA&t=47s) tambien puede ayudar.


#### Frontend

Descrito abajo se indican los elementos de cada view o .pug (views/) y como se conectan las acciones con la base de datos en .js (public/js). Elementos en CSS van en public/css. Hay algunos .pug que se van a mover a ser parte del .js correspondiente (por mientras el codigo les puede servir para entender el elemento).

###### Layout

- Define las caracteristicas del header agrega una linea horizontal arriba y abajo usando CSS. 

###### Index

- Form con ingreso a la cuenta para usuarios antiguos (en caso de no tener cookies). Al ingresar se dirige a start.pug (una vez pasado por el validador).    
- Boton hacia sobre view antes de ir al registro para usuarios nuevos.   
- Boton hacia team view.   

###### Start

- Dashboard que tiene 4 botones permite acceso a elegir una actividad (por Topico, pasando por el loading view) o ver la metrica del usuario (metrics view).   
- Debe mostrar ademas el nivel de energia del usuario en el ultimo login (AF1 se actualiza con AF2 del login anterior). Usuarios nuevos reemplazan AF1 con el valor promedio que se genera con las preguntas en baseline.js
- El usuario puede modificar el nivel de energia (reemplazando el AF1 que se actualiza por defecto con uno definido por el usuario).   
- hay un boton logout (en el futuro tambien crearemos un perfil de usuario, junto con la comunidad, i.e. COMUNITA).   

###### Sobre

- Descripcion breve del proyecto (y/o video) mas un boton para avanzar al registro.js (aun no hecho, solo placeholder).   
- Una vez pasando el registro.js lleva a baseline.js para la encuesta inicial. Una vez terminado baseline.js lleva hacia el start view.   

###### Loading

- Llama un mensaje aleatorio de la base y lo proyecta junto con un loading falso que tiene un timer de 5 seg. Al terminar el timer se pasa a selector view.   

###### Selector

- muestra la actividad sugerida usando el texto glosa (descriptor) en la base de actividades. Ademas tiene un boton de randomizer (skip) para generar una actividad distinta si el usuario lo desea (deberiamos incorporar esto a models para guardar informacion sobre el skip).   
- el view tiene un timer (a definir) que lleva al end view.   


###### Metrics

- muestra tres tipos de metricas: con iconos de flores indica el tipo de actividad y dificultad; con barras muestra la duracion de la actividad; con linea muestra la evolucion de la energia en el tiempo.   
- tiene un boton para volver a view.   

###### End

- muestra una breve encuesta al fin de la actividad. Al cerrar, lleva de vuelta al start view.


###### Team

- muestra informacion del equipo y tiene un boton para volver a start view.