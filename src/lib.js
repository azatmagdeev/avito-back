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
        // this.sellers = [];
        this.itemsNextId = 1;
        // this.sellersNextId = 1;
    }

    addNewAd(title,category,text,price,seller,photos) {
        this.items.push(new Ad(this.itemsNextId++, title, category, text, price, seller, photos, new Date))
    }
}

// export const ads = new Ads();
