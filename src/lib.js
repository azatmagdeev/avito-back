export class Ad {
    constructor(id, title, category,text, price, seller, photos, date) {
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
        this.itemsNextId = 1;
        this.sellersNextId = 1;
    }

    addNewSeller(name,phone){
        const seller = new Seller(this.sellersNextId++,name,phone);
        this.sellers.push(seller);
        return seller;
    }

    sinhronize(seller) {
        this.items.map((o,index) => {
            if(o.seller === seller){
                this.items.splice(index,1)
            }
        })
    }
}

export const ads = new Ads();

export class Seller {
    constructor(id, name, phone) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.ads = []
    }

    addNewAd(category, title,text, price, photos) {
        const item = new Ad(ads.itemsNextId++, title, category,text, price, this, photos,new Date);
        ads.items.push(item);
        this.ads.push(item);
    }

    removeAd(id) {
        ads.items.find((o, index, arr) => {
            if (o.id === id) {
                arr.splice(index,1);
                ads.items = [...arr]
            }
        });
    }

    deleteAccount(){
        ads.sellers.find((o,index,arr)=>{
            if(o===this){
                arr.splice(index,1);
                ads.sellers = [...arr];
                ads.sinhronize(this)
            }
        });
    }
}