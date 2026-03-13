package unoeste.fipp.projetofciii.services;

import com.google.gson.Gson;
import com.mongodb.client.*;
import org.bson.Document;
import org.springframework.stereotype.Service;
import unoeste.fipp.projetofciii.entities.Music;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.or;

@Service
public class MusicService
{
    private final String connectionString = "mongodb://localhost:27017";

    // listar as musicas de acordo com o filtro
    public List<Music> findMusicsByKeyWord(String keyword)
    {
        // acesso ao MongoDB
        MongoClient mongoClient = MongoClients.create(connectionString);

        // seleciona a database
        MongoDatabase database = mongoClient.getDatabase("my_musics");

        // seleciona a coleção dessa database
        MongoCollection<Document> collection = database.getCollection("musics");

        // pega todas as músicas que tão cadastradas la no mongo e bota numa lista
        MongoCursor<Document> cursor = collection.find(
                or(Arrays.asList(
                        eq("nomeAutor", Pattern.compile("(?i)" + keyword)),
                        eq("nomeMusica", Pattern.compile("(?i)" + keyword)),
                        eq("estilo", Pattern.compile("(?i)" + keyword)),
                        eq("arquivo", Pattern.compile("(?i)" + keyword))
                ))
        ).iterator();
        List <Music> musicList = new ArrayList<>();
        while(cursor.hasNext())
        {
            Music music = new Gson().fromJson(cursor.next().toJson(), Music.class); //*****
            musicList.add(music);
        }

        mongoClient.close();
        return musicList;
    }

    // adicionar as musicas
    public void addMusica(Music musica)
    {
        // acesso ao MongoDB
        MongoClient mongoClient = MongoClients.create(connectionString);

        // seleciona a database
        MongoDatabase database = mongoClient.getDatabase("my_musics");

        // seleciona a coleção dessa database
        MongoCollection<Document> collection = database.getCollection("musics");

        // insere
        collection.insertOne(Document.parse(new Gson().toJson(musica)));
    }

}
