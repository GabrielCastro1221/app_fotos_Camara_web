# CAMARA DIGITAL

Se creara un contexto 2D con canvas donde se podran tomar fotos haciendo uso de la camara web del dispositivo, pero para poder tomar fotos se debe conceder permisos al sistema para activar la camara web.

## `index.html.`

El archivo _***index.html***_ contiene una etiqueta _***section***_ en la cual se hallaran 2 etiquetas _***div***_, en el primer div se aloja una etiqueta _***video***_ donde se reflejara el video de la camara web y en el segundo div se encontrara una etiqueta _***canvas***_ que contendra una etiqueta _***img***_ donde se reflejara la foto capturada por ultimo se encontrara un boton que me servira para capturar la foto.

## `script.js.`

EL archivo _***script.js***_ contiene las funciones que le daran el dinamismo a la camara, en este se mandan a llamar todos los elementos del DOM que serviran para dar dichas funcionalidades.

+ variables que controlan los elementos del DOM.

``` const video = document.querySelector(".video");
const canvas = document.querySelector(".canvas");
const button = document.querySelector(".start-btn");
const photo = document.querySelector(".photo");
```

Para dar funcionalidades a la camara web se hara uso de un metodo de JS llamado _***MediaDevices.getUserMedia()***_, este metodo atraves de _***navigator***_ que es una manera de interactuar con el DOM permite interactuar con el hardware de las computadoras que trabaja por medio de promesas y le solicitara al ordenador acceso a los dispositivos multimedia.
Para que este metodo reciba parametros se le deben pasar por medio del _***constraints***_

```
const constraints = {
  video: { width: 420, height: 340 },
  audio: false,
};
```

Como paso siguiente se solicita acceso al navegador donde vamos a recibir una respuesta en forma de promesa. Para esto se usa un try-catch que permite controlar el manejo de errores, en caso de que la promesa se cumpla, se recibira un objeto que tiene la peticion del acceso a la camara web en caso contrario se muestra un mensaje de error.

```
const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSucces(stream);
    console.log(stream);
  } catch (error) {
    console.log(error);
  }
};
```

Si la la peticion de acceso es exitosa el sistema ejecutara una funcion que por medio de un metodo llamado _***srcObject***_ almacenara el contenido de la variable stream que contiene la peticion de acceso a los dispositivos multimedia y luego al video se le asigna el metodo _***play()***_ que sirve para renderizar el video de la camara web de la computadora.

+ _***NOTA:***_ Si no se le asigna el metodo _***play()***_ al video la camara web se mostrara estatica como si fuese una foto.

```
const handleSucces = (stream) => {
  video.srcObject = stream;
  video.play();
};
```

El siguiente paso es asignar el dinamismo a la etiqueta _***button***_ que capturara la foto del dispositivo multimedia. Para esto se usa un evento llamado _***addEventListener***_  donde se creara el contexto del canvas para que se refleje la captura de pantalla que se le hace al video de la camara web del dispositivo que se esta usando, para esto usamos el metodo _***drawImage***_ que recibira el video y el tamaño.

Luego con el metodo _***toDataURL***_ convertirmos a formato de imagen _***.png***_  lo que se esta mostrando en la etiqueta video que es la camara web del dispositivo y por ultimo le asignamos el contenido de esa varible al atributo _***scr***_ de la etiqueta _***img***_ que contiene el canvas.

```
button.addEventListener("click", () => {
  let context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, 420, 340);
  let data = canvas.toDataURL("image/png");
  photo.setAttribute("src", data);
});
```
