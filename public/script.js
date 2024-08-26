document.getElementById('numeroFilhos').addEventListener('input', function() {
  const numeroFilhos = parseInt(this.value);
  const filhosContainer = document.getElementById('filhosContainer');
  
  filhosContainer.innerHTML = ''; // Limpar campos existentes
  
  for (let i = 0; i < numeroFilhos; i++) {
    const filhoDiv = document.createElement('div');
    filhoDiv.innerHTML = `
      <label for="filhoNome${i}">Nome do Filho ${i + 1}:</label>
      <input type="text" id="filhoNome${i}" name="filhoNome${i}" required>
      
      <label for="filhoDataNascimento${i}">Data de Nascimento do Filho ${i + 1}:</label>
      <input type="date" id="filhoDataNascimento${i}" name="filhoDataNascimento${i}" required>
    `;
    filhosContainer.appendChild(filhoDiv);
  }
});

document.getElementById('visitorForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);
  
  fetch('/api/visitors', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    alert('Visitante cadastrado com sucesso!');
    // Limpar o formulário ou redirecionar
  })
  .catch(error => {
    console.error('Erro ao cadastrar visitante:', error);
  });
});
