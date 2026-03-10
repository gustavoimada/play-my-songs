const mockMusicas = [
    {
        nomeMusica: "Love My Life",
        nomeAutor: "Robbie Williams",
        estilo: "pop",
        arquivo: "Teste_Henrique e Juliano_rap.mp3"
    },
    {
        nomeMusica: "Teste",
        nomeAutor: "Henrique e Juliano",
        estilo: "rap",
        arquivo: "Teste_Henrique e Juliano_rap.mp3"
    },
    {
        nomeMusica: "Teste",
        nomeAutor: "teste",
        estilo: "rock",
        arquivo: "Teste_teste_rock.mp3"
    }
];

function pesquisarMusicas(event) {
    event.preventDefault();

    const palavraChave = document.getElementById("palavraChave").value.trim();
    const feedback = document.getElementById("pesquisa-feedback");
    const container = document.getElementById("resultado-pesquisa");

    if (!palavraChave) {
        feedback.style.display = "block";
        feedback.innerHTML = `
            <span class="badge">Atenção</span>
            <h3>Campo obrigatório</h3>
            <p>Digite uma palavra-chave para realizar a pesquisa.</p>
        `;
        container.innerHTML = "";
        return;
    }

    fetch(`http://localhost:8080/apis/find-musics?palavraChave=${encodeURIComponent(palavraChave)}`)
        .then(async (response) => {
            if (!response.ok) {
                throw new Error("Falha na busca");
            }

            const data = await response.json();

            if (Array.isArray(data)) {
                renderizarResultados(data, palavraChave);
                return;
            }

            renderizarResultadosMock(palavraChave);
        })
        .catch(() => {
            renderizarResultadosMock(palavraChave);
        });
}

function renderizarResultadosMock(palavraChave) {
    const termo = palavraChave.toLowerCase();

    const resultados = mockMusicas.filter((musica) => {
        return (
            musica.nomeMusica.toLowerCase().includes(termo) ||
            musica.nomeAutor.toLowerCase().includes(termo) ||
            musica.estilo.toLowerCase().includes(termo)
        );
    });

    renderizarResultados(resultados, palavraChave);
}

function renderizarResultados(resultados, palavraChave) {
    const feedback = document.getElementById("pesquisa-feedback");
    const container = document.getElementById("resultado-pesquisa");

    feedback.style.display = "block";

    if (!resultados || resultados.length === 0) {
        feedback.innerHTML = `
            <span class="badge">Busca</span>
            <h3>Nenhum resultado encontrado</h3>
            <p>Nenhuma música corresponde ao termo "${palavraChave}".</p>
        `;
        container.innerHTML = "";
        return;
    }

    feedback.innerHTML = `
        <span class="badge">Resultados</span>
        <h3>${resultados.length} música(s) encontrada(s)</h3>
        <p>Exibindo ocorrências relacionadas a "${palavraChave}".</p>
    `;

    container.innerHTML = resultados.map((musica) => `
        <article class="music-result">
            <div class="music-result__meta">
                <p class="eyebrow">Resultado</p>
                <h3>${musica.nomeMusica}</h3>
                <p><strong>Artista:</strong> ${musica.nomeAutor}</p>
                <p><strong>Estilo:</strong> ${musica.estilo}</p>
            </div>

            <div class="music-result__player">
                <audio controls preload="none">
                    <source src="musicas/${musica.arquivo}" type="audio/mpeg">
                    Seu navegador não suporta áudio HTML5.
                </audio>
            </div>
        </article>
    `).join("");
}