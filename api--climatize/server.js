const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));
// Configurar rotas
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

