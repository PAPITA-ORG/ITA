# ITA

Instrucciones de ITA 1.0.0
16/4/20

#### Overview

Que es ITA?

    - Proposito

    - PAPITA.ORG

Features de ITA

    - 

    - 
    
    - 

Branches
    
    - Local
    
    - Staging
    
    - Production
    
    - Bugs/Patches/Fixes

Backend
    
    - Tener instalado Node.JS y hacer npm install
    
    - Ingresar credenciales enviadas por correo a ./config/keys.js



#### Controllers

Nuestro proximo objetivo general es armar la base de datos en MongoDB Atlas. Para esto necesitamos desarollar **controladores**.

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

- Model.findOne()
- Model.findById()
- Model.deleteOne()
- Model.deleteMany()
- Model.updateOne()

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

Lo que necesitamos aqui es muy parecido a con los controllers. En este caso se enlazaran las funciones exportadas desde `~./controllers/index.js` con rutas usando el paquete de npm `express`.

En `~./routes/views.js` hay un ejemplo practico de como se efectua esto con funciones ubicadas en `~./controllers/viewsControllers/viewsControllers.js`. La idea es liar los controllers de nuestra base de datos a sus acciones 'GET', 'POST', 'PUT', 'DELETE' respectivas. Idealmente, queremos rutas a nuestro api en los formatos `/api/:tabla` y `/api/:tabla/:id` en donde `:tabla` corresponde cualquier tabla de nuestra base de datos (usuarios, actividades, etc.), mientras que `:id` se refiere a un parametro que representaria el codigo de identificacion de una observacion en cualquiera de estas tablas. Por ejemplo, para hacer llamados para un usuario con ID `123493` el llamado fuese a `/api/usuarios/123493`. Hay unos ejemplos buenos que explican como hacer rutas con express [aqui](https://expressjs.com/en/guide/routing.html). [Este video](https://www.youtube.com/watch?v=cVYQEvP-_PA&t=47s) tambien puede ayudar.

Al completar estos archivos, podremos pasar a la siguiente fase de interactuar con el backend desde el frontend.
