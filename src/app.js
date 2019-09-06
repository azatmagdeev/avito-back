import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs-extra';
import multer from 'multer';
import uuid from 'uuid';
import path from 'path';
import {Ads} from "./lib";

const server = express();
server.use(cors());
server.use(bodyParser.json({limit:"50mb"}));

const publicPath = path.resolve(__dirname, 'public');
fs.ensureDirSync(publicPath);
server.use('/images', express.static(publicPath));
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, publicPath);
    },
    filename(req, file, callback) {
        const name = uuid.v4();
        let fullName = '';
        if (file.mimetype === 'image/png') {
            fullName = `${name}.png`;
        } else if (file.mimetype === 'image/jpeg') {
            fullName = `${name}.jpg`;
        } else {
            callback(new Error('invalid file'));
            return;
        }
        callback(null, fullName);
    }
});

const imageUpload = multer({storage}).single('image');
server.post('/upload', (req, res) => {
    imageUpload(req, res, err => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send({filename: req.file.filename});
        console.log(res)
    })
});

const ads = new Ads;
const azat = ads.addNewSeller('Azat', '+79600440765', 'azat@ya.ru', '2244');

azat.addNewAd('Chevrolet',
    'Lacetti',
    2008,
    180500,
    'manual',
    'Продаю свой личный автомобиль.\n' +
    'По внешним признакам имеются небольшие косяки, но ничего фатального, машина корейской сборки! Ни каких подтеков , затеков и синяков нету . В заводской краске, ни один агрегат демонтажу не подвергался. Подвеска вся в идеале, которая была обслужена 2 месяца назад. Комплектация хорошая: электро зеркала с обогревом, 4 стеклоподъемника, кондиционер в отличном состоянии, обслужен, фрион не утекает, заправлял этим летом. \n' +
    'Двигатель и коробка в отличном состоянии , масло в двигателе только GM синтетика оригинал, замена каждые 7 т.км\n' +
    'Дополнения к машине. Диски лето R 16 с хорошей спортивной резиной Dunpol. Откатали один сезон. Зима 15 штампы. С хорошим протектором , им 2 ой сезон. \n' +
    'Приборка с плавным розжигом и красивой подсветкой. Пневмо гудок, а так же хорошая Музыка. На счёт неё разговор отдельный.\n' +
    'Я собственник , Авто вложений не требует, торг минимальный, только при осмотре и аргументированный! \n' +
    'В поддержке Авто экспертов не нуждаюсь.',
    279000,
    [
        'img/autos/lacetti/1.jpg',
        'img/autos/lacetti/2.jpg',
        'img/autos/lacetti/3.jpg',
    ]);

azat.addNewAd('Kia',
    'Rio',
    2017,
    83.400,
    'auto',
    `комплектация:Comfort Audio + Зимний пакет , кузов рестайлинг! Кондиционер, усилитель руля, стеклоподъемники , обогрев рулевого колеса , лобового стекла в зоне
покоя дворников, передних сидений, боковых зеркал с регулировкой, полноценная автоматическая коробка передач. Штатная Магнитола с usb, aux выходами, многофункциональный
руль в кожаной оплётке.Регулировка сидений, руля, и зеркал, набор ковров в салон, 2 ключа. По кузову без аварий,
 салон чистый не прокуренный. Возможна  продажа в АВТОКРЕДИТ, или потреб.Кредит через Сбербанк Онлайн.
  Юридически чистый , без запретов , штрафов, и залогов !`,
    550000,
    [
        'img/autos/rio/1.jpg',
        'img/autos/rio/2.jpg',
        'img/autos/rio/3.jpg'
    ],
)
;

const enzhe = ads.addNewSeller('Энже', '+79172201438', 'enzhe@ya.ru', '0711');
enzhe.addNewAd(
    'Chevrolet',
    'Aveo',
    2011,
    144000,
    'manual',
    `Один единственный собственник
Базовая комплектация
Без коррозии и дефектов
Зимняя резина в комплекте`,
    233000,
    [
        'img/autos/aveo/1.jpg',
        'img/autos/aveo/2.jpg',
        'img/autos/aveo/3.jpg'
    ]);

enzhe.addNewAd(
    'Renault',
    'Logan',
    2011,
    175000,
    'manual',
    `Продаю Рено Логан 1.4.
В хорошем состоянии. Комплектация базовая. Сигнализация с автозапуском.
Кнопка старт-стоп. Сделана хорошая шумоизоляция. Есть зимняя резина. 
Салон в отличном состоянии. Машина покрашена полностью предыдущим хозяином, 
поэтому цена ниже рыночной.`,
    160000,
    [
        'img/autos/logan/1.jpg',
        'img/autos/logan/2.jpg'
    ]
);

ads.addNewSeller('Айдар', '+79600458174', 'aidar@ya.ru', '0307');


// console.log(ads);

server.get('/', (req, res) => {
    ads.getAllItems();
    res.send(ads.items)
});

server.get('/sellers', (req, res) => {
    res.send(ads.sellers)
});

server.post('/sellers', (req, res) => {
    // const data = req.body;
    const seller = ads.addNewSeller(req.body.name, req.body.phoneNumber,
        req.body.email, req.body.password);
    console.log(ads.sellers);
    res.send({
        name: seller.name,
        phoneNumber: seller.phoneNumber
    })
});

server.post('/authorization', (req, res) => {
    const {email, password} = req.body;
    const arr = ads.sellers.filter(o => o.email === email);
    if (arr.length === 0) {
        res.send({id: null, response: 'Пользователь с таким e-mail не зарегистрирован.'});
        return
    }

    if (arr[0].password === password) {
        res.send({id: arr[0].id, name: arr[0].name, phoneNumber: arr[0].phoneNumber});
        return
    }

    if (arr[0].password !== password) {
        res.send({id: null, response: 'Неверный пароль.'})
    }
});

server.post('/', (req, res) => {
    const seller = ads.sellers.filter(o => o.id === req.body.sellerId)[0];
    const item = seller.addNewAd(
        req.body.brand, req.body.model, req.body.year, req.body.km,
        req.body.gearbox, req.body.text, req.body.price, req.body.photos
    );
    res.send(item)
});


const port = process.env.PORT || 7777;

server.listen(port, () => {
    console.log('server started')
});