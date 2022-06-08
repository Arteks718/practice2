var app = new Vue({
    el: '.items, .item, .contactUs',
    data: {
        products:[
            {id:1, title:"Golden apple", short_text:"Variety of yellow apples, one of the symbols of West Virginia. Not related to Red Delicious.", image:"goldenApple.png", desc:"The fruits are large, with a yellowish-green skin, have a sweet taste. They are prone to wrinkling and deformation when dropped, so special care is required when collecting and storing them."},
            {id:2, title:"Gala", short_text:"A cultivar of apple with a mild and sweet flavor and a striped or mottled appearance.", image:"appleGala.jpg", desc:"The variety works well in podzimny and super-early sowing under film, to obtain marketable bundles. Beetroot is round, beautiful, with elastic skin, weighs 150-370 g."},
            {id:3, title:"Black Prince", short_text:"The Black Prince apple tree belongs to varieties that ripen in autumn.", image:"blackPrince.jpg", desc:"Sprouts initially grow rapidly. Before the appearance of the first fruits (3-4 years of life), the crown has time to stretch 5 m. in height. After that, the development of the tree gradually stops."},
            {id:4, title:"Fuji apples", short_text:"Fuji apples are usually round and range in size from large to very large, averaging 75 mm in diameter.", image:"appleFudgy.jpg", desc:"They contain 9 to 11% sugar by weight and have firm flesh that tastes sweeter and crunchier than many other apple varieties, making them popular with consumers around the world."},
            {id:5, title:"Caramel", short_text:"Apples are slightly smaller, and their maximum weight does not exceed 120 -130 grams.", image:"karamelka.jpg", desc:"Root crops in Podzimnya look almost the same as in Odnorostkovaya - the most common, with dark red flesh without rings. In good conditions and with proper care, the yield of this variety can reach 6.5 kg / m2, although, I must say, it fluctuates very much, and for many reasons."}
        ],
        product:[],
        cart:[],
        cartIds:[],
        contactFields:[],
        btnVisible: 0,
        orderVisible: 0
    },
    mounted:function() {
        this.getProducts();
        this.checkInCart();
        this.getCart();
        console.log(this.cartIds);
        console.log(this.contactFields);
    },
    methods: {
        addItem:function(id){
            window.localStorage.setItem('prod',id)
        },
        getProducts:function(){
            if(window.location.hash) {
                var id = window.location.hash.replace('#','');
                if(this.products && this.products) {
                   for(i in this.products) {
                       if(this.products[i] && this.products[i].id && id==this.products[i].id) this.product=this.products[i];
                   } 
                }
            }
        },
        addToCart:function(id) {
            var cart = [];
            if(window.localStorage.getItem('cart')) {
                cart = window.localStorage.getItem('cart').split(',');
            }
            if(cart.indexOf(String(id))==-1) {
                cart.push(id);
                window.localStorage.setItem('cart', cart.join());
                this.btnVisible=1;
            }
        },
        checkInCart:function() {
            if(this.product && this.product.id && window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id)) !=-1 ) this.btnVisible=1;
        },
        getCart:function() {
            for(i in localStorage.getItem('cart')) {
                for(p in this.products) {
                    if(this.products[p].id == localStorage.getItem('cart').split(',')[i]) {
                       this.cart.push(this.products[p]);
                       this.cartIds.push(this.products[p].id);
                    }
                }
            }
        },
        removeFromCart:function(id) {
            for(i in this.cart) {
                if(this.cart[i].id == id) {
                    this.cart.splice(i, 1);
                    this.cartIds.splice(i, 1);
                    window.localStorage.setItem('cart', this.cartIds.join());
                }
            }
        },
        makeOrder:function() {
            this.orderVisible = 1;
            this.cart = [];
            this.cartIds = [];
            window.localStorage.removeItem('cart');
        }
    }
});
