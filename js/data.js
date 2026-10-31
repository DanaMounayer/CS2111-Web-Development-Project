/*
  On The Go · all site content.
  A menu item can have: name, desc, price (SAR), isNew.
*/

window.CATEGORIES = {
  "fast-food": { name: "Fast food", blurb: "Quick bites that satisfy your cravings without slowing you down." },
  "drinks-desserts": { name: "Drinks & desserts", blurb: "Refreshing drinks and sweet treats, ready at the window." }
};

window.RESTAURANTS = [
  {
    id: "sign-burger", name: "Sign Burger", category: "fast-food", rating: 4.7,
    image: "images/restaurants/sign-burger.webp",
    tagline: "Smash-style burgers and the famous Gathering Box.",
    menu: [
      { name: "Sign Beef Meal", desc: "Juicy beef patty, lettuce, tomato, onion", price: 24 },
      { name: "Sign Chicken Meal", desc: "Classic burger with melted cheddar cheese", price: 24 },
      { name: "Gathering Box", desc: "4 burgers with fries", price: 88 },
      { name: "Gathering Box", desc: "6 burgers with fries", price: 132 },
      { name: "Sign Fries", price: 6 }
    ]
  },
  {
    id: "tikka-way", name: "Tikka Way", category: "fast-food", rating: 3.8,
    image: "images/restaurants/tikka-way.webp",
    tagline: "Tikka bowls made for eating on the move.",
    menu: []
  },
  {
    id: "al-baik", name: "Al-Baik", category: "fast-food", rating: 5.0,
    image: "images/restaurants/al-baik.webp",
    tagline: "Jeddah's favourite fried chicken, nuggets and shrimp.",
    menu: [
      { name: "7 pcs Nuggets", price: 13.5 },
      { name: "10 pcs Nuggets", price: 17 },
      { name: "Fish Fillet Sandwich", price: 7.5 },
      { name: "Chicken Fillet Sandwich", price: 6.5 },
      { name: "Double BAIK", price: 7.5 },
      { name: "Super Baik Shrimp", price: 19 },
      { name: "Super Baik Grilled Chicken", price: 13.5, isNew: true },
      { name: "Shawerma Sandwich", price: 5 },
      { name: "BBQ Baik", desc: "Chicken with BBQ sauce and double cheese", price: 8.5 },
      { name: "ALBAIK chips", desc: "Crunchy potato chips", price: 4 },
      { name: "Coleslaw Salad", price: 4 }
    ]
  },
  {
    id: "tndr", name: "TNDR", category: "fast-food", rating: 4.5,
    image: "images/restaurants/tndr.webp",
    tagline: "Crispy tenders, wraps and the TNDR Bucket.",
    menu: []
  },
  {
    id: "bunbastic-burger", name: "Bunbastic Burger", category: "fast-food", rating: 4.3,
    image: "images/restaurants/bunbastic-burger.webp",
    tagline: "Loaded fries and burgers piled high.",
    menu: []
  },
  {
    id: "row", name: "ROW", category: "drinks-desserts", rating: 5.0,
    image: "images/restaurants/row.webp",
    tagline: "French toast, bites and Spanish latte.",
    menu: [
      { name: "Brownies Bites", price: 10 },
      { name: "Crunchy Bites", price: 5 },
      { name: "Spanish Latte", price: 18 },
      { name: "Caramel French Toast", price: 24 }
    ]
  },
  {
    id: "sculpture", name: "Sculpture", category: "drinks-desserts", rating: 4.0,
    image: "images/restaurants/sculpture.webp",
    tagline: "Signature lattes and French toast.",
    menu: [
      { name: "Sculpture 1", desc: "Lavender", price: 27 },
      { name: "Sculpture 2", desc: "Pistachio", price: 28 },
      { name: "Sculpture 3", desc: "Salted caramel", price: 28 },
      { name: "Sculpture 4", desc: "Spanish latte", price: 27 },
      { name: "Iced Latte", price: 20 },
      { name: "Kunafa French Toast", price: 35 },
      { name: "Nutella French Toast", price: 30 },
      { name: "Caramel French Toast", price: 30 },
      { name: "Lotus French Toast", price: 30 }
    ]
  },
  {
    id: "8oz", name: "8Oz", category: "drinks-desserts", rating: 3.9,
    image: "images/restaurants/8oz.webp",
    tagline: "Coffee, churros and baked treats.",
    menu: [
      { name: "Chocolate Babka", price: 19, isNew: true },
      { name: "Crunchy Chocolate Cookies", price: 17, isNew: true }
    ]
  }
];

/* "Renowned specialties" from the home page. */
window.SPECIALTIES = [
  { name: "Chocolate pudding", place: "8Oz Coffee", image: "images/specialties/chocolate-pudding.webp" },
  { name: "Ice shakerato", place: "Caffeine Lab", image: "images/specialties/ice-shakerato.webp" },
  { name: "Tuna spicy sandwich", place: "Joe & The Juice", image: "images/specialties/tuna-spicy-sandwich.webp" },
  { name: "TNDR Bucket", place: "TNDR", image: "images/specialties/tndr-bucket.webp" },
  { name: "Iced hibiscus", place: "", image: "images/specialties/iced-hibiscus.webp" },
  { name: "Sign Gathering Box", place: "Sign Burger", image: "images/specialties/sign-gathering-box.webp" }
];

/* Reviews. Visitors' own reviews are saved in their browser. */
window.REVIEWS = [
  { name: "Dana Mounayer", restaurant: "sign-burger", stars: 5, text: "The burgers at Sign Burger are simply amazing! I keep coming back for more!" },
  { name: "Tala Zoabi", restaurant: "al-baik", stars: 5, text: "Albaik's chicken meal is the best I've ever had! Worth every SAR!" },
  { name: "Judy Imam", restaurant: "tndr", stars: 5, text: "TNDR is delicious and loaded with toppings! Highly recommended!" }
];
