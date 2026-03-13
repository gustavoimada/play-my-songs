package unoeste.fipp.projetofciii.entities;

import org.bson.types.ObjectId;

public class Music {
    private ObjectId _id;
    private String nomeMusica;
    private String nomeAutor;
    private String estilo;
    private String arquivo;

    public Music(String nomeMusica, String nomeAutor, String estilo) {
        this.nomeMusica = nomeMusica;
        this.nomeAutor = nomeAutor;
        this.estilo = estilo;
    }

    public Music(ObjectId _id, String nomeMusica, String nomeAutor, String estilo, String arquivo) {
        this._id = _id;
        this.nomeMusica = nomeMusica;
        this.nomeAutor = nomeAutor;
        this.estilo = estilo;
        this.arquivo = arquivo;
    }

    public String getNomeMusica() {
        return nomeMusica;
    }

    public void setNomeMusica(String nomeMusica) {
        this.nomeMusica = nomeMusica;
    }

    public String getNomeAutor() {
        return nomeAutor;
    }

    public void setNomeAutor(String nomeAutor) {
        this.nomeAutor = nomeAutor;
    }

    public String getEstilo() {
        return estilo;
    }

    public void setEstilo(String estilo) {
        this.estilo = estilo;
    }

    public String getArquivo() {
        return arquivo;
    }

    public void setArquivo(String arquivo) {
        this.arquivo = arquivo;
    }

    public ObjectId get_id() {
        return _id;
    }

    public void set_id(ObjectId _id) {
        this._id = _id;
    }
}
