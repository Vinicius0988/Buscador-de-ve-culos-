async function fetchVeiculos() {
    try {
        const response = await fetch('db.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo JSON.');
        }
        return await response.json();
    } catch (error) {
        console.error('Falha ao carregar os dados:', error);
        return null;
    }
}

let veiculosData = null;
fetchVeiculos().then(data => {
    veiculosData = data;
});

// A função principal agora usa .find() para buscar o carro.
function BuscarVeiculo() {
    if (!veiculosData) {
        console.error('Dados ainda não carregados. Tente novamente em alguns segundos.');
        return;
    }
    
    const searchInput = document.querySelector('.search-input');
    const termoBusca = searchInput.value.trim().toLowerCase();

    const resultsContainer = document.getElementById('results');
    const chassiImage = document.getElementById('chassi-image');
    const motorImage = document.getElementById('motor-image');
    const messageCard = document.getElementById('message-card');
    const messageText = document.getElementById('message-text');

    messageCard.style.display = 'none';

    // Procura o carro no array.
    const veiculoEncontrado = veiculosData.find(carro => carro.nome.toLowerCase() === termoBusca);

    if (veiculoEncontrado) {
        // Se o veículo for encontrado, atualiza as imagens.
        chassiImage.src = veiculoEncontrado.imagem_chassi;
        motorImage.src = veiculoEncontrado.imagem_motor;
        chassiImage.style.display = 'block';
        motorImage.style.display = 'block';
        messageCard.style.display = 'none';
    } else {
        // Se o veículo NÃO for encontrado, exibe a mensagem de erro.
        chassiImage.style.display = 'none';
        motorImage.style.display = 'none';
        resultsContainer.classList.remove('hidden');

        // Exibe a mensagem de erro
        messageCard.style.display = 'flex'; // Exibe o container da mensagem
        messageText.textContent = "Veículo não encontrado.";
    }

    resultsContainer.classList.remove('hidden');
}