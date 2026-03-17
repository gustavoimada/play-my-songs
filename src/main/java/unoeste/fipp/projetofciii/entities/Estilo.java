package unoeste.fipp.projetofciii.entities;

import org.bson.types.ObjectId;

public class Estilo {
    private ObjectId _id;
    private String nome;
    private String descricao;

    public Estilo(ObjectId _id, String nome, String descricao) {
        this._id = _id;
        this.nome = nome;
        this.descricao = descricao;
    }

    public Estilo(String nome, String descricao) {
        this.nome = nome;
        this.descricao = descricao;
    }

    public ObjectId get_id() {
        return _id;
    }

    public void set_id(ObjectId _id) {
        this._id = _id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
