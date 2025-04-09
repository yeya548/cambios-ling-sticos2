// Destructuring de lucide-react para usar sus componentes
const { Check, X, HelpCircle, RefreshCw } = LucideReact;

// Componente principal del juego
const JuegoClasificacion = () => {
  // Definir los tipos de cambio lingüístico
  const categorias = [
    { id: 'fonetico', nombre: 'Cambio Fonético', descripcion: 'Alteración en la pronunciación de los sonidos.' },
    { id: 'semantico', nombre: 'Cambio Semántico', descripcion: 'Modificación del significado de las palabras.' },
    { id: 'morfologico', nombre: 'Cambio Morfológico', descripcion: 'Alteración en la estructura de las palabras.' },
    { id: 'prestamo', nombre: 'Préstamo Lingüístico', descripcion: 'Adopción de palabras de otros idiomas.' },
    { id: 'neologismo', nombre: 'Neologismo', descripcion: 'Creación de palabras nuevas.' }
  ];

  // Ejemplos de palabras para cada categoría
  const palabrasEjemplos = [
    { palabra: 'leche (del latín lacte)', categoria: 'fonetico', explicacion: 'Sufrió cambios fonéticos del latín al español.' },
    { palabra: 'ratón (de computadora)', categoria: 'semantico', explicacion: 'Extendió su significado original de animal a dispositivo.' },
    { palabra: 'cantábamos (de cantare)', categoria: 'morfologico', explicacion: 'Adopta sufijos para indicar tiempo y persona.' },
    { palabra: 'fútbol (del inglés football)', categoria: 'prestamo', explicacion: 'Adaptación de una palabra inglesa al español.' },
    { palabra: 'blog', categoria: 'neologismo', explicacion: 'Palabra nueva creada para el contexto digital.' },
    { palabra: 'facto (del latín factum)', categoria: 'fonetico', explicacion: 'Transición fonética del latín al español.' },
    { palabra: 'salario (origen: pago en sal)', categoria: 'semantico', explicacion: 'Cambió su significado original relacionado con la sal.' },
    { palabra: 'desmotivación (des-motiv-ación)', categoria: 'morfologico', explicacion: 'Formada por prefijos y sufijos añadidos.' },
    { palabra: 'chófer (del francés chauffeur)', categoria: 'prestamo', explicacion: 'Tomada del francés y adaptada al español.' },
    { palabra: 'tuitear', categoria: 'neologismo', explicacion: 'Verbo creado a partir de la marca Twitter.' },
    { palabra: 'hijo (del latín filius)', categoria: 'fonetico', explicacion: 'La f- inicial latina se transformó en h- en español.' },
    { palabra: 'ratón (roedor → dispositivo)', categoria: 'semantico', explicacion: 'Amplió su significado por analogía de forma.' },
    { palabra: 'anticonstitucional', categoria: 'morfologico', explicacion: 'Combinación de varios morfemas.' },
    { palabra: 'espagueti (del italiano spaghetti)', categoria: 'prestamo', explicacion: 'Adaptación de término italiano.' },
    { palabra: 'influencer', categoria: 'neologismo', explicacion: 'Término reciente para un nuevo concepto social.' },
    { palabra: 'noche (del latín noctem)', categoria: 'fonetico', explicacion: 'Transformación fonética del latín al español.' },
    { palabra: 'pluma (instrumento de escritura)', categoria: 'semantico', explicacion: 'Originalmente refería solo a las plumas de ave.' },
    { palabra: 'desafortunadamente', categoria: 'morfologico', explicacion: 'Combinación de prefijo, raíz y sufijos.' },
    { palabra: 'champú (del inglés shampoo)', categoria: 'prestamo', explicacion: 'Adaptación del término inglés.' },
    { palabra: 'videollamada', categoria: 'neologismo', explicacion: 'Término creado para una nueva tecnología.' }
  ];

  // Estado del juego - usando React.useState en lugar de import
  const [palabrasDisponibles, setPalabrasDisponibles] = React.useState([]);
  const [palabraActual, setPalabraActual] = React.useState(null);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = React.useState(null);
  const [resultado, setResultado] = React.useState(null);
  const [puntuacion, setPuntuacion] = React.useState(0);
  const [preguntasRespondidas, setPreguntasRespondidas] = React.useState(0);
  const [totalPreguntas, setTotalPreguntas] = React.useState(10);
  const [juegoTerminado, setJuegoTerminado] = React.useState(false);
  const [mostrarAyuda, setMostrarAyuda] = React.useState(false);

  // Inicializar el juego - usando React.useEffect en lugar de import
  React.useEffect(() => {
    iniciarJuego();
  }, []);

  const iniciarJuego = () => {
    // Barajar las palabras y tomar solo totalPreguntas
    const palabrasBarajadas = [...palabrasEjemplos].sort(() => Math.random() - 0.5).slice(0, totalPreguntas);
    setPalabrasDisponibles(palabrasBarajadas);
    setPreguntasRespondidas(0);
    setPuntuacion(0);
    setJuegoTerminado(false);
    setResultado(null);
    siguientePalabra(palabrasBarajadas);
  };

  const siguientePalabra = (palabrasRestantes = palabrasDisponibles) => {
    if (palabrasRestantes.length === 0) {
      setJuegoTerminado(true);
      setPalabraActual(null);
      return;
    }

    const nuevasPalabras = [...palabrasRestantes];
    const nuevaPalabra = nuevasPalabras.shift();
    setPalabraActual(nuevaPalabra);
    setPalabrasDisponibles(nuevasPalabras);
    setRespuestaSeleccionada(null);
    setResultado(null);
  };

  const verificarRespuesta = (categoriaId) => {
    setRespuestaSeleccionada(categoriaId);
    const esCorrecta = categoriaId === palabraActual.categoria;
    setResultado(esCorrecta);

    if (esCorrecta) {
      setPuntuacion(puntuacion + 1);
    }

    setPreguntasRespondidas(preguntasRespondidas + 1);

    // Pausa antes de mostrar la siguiente palabra
    setTimeout(() => {
      siguientePalabra();
    }, 1500);
  };

  const reiniciarJuego = () => {
    iniciarJuego();
  };

  const toggleAyuda = () => {
    setMostrarAyuda(!mostrarAyuda);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6 rounded-lg">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold mb-2 text-indigo-700">Categoriza el Cambio Lingüístico</h1>
        <p className="text-gray-600">Clasifica cada palabra según el tipo de cambio que ha experimentado</p>
      </div>

      {/* Contador y puntuación */}
      <div className="flex justify-between mb-6">
        <div className="bg-white p-3 rounded-lg shadow">
          <p className="text-sm text-gray-500">Pregunta</p>
          <p className="text-xl font-bold">{preguntasRespondidas + (juegoTerminado ? 0 : 1)} / {totalPreguntas}</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow">
          <p className="text-sm text-gray-500">Puntuación</p>
          <p className="text-xl font-bold">{puntuacion} / {totalPreguntas}</p>
        </div>
        <button 
          onClick={toggleAyuda} 
          className="bg-indigo-100 p-2 rounded-full h-10 w-10 flex items-center justify-center hover:bg-indigo-200"
        >
          <HelpCircle size={20} className="text-indigo-700" />
        </button>
      </div>

      {/* Ayuda */}
      {mostrarAyuda && (
        <div className="bg-indigo-50 p-4 rounded-lg mb-6 border border-indigo-100">
          <h3 className="font-bold text-indigo-700 mb-2">Tipos de cambio lingüístico:</h3>
          <ul className="space-y-2">
            {categorias.map(cat => (
              <li key={cat.id} className="flex items-start">
                <span className="font-semibold mr-2">{cat.nombre}:</span> 
                <span className="text-gray-700">{cat.descripcion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Área de juego */}
      {!juegoTerminado && palabraActual ? (
        <div className="mb-6">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6 text-center">
            <p className="text-gray-500 mb-2">¿Qué tipo de cambio lingüístico representa?</p>
            <h2 className="text-2xl font-bold text-indigo-900">{palabraActual.palabra}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => verificarRespuesta(categoria.id)}
                disabled={respuestaSeleccionada !== null}
                className={`p-3 rounded-lg text-left transition-all ${
                  respuestaSeleccionada === null
                    ? 'bg-white hover:bg-indigo-50 hover:border-indigo-300 border border-gray-200'
                    : respuestaSeleccionada === categoria.id
                      ? resultado
                        ? 'bg-green-100 border border-green-300'
                        : 'bg-red-100 border border-red-300'
                      : palabraActual.categoria === categoria.id && respuestaSeleccionada !== null
                        ? 'bg-green-100 border border-green-300'
                        : 'bg-white border border-gray-200 opacity-70'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{categoria.nombre}</span>
                  {respuestaSeleccionada === categoria.id && (
                    resultado ? (
                      <Check size={20} className="text-green-600" />
                    ) : (
                      <X size={20} className="text-red-600" />
                    )
                  )}
                  {palabraActual.categoria === categoria.id && respuestaSeleccionada !== null && respuestaSeleccionada !== categoria.id && (
                    <Check size={20} className="text-green-600" />
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">{categoria.descripcion}</p>
              </button>
            ))}
          </div>

          {respuestaSeleccionada !== null && (
            <div className={`mt-4 p-4 rounded-lg ${resultado ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
              <p className={`font-medium ${resultado ? 'text-green-800' : 'text-red-800'}`}>
                {resultado ? '¡Correcto!' : '¡Incorrecto!'}
              </p>
              <p className="text-gray-700 mt-1">{palabraActual.explicacion}</p>
            </div>
          )}
        </div>
      ) : juegoTerminado ? (
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">¡Juego terminado!</h2>
          <p className="text-lg mb-4">
            Tu puntuación final: <span className="font-bold">{puntuacion}</span> de {totalPreguntas}
          </p>
          <p className="mb-6">
            {puntuacion === totalPreguntas ? '¡Perfecto! Dominas los cambios lingüísticos.' : 
             puntuacion >= totalPreguntas * 0.8 ? '¡Muy bien! Tienes un excelente conocimiento.' :
             puntuacion >= totalPreguntas * 0.6 ? 'Buen trabajo. Sigue practicando.' :
             'Sigue estudiando los tipos de cambio lingüístico.'}
          </p>
          <button
            onClick={reiniciarJuego}
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center mx-auto"
          >
            <RefreshCw size={20} className="mr-2" />
            Jugar de nuevo
          </button>
        </div>
      ) : (
        <div className="text-center">Cargando juego...</div>
      )}
    </div>
  );
};

// Renderizar el componente en el div con id "root"
ReactDOM.render(<JuegoClasificacion />, document.getElementById('root'));
