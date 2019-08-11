export let itemsNextId = 1;

export class Ad {
    constructor(id, title, category, text, price, seller, photos, date) {
        this.id = id;
        this.date = date;
        this.title = title;
        this.category = category;
        this.price = price;
        this.seller = seller;
        this.photos = photos;
        this.text = text;
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

    addNewAd(title, category, text, price, photos) {
        this.items.push(new Ad(itemsNextId++, title, category, text, price, this.id, photos, new Date))
    }
}
