document.addEventListener('DOMContentLoaded', function() {
    function carregarProdutos() {
        fetch('/produtos')
        .then(response => response.json())
        .then(data => {
            const tabelaProdutos = document.querySelector('#tabela-produtos tbody');
            tabelaProdutos.innerHTML = '';  

            data.forEach(produto => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${produto[0]}</td>
                    <td>${produto[1]}</td>
                    <td>${produto[2]}</td>
                    <td>${produto[3]}</td>
                    <td>${produto[4]}</td>
                `;
                tabelaProdutos.appendChild(row);
            });
        });
    }


    const formProduto = document.getElementById('form-produto');
    formProduto.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = {
            nome: document.getElementById('nome').value,
            preco: document.getElementById('preco').value,
            quantidade: document.getElementById('quantidade').value,
            data_cadastro: document.getElementById('data_cadastro').value
        };

        fetch('/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                alert('Produto criado com sucesso!');
                carregarProdutos();
                formProduto.reset();
            } else {
                alert('Erro ao criar produto.');
            }
        });
    });

    carregarProdutos();
});
