export let itemsNextId = 1;

export class Ad {
    constructor(id, brand,model, year, km, gearbox, text, price, sellerId, photos, date) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.year =year;
        this.km = km;
        this.gearbox = gearbox;
        this.text = text;
        this.price = price;
        this.sellerId = sellerId;
        this.photos = photos;
        this.date = date;
    }
}

export class Ads {
    constructor() {
        this.items = [];
        this.sellers = [];
        this.sellersNextId = 1;
    }

    addNewSeller(name,phoneNumber){
        const seller = new Seller(this.sellersNextId++,name,phoneNumber);
        this.sellers.push(seller);
        return seller;
    }

    getAllItems(){
        this.items =[];
        this.sellers.map(seller =>{
            seller.items.map(ad => {
                this.items.push(ad)
            })
        });
        return this.items;
    }


}

export class Seller {
    constructor(id,name,phoneNumber){
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.items = [];
    }

    addNewAd(brand, model, year, km, gearbox, text, price, photos) {
        this.items.push(new Ad(
            itemsNextId++,
            brand,
            model,
            year,
            km,
            gearbox,
            text,
            price,
            this.id,
            photos,
            new Date()
        ))
    }
}
