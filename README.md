# Laboratorio 6/WEB
![F1 svg](https://github.com/paulabaal12/lab6-web/assets/106341373/9117c4ce-6c4a-47d2-891e-58186129eb4a)

# Base de datos/Tabla creada 
<h4> id  </h4>
Es de tipo INT y se establece como clave primaria (PRIMARY KEY). También se configura para incrementarse automáticamente (AUTO_INCREMENT), lo que significa que cada nueva fila insertada en la tabla se le asignará automáticamente un ID único.
<h4> name_circuit </h4>
 Es de tipo VARCHAR(255) y se establece como NO NULO (NOT NULL), lo que significa que debe tener un valor para cada fila. Se utiliza para almacenar el nombre del circuito donde tuvo lugar una carrera.
<h4> country_circuit </h4>
Es de tipo VARCHAR(255) y se establece como NO NULO. Se utiliza para almacenar el país donde se encuentra el circuito.
<h4> name_winner </h4>
Es de tipo VARCHAR(255) y se establece como NO NULO. Se utiliza para almacenar el nombre del ganador de la carrera.
<h4> team </h4>
Es de tipo VARCHAR(255) y se establece como NO NULO. Se utiliza para almacenar el nombre del equipo al que pertenece el ganador.
<h4> date </h4>
Es de tipo DATE. Se utiliza para almacenar la fecha en que tuvo lugar la carrera.
<h4> year </h4>
Es de tipo INT. Se utiliza para almacenar el año en que tuvo lugar la carrera.
<h4> time_fastest_lap </h4>
Es de tipo VARCHAR(255). Se utiliza para almacenar el tiempo de la vuelta más rápida durante la carrera.
<h4> highlights </h4>
Es de tipo TEXT. Se utiliza para almacenar los aspectos más destacados o un resumen de la carrera.
<h4> image_base64 </h4>
Es de tipo TEXT. Se utiliza para almacenar la imagen de la carrera en formato Base64.

# Endpoints

<h3> /posts: </h3>
GET: Obtiene todos los posts almacenados en la base de datos.
POST: Crea un nuevo post y lo guarda en la base de datos.

<h3> /posts/:id: </h3>
GET: Obtiene un post específico por su ID.
PUT: Actualiza un post existente por su ID.
DELETE: Elimina un post existente por su ID.


# Puntos Elaborados
- [ ] (30 puntos) Por implementar un comando npm lint que utilice eslint para mostrar que su código no tiene errores de estilo
      Para obtener estos puntos, deben utilizar los lineamientos de airbnb para evaluar su código y además, deben crear una regla custom que prohíba los punto y coma en su código.
- [x] (15 puntos) Por implementar adecuadamente los status de error 500 cuando haya un problema contactando con la base de datos o un error de código
- [x] (5 puntos) Por implementar el mensaje de error 501 cuando se trate de utilizar un metodo no implementado de http
- [x] (15 puntos) Por implementar estados de error 400 cuando se visite un endpoint  no existente, o cuando no se manden datos con el formato incorrecto en el body de los metodos PUT y POST
- [x] (5 puntos) Por escribir a un archivo de log.txt un detalle de cada endpoint llamado, que incluya la hora a la que fue llamado, el payload con el que se llamó y la respuesta que el endpoint envió.
- [x] (20 puntos) Por utilizar swaggerLinks to an external site. para crear documentación de sus endpoints
- [ ] (10 puntos) Por soportar imágenes en formato base64 en al menos una propiedad de su blog
- [x] (10 puntos) Por implementar soporte para cors.
- [x] (20 puntos) [Criterio subjetivo] Por entregar un README bien formateado y un commit history ordenado en su repositorio de git
- [ ] (-200 puntos) Por enviar su carpeta node_modules a su repositorio de github
- [x] (30 puntos) Por hacer un docker compose que le permita levantar 2 contenedores, uno para el app y el otro para la base de datos.
- [ ] (-50 puntos) Por clonar mal su proyecto y hacer carpetas de más.
- [ ] (-30 puntos) Por usar la base de datos común que se va a instalar en el server (es decir si no levantan su base de datos propia)
- [ ] (-20 puntos) Si no utilizan Docker compose. 
