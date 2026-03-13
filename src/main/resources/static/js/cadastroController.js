function cadastrarMusica()
{
    const formMusica = document.forms[0];
    const feedback = document.getElementById("mensagem-feedback");
    const requestOptions = {
        method: "POST",
        body: new FormData(formMusica)
    };

    fetch("http://localhost:8080/apis/music-upload", requestOptions)
        .then((response) => {
            if (response.status === 200)
            {
                return response.json().then((music) => {
                    feedback.style.display = "block";
                    feedback.innerHTML = `
                        <span class="badge">Sucesso</span>
                        <h3>${music.nomeMusica}</h3>
                        <p><strong>Artista:</strong> ${music.nomeAutor}</p>
                        <p><strong>Estilo:</strong> ${music.estilo}</p>
                        <p>Música adicionada com sucesso.</p>
                    `;
                    formMusica.reset();
                });
            }

            return response.json().then((erro) => {
                feedback.style.display = "block";
                feedback.innerHTML = `
                    <span class="badge">Erro</span>
                    <h3>${erro.title}</h3>
                    <p>${erro.descricao}</p>
                `;
            });
        })
        .catch(() => {
            feedback.style.display = "block";
            feedback.innerHTML = `
                <span class="badge">Erro</span>
                <h3>Servidor indisponível</h3>
                <p>Não foi possível concluir o envio da música.</p>
            `;
        });
}

// só para ficar mais bonito no front end
function mostrarNomeArquivo() {
    const input = document.getElementById("file");
    const fileName = document.getElementById("file-name");

    if (input.files && input.files.length > 0) {
        fileName.textContent = input.files[0].name;
    } else {
        fileName.textContent = "Nenhum arquivo selecionado";
    }
}