const products = [
  {
    id: 1,
    name: "Ultimate Pepperoni Pizza",
    image:
      "https://images.unsplash.com/photo-1638425793674-32119fffb3d5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fFVsdGltYXRlJTIwUGVwcGVyb25pJTIwUGl6emF8ZW58MHx8MHx8fDA%3D",
    price: 329,
    description: "Loaded with double pepperoni and extra cheese.",
    rating: 4.5,
    isVeg: false,
    restaurantName: "Pizza Hub",
    deliveryTime: 30,
  },
  {
    id: 2,
    name: "Farmhouse Veggie Pizza",
    image:
      "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8RmFybWhvdXNlJTIwVmVnZ2llJTIwUGl6emF8ZW58MHx8MHx8fDA%3D",
    price: 299,
    description: "Crispy crust topped with fresh veggies and herbs.",
    rating: 4.3,
    isVeg: true,
    restaurantName: "Green Slice",
    deliveryTime: 25,
  },
  {
    id: 3,
    name: "Chicken Tikka Pizza",
    image:
      "https://plus.unsplash.com/premium_photo-1667540791465-35f1b2d9862f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fENoaWNrZW4lMjBUaWtrYSUyMFBpenphfGVufDB8fDB8fHww",
    price: 349,
    description: "Spicy chicken tikka with onions and cheese.",
    rating: 4.6,
    isVeg: false,
    restaurantName: "Spicy Bites",
    deliveryTime: 35,
    discount: 10,
  },
  {
    id: 4,
    name: "Butter Sandwich ",
    image:
      "https://plus.unsplash.com/premium_photo-1701967706191-9aa81b8575a4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8VmVnZ2llJTIwU2FuZHdpY2h8ZW58MHx8MHx8fDA%3D",
    price: 249,
    description: "Juicy grilled patty with fresh veggies & cheese.",
    rating: 4.2,
    isVeg: true,
    restaurantName: "Italian Express",
    deliveryTime: 20,
  },
  {
    id: 5,
    name: "Hawaiian Pizza",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8SGF3YWlpYW4lMjBQaXp6YXxlbnwwfHwwfHx8MA%3D%3D",
    price: 319,
    description: "Juicy pineapple with ham and mozzarella.",
    rating: 4.1,
    isVeg: false,
    restaurantName: "Tropical Pizza",
    deliveryTime: 30,
  },
  {
    id: 6,
    name: "Veg Fry Rice",
    image:
      "https://images.unsplash.com/photo-1664717698774-84f62382613b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VmVnJTIwRnJ5JTIwUmljZXxlbnwwfHwwfHx8MA%3D%3D",
    price: 289,
    description: "Healthy and flavorful rice with veggies .",
    rating: 4.4,
    isVeg: true,
    restaurantName: "Desi Slice",
    deliveryTime: 28,
  },
  {
    id: 7,
    name: "Wow Momo",
    image:
      "https://plus.unsplash.com/premium_photo-1673769108491-e87f4a72eec7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8TW9tb3xlbnwwfHwwfHx8MA%3D%3D",
    price: 339,
    description: "Spicy and crispy momos with meoneese & Tomato Sauce.",
    rating: 4.5,
    isVeg: false,
    restaurantName: "Smoky Oven",
    deliveryTime: 35,
  },
  {
    id: 8,
    name: "Chawmin",
    image:
      "https://images.unsplash.com/photo-1592778024292-d6782d22add7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG5vb2RsZXN8ZW58MHx8MHx8fDA%3D",
    price: 279,
    description: "Juicy chicken with fresh vegetables and cheese.",
    rating: 4.2,
    isVeg: true,
    restaurantName: "Veggie Mania",
    deliveryTime: 22,
  },
  {
    id: 9,
    name: "Sweet Baby Corn",
    image:
      "https://images.unsplash.com/photo-1632992468854-7b1d83134bc4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFieSUyMGNvcm58ZW58MHx8MHx8fDA%3D",
    price: 359,
    description: "Juicy baby corn with fresh tomatoes and onions .",
    rating: 4.6,
    isVeg: true,
    restaurantName: "Cheesy Town",
    deliveryTime: 32,
  },
  {
    id: 10,
    name: "Egg Roll",
    image:
      "https://images.unsplash.com/photo-1559095240-55a16b2dda6a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWdnJTIwcm9sbHxlbnwwfHwwfHx8MA%3D%3D",
    price: 309,
    description: "Spicy Mexican herbs with fresh veggies.",
    rating: 4.3,
    isVeg: true,
    restaurantName: "MexiGo",
    deliveryTime: 27,
  },
  {
    id: 11,
    name: "Hot Wings",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEJpcml5YW5pfGVufDB8fDB8fHww",
    price: 249,
    description: "Juicy wings tossed in fiery hot sauce.",
    rating: 4.4,
    isVeg: false,
    restaurantName: "Wings Station",
    deliveryTime: 20,
  },
  {
    id: 12,
    name: "Cheese Burger",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QlVyZ2VyfGVufDB8fDB8fHww",
    price: 119,
    description: "Crispy garlic Cheese burger served with dip.",
    rating: 4.1,
    isVeg: true,
    restaurantName: "Snack Bites",
    deliveryTime: 15,
  },
  {
    id: 13,
    name: "Hot Coffee",
    image:
      "https://plus.unsplash.com/premium_photo-1672192164411-15349b84bc76?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29mZmllfGVufDB8fDB8fHww",
    price: 289,
    description: "Hot coffee served with ice cream.",
    rating: 4.3,
    isVeg: true,
    restaurantName: "Corny Crust",
    deliveryTime: 26,
  },
  {
    id: 14,
    name: "Spicy Chicken Curry",
    image:
      "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpY2tlbiUyMGN1cnJ5fGVufDB8fDB8fHww",
    price: 349,
    description: "Spicy chicken curry.",
    rating: 4.5,
    isVeg: false,
    restaurantName: "Hot Pepper",
    deliveryTime: 30,
  },
  {
    id: 15,
    name: "Tandoori Paneer ",
    image:
      "https://images.unsplash.com/photo-1690401767645-595de0e0e5f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGFuZWVyfGVufDB8fDB8fHww",
    price: 299,
    description: "Tandoori paneer cubes with onions & capsicum.",
    rating: 4.4,
    isVeg: true,
    restaurantName: "Indian Crust",
    deliveryTime: 25,
  },
  {
    id: 16,
    name: "Chocolate Lava Cake",
    image:
      "https://images.unsplash.com/photo-1626263468007-a9e0cf83f1ac?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNob2NvbGF0ZSUyMGNha2V8ZW58MHx8MHx8fDA%3D",
    price: 129,
    description: "Warm chocolate cake with molten lava inside.",
    rating: 4.7,
    isVeg: true,
    restaurantName: "Sweet Treats",
    deliveryTime: 12,
  },
  {
    id: 17,
    name: "Classic Burger",
    image:
      "https://plus.unsplash.com/premium_photo-1683619761492-639240d29bb5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2xhc3NpYyUyMEJ1cmdlcnxlbnwwfHwwfHx8MA%3D%3D",
    price: 199,
    description: "Juicy grilled patty with fresh veggies & cheese.",
    rating: 4.2,
    isVeg: false,
    restaurantName: "Burger Den",
    deliveryTime: 18,
  },
  {
    id: 18,
    name: "Veggie Sandwich",
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    price: 149,
    description: "Fresh veggies with cheese and herbs.",
    rating: 4.1,
    isVeg: true,
    restaurantName: "Snack House",
    deliveryTime: 15,
  },
  {
    id: 19,
    name: "Pasta Alfredo",
    image:
      "https://plus.unsplash.com/premium_photo-1677706562692-6c4e44434420?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8UGFzdGElMjBBbGZyZWRvfGVufDB8fDB8fHww",
    price: 229,
    description: "Creamy white sauce pasta with mushrooms.",
    rating: 4.3,
    isVeg: true,
    restaurantName: "Pasta Point",
    deliveryTime: 22,
  },
  {
    id: 20,
    name: "Butter Chicken Biryani",
    image:
      "https://plus.unsplash.com/premium_photo-1694141252883-39e9cfd511b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2hpY2tlbiUyMEJpcnlhbmklMjIlMkN8ZW58MHx8MHx8fDA%3D",
    price: 299,
    description: "Classic butter chicken layered with biryani rice.",
    rating: 4.6,
    isVeg: false,
    restaurantName: "Biryani Express",
    deliveryTime: 30,
  },
];

export default products;
