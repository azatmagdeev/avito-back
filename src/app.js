import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {Ads} from "./lib";

const server = express();
server.use(cors());
server.use(bodyParser.json());

const ads = new Ads;
ads.addNewAd('lada 2121','car', 'good car',1000,'azat',[]);

console.log(ads);

server.get('/', (req, res) => {
    res.send(ads.items)
});



server.listen(7777,()=>{
    console.log('server started')
});