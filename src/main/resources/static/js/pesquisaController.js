/*
function montarTabela(json) // esse json é uma lisat
{
    let tabela = "";
    for (musica of json)
    {
        tabela += `<tr>
            <td>${musica.nomeMusica}</td>
            <td>${musica.nomeAutor}</td>
            <td>${musica.estilo}</td>
        </tr>`;
    }
    return tabela;
}

function pesquisarMusicas()
{
    const musicas = document.getElementById('resultado');
    const filtro = document.getElementById('palavraChave').value;
    fetch("http://localhost:8080/apis/find-musics?keyWord="+filtro)
        .then(response =>{
            if(response.status === 200)
                return response.json().
                    then(json=>{
                        musicas.innerHTML = montarTabela(json);
                    })
            else
            {
                alert("Não há resultados")
            }
        })
        .catch(Error=>musicas.innerHTML = Error);
}*/

// acima tem o código de como se fosse fazer mesmo como fizemos no webFilmes
// fiz um pouco diferente do que esta acima, mas abaixo tem literalmente a mesma logica
// só não coloco o resultado em uma tabela, coloco numa div que fica mais bonito pro front

function montarResultados(json) {
    let html = "";

    for (const musica of json)
    {
        // usou essa funcao só para substituir espacos/acentos
        // no nome que iria quebrar a url e bugar dps
        const arquivo = encodeURIComponent(musica.arquivo);

        html += `
            <article class="music-result">
                <div class="music-result__meta">
                    <span class="badge">Resultado</span>
                    <h3>${musica.nomeMusica}</h3>
                    <p><strong>Artista:</strong> ${musica.nomeAutor}</p>
                    <p><strong>Estilo:</strong> ${musica.estilo}</p>
                </div>

                <div class="music-result__player">
                    <p class="music-result__label">Ouvir música</p>
                    <audio controls preload="none">
                        <source src="musicas/${arquivo}" type="audio/mpeg">
                        Seu navegador não suporta áudio.
                    </audio>
                </div>
            </article>
        `;
    }

    return html;
}

function pesquisarMusicas()
{
    const resultado = document.getElementById("resultado");
    const feedback = document.getElementById("pesquisa-feedback");
    const filtro = document.getElementById("palavraChave").value.trim();

    fetch("http://localhost:8080/apis/find-musics?keyWord=" + filtro)
        .then(response => {
            if (response.status === 200)
            {
                return response.json().then(json => {
                    feedback.style.display = "block";
                    feedback.innerHTML = `
                        <span class="badge">Pesquisa</span>
                        <h3>${json.length} resultado(s)</h3>
                        <p>Resultados para: <strong>${filtro}</strong></p>
                    `;

                    if (json.length === 0) {
                        resultado.innerHTML = `
                            <div class="empty-state">
                                <h3>Nenhuma música encontrada</h3>
                                <p>Tente pesquisar por nome da música, artista ou estilo.</p>
                            </div>
                        `;
                    } else
                    {
                        resultado.innerHTML = montarResultados(json);
                    }
                });
            } else {
                feedback.style.display = "block";
                feedback.innerHTML = `
                    <span class="badge">Erro</span>
                    <h3>Não foi possível pesquisar</h3>
                    <p>Tente novamente.</p>
                `;
                resultado.innerHTML = "";
            }
        })
        .catch(() => {
            feedback.style.display = "block";
            feedback.innerHTML = `
                <span class="badge">Erro</span>
                <h3>Servidor indisponível</h3>
                <p>Não foi possível carregar as músicas.</p>
            `;
            resultado.innerHTML = "";
        });
}