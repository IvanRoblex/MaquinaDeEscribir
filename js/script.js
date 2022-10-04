const quotes = [
	'Cuando hayas eliminado lo imposible, lo que quede, por improbable que sea, debe ser la verdad',
     'No hay nada más engañoso que un hecho evidente.',
     'Debería saber a estas alturas que cuando un hecho parece oponerse a una larga serie de deducciones, invariablemente demuestra ser capaz de soportar alguna otra interpretación.',
     'Nunca hago excepciones. Una excepción invalida la regla.',
     'Lo que un hombre puede inventar otro puede descubrir.',
     'Nada aclara tanto un caso como explicárselo a otra persona.',
     'La educación nunca termina, Watson. Es una serie de lecciones, con la mayor para la última.',
];

// matriz para almacenar las palabras del desafío actual
let words = [];
// almacena el índice de la palabra que el jugador está escribiendo actualmente
let wordIndex = 0;
// valor predeterminado para startTime (se establecerá al inicio)
let startTime = Date.now();

// agregamos los elementos de html
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message')
const typedValueElement = document.getElementById('typed-value');

document.getElementById('start').addEventListener('click', function () {
	// agarramos los elementos, donde math nos dara una frase radom
	const quoteIndex = Math.floor(Math.random() * quotes.length);
	const quote = quotes[quoteIndex];
	// Empezaremos a citar palabras de la matriz
	words = quote.split(' ');
	// restablece el indice de palabras para el seguimiento
	wordIndex = 0;

	// Actualizacion de la interfaz
	// Creamos una matriz de elementos de intervalo para que podamos establecer una clase
	const spanWords = words.map(function(word) { return `<span>${word} </span>`});
	//Convertir en cadena y establecer como html interno en la visualizacion de cotizaciones
	quoteElement.innerHTML = spanWords.join('');
	// Resaltamos la primera palabra
	quoteElement.childNodes[0].className = 'highlight';
	// Borramos cualquier mensaje anterior
	messageElement.innerText = '';

	// Configuramos el cuadro de texto
	// Limpiamos el cuadro de texto
	typedValueElement.value = '';
	// enfocamos el cuadro de texto
	typedValueElement.focus();
	// Controlador de eventos

	// Inicializaremos el temporizador
	startTime = new Date().getTime();
});

typedValueElement.addEventListener('input', (e) => {
	// Obtenemos la palabra actual
	const currentWord = words[wordIndex];
	// Obtenemos el valor actual
	const typedValue = typedValueElement.value;

	if (typedValue === currentWord && wordIndex === words.length - 1) {
		// Finalizacion de la palbra
		// Mostramos el mensaje de fin
		const elapsedTime = new Date().getTime() - startTime;
		const message = `Felicidades! Terminaste en ${elapsedTime / 1000} segundos.`;
		messageElement.innerText = message;
	} else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
		// fin de la palabra
		// Borramos la anterior palabra para mostrar la nueva
		typedValueElement.value = '';
		// mostramos la siguiente palabra
		wordIndex++;
		// Restablecemos el nombre de la clase para todos los elementos entre comillas
		for (const wordElement of quoteElement.childNodes) {
			wordElement.className = '';
		}
		// Resltamos la nueva palabra
		quoteElement.childNodes[wordIndex].className = 'highlight';
	} else if (currentWord.startsWith(typedValue)) {
		// resaltamos la siguiente palabra
		typedValueElement.className = '';
	} else {
		// Reseltamos la palabra si esta erronea
		typedValueElement.className = 'error';
	}
});