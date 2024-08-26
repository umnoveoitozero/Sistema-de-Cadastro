const express = require('express');
const multer = require('multer'); 
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Multer para armazenamento de fotografias
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/igreja', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definição do modelo de Visitante
const visitanteSchema = new mongoose.Schema({
  nome: String,
  email: String,
  dataNascimento: Date,
  numeroFilhos: Number,
  filhos: Array,
  fotografiaUrl: String
});

const Visitante = mongoose.model('Visitante', visitanteSchema);

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rota para criar um novo visitante
app.post('/api/visitors', upload.single('fotografia'), async (req, res) => {
  const { nome, email, dataNascimento, numeroFilhos } = req.body;
  const filhos = [];

  for (let i = 0; i < numeroFilhos; i++) {
    filhos.push({
      nome: req.body[`filhoNome${i}`],
      dataNascimento: req.body[`filhoDataNascimento${i}`]
    });
  }

  const novoVisitante = new Visitante({
    nome,
    email,
    dataNascimento,
    numeroFilhos,
    filhos,
    fotografiaUrl: req.file ? `data:image/jpeg;base64,${req.file.buffer.toString('base64')}` : null
  });

  try {
    await novoVisitante.save();
    res.status(201).json({ message: 'Visitante cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar visitante', error });
  }
});

// Rota para listar todos os visitantes
app.get('/api/visitors', async (req, res) => {
  try {
    const visitantes = await Visitante.find();
    res.status(200).json(visitantes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar visitantes', error });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
