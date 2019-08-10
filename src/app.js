import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {ads} from "./lib";

const server = express();
server.use(cors());
server.use(bodyParser.json());


const azat = ads.addNewSeller('Azat', '+79600440765');
const enzhe = ads.addNewSeller('Энже', '+79172201438');

azat.addNewAd('Авто', 'Лада Калина', "2012 г, цвет красный",
    100000, []);
azat.addNewAd('Недвижимость', "1-к квартира", "ййййй", 2000000, []);
enzhe.addNewAd('dress', 'dress', 'dddrrreeesss', 1000, []);

enzhe.addNewAd('auto', 'audi', 'new car', 1500000, []);

console.log(ads.items);

server.get('/items', (req, res) => {
    res.send(ads.items)
});

// server.post('/',(req, res) =>{
//     ads.items.push(req.body);
//
// });

server.listen(7777,()=>{
    console.log('server started')
});