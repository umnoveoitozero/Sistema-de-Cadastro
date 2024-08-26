fetch('/api/visitors')
  .then(response => response.json())
  .then(visitantes => {
    const visitantesTable = document.getElementById('visitantesTable').getElementsByTagName('tbody')[0];

    visitantes.forEach(visitante => {
      const row = visitantesTable.insertRow();

      const nomeCell = row.insertCell(0);
      const emailCell = row.insertCell(1);
      const dataNascimentoCell = row.insertCell(2);
      const numeroFilhosCell = row.insertCell(3);
      const fotografiaCell = row.insertCell(4);

      nomeCell.textContent = visitante.nome;
      emailCell.textContent = visitante.email;
      dataNascimentoCell.textContent = new Date(visitante.dataNascimento).toLocaleDateString();
      numeroFilhosCell.textContent = visitante.numeroFilhos;

      if (visitante.fotografiaUrl) {
        const img = document.createElement('img');
        img.src = visitante.fotografiaUrl;
        img.alt = 'Fotografia';
        img.width = 50;
        fotografiaCell.appendChild(img);
      } else {
        fotografiaCell.textContent = 'Sem foto';
      }
    });
  })
  .catch(error => console.error('Erro ao buscar visitantes:', error));
