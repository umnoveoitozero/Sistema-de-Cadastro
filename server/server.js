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
  useNew
