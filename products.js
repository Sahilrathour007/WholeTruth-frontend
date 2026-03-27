// ─────────────────────────────────────
//  THE WHOLE TRUTH — PRODUCT CATALOG
// ─────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "Peanut Butter Protein Bar",
    subtitle: "20g protein · No added sugar",
    emoji: "🥜",
    price: 99,
    badge: "Bestseller",
    macros: { protein: "20g", carbs: "22g", fat: "11g", calories: "241 kcal" },
    description: "Our most loved bar. Real peanuts, whey protein, and absolutely nothing you'd need to hide. Chewy, satisfying, and honest all the way through.",
    ingredients: ["Peanuts", "Whey Protein Isolate", "Oats", "Dates", "Rice Crisps", "Himalayan Salt"],
    benefits: ["High in protein", "No added sugar", "Gluten-free oats", "Non-GMO"]
  },
  {
    id: 2,
    name: "Dark Chocolate Protein Bar",
    subtitle: "20g protein · 70% dark cacao",
    emoji: "🍫",
    price: 109,
    badge: "New",
    macros: { protein: "20g", carbs: "20g", fat: "13g", calories: "249 kcal" },
    description: "For people who refuse to compromise. Real dark chocolate, no compound coating, no shortcuts. Just rich, honest indulgence with a clean conscience.",
    ingredients: ["Dark Chocolate (70%)", "Whey Protein Isolate", "Almonds", "Dates", "Cocoa Butter", "Himalayan Salt"],
    benefits: ["Antioxidant-rich", "No compound chocolate", "High protein", "Zero added sugar"]
  },
  {
    id: 3,
    name: "Almond Fudge Protein Bar",
    subtitle: "18g protein · Real almonds",
    emoji: "🌰",
    price: 109,
    badge: null,
    macros: { protein: "18g", carbs: "23g", fat: "10g", calories: "238 kcal" },
    description: "Toasted almonds, soft fudge texture, clean ingredients. Every bite tastes like we made it in your kitchen — because we basically did.",
    ingredients: ["Almonds", "Whey Protein Isolate", "Dates", "Oats", "Almond Butter", "Himalayan Salt"],
    benefits: ["Rich in Vitamin E", "Natural crunch", "High satiety", "No binders"]
  },
  {
    id: 4,
    name: "Vanilla Almond Protein Bar",
    subtitle: "19g protein · Natural vanilla",
    emoji: "🍦",
    price: 99,
    badge: null,
    macros: { protein: "19g", carbs: "21g", fat: "9g", calories: "235 kcal" },
    description: "Real vanilla bean extract. Whole almonds. Clean whey. If you love vanilla ice cream but hate the 47 ingredients that come with it, this one's for you.",
    ingredients: ["Almonds", "Whey Protein Isolate", "Dates", "Oats", "Natural Vanilla Extract", "Sunflower Oil"],
    benefits: ["Natural vanilla extract", "No artificial flavours", "High protein", "Low sugar"]
  },
  {
    id: 5,
    name: "Choco Almond Protein Granola",
    subtitle: "12g protein per serving · Crunchy",
    emoji: "🥣",
    price: 299,
    badge: "Value Pack",
    macros: { protein: "12g", carbs: "38g", fat: "14g", calories: "320 kcal" },
    description: "Granola that actually deserves to be called healthy. Crunchy clusters of oats, nuts, and real cacao. No refined sugar, no vegetable oil, no deception.",
    ingredients: ["Rolled Oats", "Almonds", "Dark Chocolate Chips", "Coconut Oil", "Honey", "Whey Protein"],
    benefits: ["High fibre", "No refined sugar", "Made with coconut oil", "Protein-packed clusters"]
  },
  {
    id: 6,
    name: "Peanut Butter Protein Spread",
    subtitle: "25g protein per 100g · Nothing else",
    emoji: "🫙",
    price: 349,
    badge: null,
    macros: { protein: "25g", carbs: "15g", fat: "30g", calories: "428 kcal" },
    description: "Peanuts. Whey protein. Salt. That's it. No palm oil, no sugar, no emulsifiers. Spread it, eat it off the spoon — just don't expect us to apologise for making it this simple.",
    ingredients: ["Dry Roasted Peanuts", "Whey Protein Isolate", "Himalayan Salt"],
    benefits: ["Only 3 ingredients", "Palm oil-free", "No emulsifiers", "High in healthy fats"]
  },
  {
    id: 7,
    name: "Choco Fudge Protein Cookie",
    subtitle: "15g protein · Soft baked",
    emoji: "🍪",
    price: 79,
    badge: "Fan Favourite",
    macros: { protein: "15g", carbs: "28g", fat: "10g", calories: "248 kcal" },
    description: "Soft. Fudgy. Real. A cookie you can eat without reading the label twice. Because the label is clean, and we want you to know that.",
    ingredients: ["Oat Flour", "Dark Chocolate Chips", "Whey Protein", "Dates", "Almond Butter", "Baking Soda"],
    benefits: ["Soft-baked texture", "No maida", "No refined sugar", "Real chocolate chips"]
  },
  {
    id: 8,
    name: "Mango Coconut Protein Bar",
    subtitle: "18g protein · Tropical",
    emoji: "🥭",
    price: 99,
    badge: "Seasonal",
    macros: { protein: "18g", carbs: "26g", fat: "8g", calories: "244 kcal" },
    description: "Summer in a bar. Dried mango, toasted coconut, and clean protein — all in one honest package. No artificial mango essence. Just actual mango.",
    ingredients: ["Dried Mango", "Desiccated Coconut", "Whey Protein Isolate", "Oats", "Dates", "Coconut Oil"],
    benefits: ["Natural tropical flavour", "Vitamin C source", "No artificial essence", "Light & refreshing"]
  }
];
