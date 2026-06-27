function exibirFeedback(tipo, titulo, descricao) {
    const feedback = document.getElementById("mensagem-feedback");

    feedback.style.display = "block";
    feedback.scrollIntoView({ behavior: "smooth", block: "center" });
    feedback.innerHTML = `
        <span class="badge">${tipo}</span>
        <h3>${titulo}</h3>
        <p>${descricao}</p>
    `;
}

function cadastrarMusica()
{
    const formMusica = document.forms[0];
    const feedback = document.getElementById("mensagem-feedback");
    const arquivo = formMusica.elements["file"].files[0];
    const nomeMusica = formMusica.elements["nomeMusica"].value;
    const nomeAutor = formMusica.elements["nomeAutor"].value;
    const estilo = formMusica.elements["estilo"].value
    //tem assim tambem
    //const arquivo = document.getElementById("file").files[0];

    if (nomeMusica === "")
    {
        exibirFeedback("Erro", "Nome da música obrigatório", "Informe o nome da música.");
        return;
    }

    if (nomeMusica.length < 2 || nomeMusica.length > 80) {
        exibirFeedback("Erro", "Nome da música inválido", "O nome da música deve ter entre 2 e 80 caracteres.");
        return;
    }


    if (nomeAutor === "") {
        exibirFeedback("Erro", "Nome do artista obrigatório", "Informe o nome do artista.");
        return;
    }

    if (nomeAutor.length < 2 || nomeAutor.length > 80) {
        exibirFeedback("Erro", "Nome do artista inválido", "O nome do artista deve ter entre 2 e 80 caracteres.");
        return;
    }

    if (estilo === "") {
        exibirFeedback("Erro", "Estilo obrigatório", "Selecione um estilo musical.");
        return;
    }

    if (arquivo == null) {
        exibirFeedback("Erro", "Arquivo obrigatório", "Selecione o arquivo da música.");
        return;
    }

    if(arquivo.name.toLowerCase().endsWith(".mp3")  || arquivo.name.toLowerCase().endsWith(".ogg") )
    {
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
                        feedback.scrollIntoView({ behavior: "smooth", block: "center" });
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
                    feedback.scrollIntoView({ behavior: "smooth", block: "center" });
                    feedback.innerHTML = `
                        <span class="badge">Erro</span>
                        <h3>${erro.title}</h3>
                        <p>${erro.descricao}</p>
                    `;
                });
            })
            .catch(() => {
                feedback.style.display = "block";
                feedback.scrollIntoView({ behavior: "smooth", block: "center" });
                feedback.innerHTML = `
                    <span class="badge">Erro</span>
                    <h3>Servidor indisponível</h3>
                    <p>Não foi possível concluir o envio da música.</p>
                `;
            });
    }
    else{
        feedback.style.display = "block";
        feedback.scrollIntoView({ behavior: "smooth", block: "center" });
        feedback.innerHTML = `
                    <span class="badge">Erro</span>
                    <h3>Formato do arquivo errado</h3>
                    <p>Não foi possível concluir o envio da música.</p>
                `;
    }
}

// só para ficar mais bonito no front end
function mostrarNomeArquivo()
{
    const input = document.getElementById("file");
    const fileName = document.getElementById("file-name");

    if (input.files && input.files.length > 0)
    {
        fileName.textContent = input.files[0].name;
    }
    else
    {
        fileName.textContent = "Nenhum arquivo selecionado";
    }
}

function carregarEstilos(){
    const select = document.getElementById("estilo")
    fetch("http://localhost:8080/apis/get-music-styles")
        .then(res => res.json())
        .then(estilo => {
            let opcoes = `<option value="">Selecione um estilo</option>`;
            estilo.forEach(estilo => {
                opcoes += `<option value="${estilo.nome}">${estilo.nome}</option>`
            })

            select.innerHTML = opcoes
        })
        .catch(error => {
            alert("Erro ao carregar os estilos")
        })
}
