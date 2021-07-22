//variables
const formulario = document.querySelector( '#formulario' );
const listaTweets = document.querySelector( '#lista-tweets' );
let tweets = [];



//lisener
eventListeners();

function eventListeners() {
    //usuario agreag nuevo tweet
  formulario.addEventListener('submit', agregarTweet);
  
  //cuando el documento esta listo
  document.addEventListener('DOMContentLoaded', ()=>{
    tweets = JSON.parse( localStorage.getItem('tweets')) || [];
  
        crearHTML();
    });
};






//funciones
function agregarTweet(e) {
    e.preventDefault()

    //text area
    const tweet = document.querySelector('#tweet').value;

    //validacion

    if(tweet === ''){
        mostrarError('Un mesnaje no puede ir vacio')
        return;//evita que se ejecuten mas lineas de codigo
    }
        const tweetObj = {
            id: Date.now(),
            tweet
        }

        //agregar al arreglo
        tweets = [...tweets, tweetObj];
   
        //crear html
      crearHTML();  

        //reiniciar el formulario
      formulario.reset();


}

//mostrar error

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error')

    //insertarlo en el html
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearHTML() {
    
    limpiarHTML();
    
    
    if(tweets.length > 0){
        tweets.forEach( tweet  => {
            //agregar boton para eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';


            //añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            };

            const li = document.createElement('li')
            //añadir el texto
            li.innerText = tweet.tweet;

            //asignar boton
            li.appendChild(btnEliminar);

            //inseratlo en html
            listaTweets.appendChild(li);

        });

    }

    sincronizarStorage();
}

//agregar los twwets al storage

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
} 

//elimina el tweet
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id );

    crearHTML();

}

//limpiar html
function limpiarHTML(){
  while( listaTweets.firstChild ){
      listaTweets.removeChild(listaTweets.firstChild);
  }
  

}