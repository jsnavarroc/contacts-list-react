# Dependencies Developer React

## Folder Structure

After creation, your project should look like this:

```
my-app/
 app/
   src/
    js/
       app.jsx
    style/
       index.scss
 index.html
webpackage.config.js
.babelrc
.eslintignore
.eslintrc.js
.gitignore
pakage.json
README.md
```
# Comandos Iniciales
## HTML
1. En App.js
```
div.app-container>span.app-container--redux{REDUX&nbsp;}+span.app-container--world{WORLD}
```
2. Creación de las constantes de estado para el formulario, funcion reducer.
```
http://bit.ly/2ssp7TC

Esto es lo que se genera:
>>GUARDAR_NOMBRE: "ESTADO_CONTACTOS :: GUARDAR_NOMBRE"
>>LIMPIAR_FORMULARIO:"ESTADO_CONTACTOS :: LIMPIAR_FORMULARIO"
```
3. Creación de las constantes de estado para el servidor htttp.
```
http://bit.ly/2EJfYuT

Esto es lo que se genera:
>> COMPLETADO:"BORRAR_CONTACTOS :: COMPLETADO" | COMPLETADO:"OBTENER_CONTACTOS :: COMPLETADO"
>> ERROR:"BORRAR_CONTACTOS :: ERROR"           | ERROR:"OBTENER_CONTACTOS :: ERROR"
>> INICIO:"BORRAR_CONTACTOS :: INICIO"           | INICIO:"OBTENER_CONTACTOS :: INICIO"

>> COMPLETADO:"ACTUALIZAR_CONTACTOS :: COMPLETADO" | COMPLETADO:"CREAR_CONTACTOS :: COMPLETADO"
>> ERROR:"ACTUALIZAR_CONTACTOS :: ERROR"           | ERROR:"CREAR_CONTACTOS :: ERROR"
>> INICIO:"ACTUALIZAR_CONTACTOS :: INICIO"           | INICIO:"CREAR_CONTACTOS :: INICIO"

```

4. Unit Test :: Acciones, instalar estas dependencias 
```
npm i redux-thunk -S
npm i sinon redux-mock-store -D
```
