import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {Ads} from "./lib";

const server = express();
server.use(cors());
server.use(bodyParser.json());

const ads = new Ads;

const azat = ads.addNewSeller('Azat','+79600440765');
azat.addNewAd('lada 2121','cars', 'good car',1000,[]);
azat.addNewAd('mazda','cars','amazing choice',1000000,[]);

const enzhe = ads.addNewSeller('enzhe','+79172201438');
enzhe.addNewAd('dress','clothes','litle dark dress',1500,[]);
enzhe.addNewAd('cat','pets','funny cat',2000,[]);

console.log(ads);

server.get('/', (req, res) => {
    ads.getAllItems();
    res.send(ads.items)
});

const port = process.env.PORT || 7777;

server.listen(port,()=>{
    console.log('server started')
});