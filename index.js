'use strict';
//Se realiza la selección de todas las teclas del html
const teclas = document.querySelectorAll('.key');
//Se realiza la selección de las teclas teniendo en cuenta si son blancas o negras
const blancas = document.querySelectorAll('.key.white');
const negras = document.querySelectorAll('.key.black');

//Arreglos que contienen las teclas que serán pulsadas para interactuar con el piano
const tblancas = ['a', 's', 'd', 'f', 'g', 'h', 'j'];
const tnegras = ['w', 'e', 'r', 't', 'y'];

//Se ejecuta un bucle para agregarle a cada tecla el evento click en conjunto con
//una función denominada tocarNota que recibe como parametro la tecla
teclas.forEach((tecla) => {
    tecla.addEventListener('click', () => tocarNota(tecla));
});

/* Se crea la función tocar nota, la tecla que recibe como parametro es el div 
que se clickea, con la palabre clave dataset se obtiene la nota asociada
al componente data de cada tecla, el cuál coincide con la id del elemento audio que 
se enlaza con su respectiva nota*/
let tocarNota = (tecla) => {
    const sonidoNota = document.getElementById(tecla.dataset.note);
    //Cada que se toque una tecla se reinicia el tiempo de pulsacion a cero, de esta forma puede volver a iniciarse
    sonidoNota.currentTime = 0;
    sonidoNota.play();
    //Cuando una tecla es presionada se le agrega la clase active
    tecla.classList.add('active');
    //Una vez se deja de presionar, se le quita la clase asociada a la pulsación
    sonidoNota.addEventListener('ended',()=>{
        tecla.classList.remove('active');
    });

};

//Se agrega un event lister, asociado con la pulsación de una tecla
document.addEventListener('keydown', (e) => {
    //El evento e contiene la tecla presionada, se obtiene con e.key
    //Para evitar que al seguir presionando la tecla se ejecute la nota constantemente
    //se verifica si la tecla sigue presionada (e.repeat), si ese es el caso se sale del evento(return)
    if (e.repeat) return;
    const teclapresionada = e.key;
    //Se obtiene el indice de la tecla presionada que puede corresponder o no
    //con las definidas en los arreglos
    const tblancasIndex = tblancas.indexOf(teclapresionada);
    const tnegrasIndex = tnegras.indexOf(teclapresionada);
    //Si alguna de las teclas asociadas a las blancas o negras es presionada (index diferente de -1)
    //se llama a la funcion tocarnota pasandole el indice correspondiente a la tecla de piano
    //deseada, esto funciona porque el arreglo de teclas de teclado están el orden en el que estan las teclas de piano
    if (tblancasIndex > -1) tocarNota(blancas[tblancasIndex]);
    if (tnegrasIndex > -1) tocarNota(negras[tnegrasIndex]);
  });