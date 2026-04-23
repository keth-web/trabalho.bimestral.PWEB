const express = require('express');
const app = express();

app.use(express.json());

// "Banco de dados" em memória
let tarefas = [];
let id = 1;

/*GET - Listar todas as tarefas*/
app.get('/tarefas', (req, res) => {
  res.status(200).json(tarefas);
});

/*POST - Criar uma nova tarefa*/
app.post('/tarefas', (req, res) => {
  const { titulo } = req.body;

  // Validação
  if (!titulo) {
    return res.status(400).json({ erro: 'O título é obrigatório' });
  }

  const novaTarefa = {
    id: id++,
    titulo,
    concluida: false
  };

  tarefas.push(novaTarefa);

  res.status(201).json(novaTarefa);
});

/*PUT - Atualizar uma tarefa*/
app.put('/tarefas/:id', (req, res) => {
  const idParam = Number(req.params.id);
  const tarefa = tarefas.find(t => t.id === idParam);

  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  const { titulo, concluida } = req.body;

  if (titulo !== undefined) tarefa.titulo = titulo;
  if (concluida !== undefined) tarefa.concluida = concluida;

  res.status(200).json(tarefa);
});

/*DELETE - Remover uma tarefa*/
app.delete('/tarefas/:id', (req, res) => {
  const idParam = Number(req.params.id);
  const tarefaExiste = tarefas.some(t => t.id === idParam);

  if (!tarefaExiste) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  tarefas = tarefas.filter(t => t.id !== idParam);

  res.status(200).json({ mensagem: 'Tarefa removida com sucesso' });
});

/*Iniciar servidor*/
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
