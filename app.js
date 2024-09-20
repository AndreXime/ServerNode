const express = require('express');
const routes = require('./src/routes/allRoutes');
require('dotenv').config();  // Carrega variáveis do .env
require('./src/config/db'); // Conecta ao BD

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// Middlewares do proprio express
app.use(express.json()); // Para entender requisições JSON
app.use(express.static('public')); // Para arquivos estáticos
app.use(express.urlencoded({ extended: true })); // Para entender dados de formulários

app.set('x-powered-by', false);

//Medir o tempo de resposta
app.use((req, res, next) => {
    const start = process.hrtime(); // Marca o início da requisição com alta precisão
  
    // Evento 'finish' é disparado quando a resposta termina
    res.on('finish', () => {
      const diff = process.hrtime(start); // Calcula a diferença
      const seconds = diff[0]; // Segundos
      const milliseconds = diff[1] / 1e6; // Converte nanosegundos em milissegundos
      console.log(`Tempo de resposta: ${seconds}s e ${milliseconds.toFixed(3)}ms`);
    });
  
    next(); // Continua para o próximo middleware
});

// Rotas
app.use('/', routes);

// Inicializando servidor
const port = process.env.PORT || 3000;
app.listen(port,'0.0.0.0',() => {
    console.log(`Server running at http://localhost:${port}`);
});
