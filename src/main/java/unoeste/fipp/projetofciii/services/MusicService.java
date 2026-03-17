package unoeste.fipp.projetofciii.services;

import com.google.gson.Gson;
import com.mongodb.client.*;
import com.mongodb.client.internal.MongoClientImpl;
import org.bson.conversions.Bson;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import unoeste.fipp.projetofciii.entities.Estilo;
import unoeste.fipp.projetofciii.entities.Music;

import org.bson.Document;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Pattern;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.or;

@Service
public class MusicService {

    String connectionString = "mongodb://localhost:27017";

    public List<Music> findMusicByKeyWord(String keyword){
        //acesso ao MongoDB
        MongoClient mongoClient = MongoClients.create(connectionString);
        MongoDatabase database = mongoClient.getDatabase("my_musics");
        //selecionando uma coleção

        MongoCollection<Document> collection = database.getCollection("musics");
        MongoCursor<Document> cursor = collection.find(
                or(Arrays.asList(
                        eq("nomeAutor", Pattern.compile("(?i)" + keyword)),
                        eq("nomeMusica", Pattern.compile("(?i)" + keyword)),
                        eq("estilo", Pattern.compile("(?i)" + keyword)),
                        eq("arquivo", Pattern.compile("(?i)" + keyword))
                ))
        ).iterator();

        List<Music> musicList = new ArrayList<>();
        while(cursor.hasNext()){
            Music music = new Gson().fromJson(cursor.next().toJson(), Music.class);
            musicList.add(music);
        }
        mongoClient.close();
        //acesso ao MongoDB, busca por musica que satisfazem a pesquisa
        //retorno da lista de musica
        return musicList;
    }

    public void insertBD(Music music){
        MongoClient mongoClient = MongoClients.create(connectionString);
        MongoDatabase database = mongoClient.getDatabase("my_musics");
        MongoCollection<Document> collection = database.getCollection("musics");
        collection.insertOne(Document.parse(new Gson().toJson(music)));
    }


    public List<Estilo> findStyles(){
        MongoClient mongoClient = MongoClients.create(connectionString);
        MongoDatabase database = mongoClient.getDatabase("my_musics");
        MongoCollection<Document> collection = database.getCollection("estilos");
        MongoCursor<Document> cursor = collection.find().iterator();

        List<Estilo> estiloList = new ArrayList<>();
        while(cursor.hasNext()){
            Estilo estilo = new Gson().fromJson(cursor.next().toJson(), Estilo.class);
            estiloList.add(estilo);
        }

        return estiloList;
    }

    public Music musicaDestaque(){
        MongoClient mongoClient = MongoClients.create(connectionString);
        MongoDatabase database = mongoClient.getDatabase("my_musics");
        MongoCollection<Document> collection = database.getCollection("musics");
        int total = (int) collection.countDocuments();
        int pos = (int) (Math.random() * total);
        MongoCursor<Document> cursor = collection.find().skip(pos).iterator();
        Music music = new Gson().fromJson(cursor.next().toJson(), Music.class);

        return music;
    }
}
