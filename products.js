// ─────────────────────────────────────
//  THE WHOLE TRUTH — PRODUCT CATALOG
// ─────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "Whey Protein",
    subtitle: "25g protein per scoop · No artificial sweeteners",
    emoji: "💪",
    price: 1999,
    badge: "Bestseller",
    macros: { protein: "25g", carbs: "4g", fat: "2g", calories: "132 kcal" },
    description: "No proprietary blends. No amino spiking. No mysterious 'protein matrix'. Just clean whey protein isolate with real ingredients — exactly what your body needs, nothing it doesn't.",
    ingredients: ["Whey Protein Isolate", "Cocoa Powder (chocolate variant)", "Natural Flavours", "Stevia", "Sunflower Lecithin", "Himalayan Salt"],
    benefits: ["25g protein per scoop", "No artificial sweeteners", "Low carb", "Easily digestible isolate"]
  },
  {
    id: 2,
    name: "Protein Bar",
    subtitle: "20g protein · No added sugar",
    emoji: "🥜",
    price: 99,
    badge: "Fan Favourite",
    macros: { protein: "20g", carbs: "22g", fat: "11g", calories: "241 kcal" },
    description: "Real peanuts, whey protein, and absolutely nothing you'd need to hide. Chewy, satisfying, and honest all the way through. Read the label — go on, we dare you.",
    ingredients: ["Peanuts", "Whey Protein Isolate", "Oats", "Dates", "Rice Crisps", "Himalayan Salt"],
    benefits: ["High in protein", "No added sugar", "Gluten-free oats", "Non-GMO"]
  },
  {
    id: 3,
    name: "Peanut Butter",
    subtitle: "25g protein per 100g · Just 3 ingredients",
    emoji: "🫙",
    price: 349,
    badge: null,
    macros: { protein: "25g", carbs: "15g", fat: "30g", calories: "428 kcal" },
    description: "Peanuts. Whey protein. Salt. That's it. No palm oil, no sugar, no emulsifiers. Spread it, eat it off the spoon — just don't expect us to apologise for making it this simple.",
    ingredients: ["Dry Roasted Peanuts", "Whey Protein Isolate", "Himalayan Salt"],
    benefits: ["Only 3 ingredients", "Palm oil-free", "No emulsifiers", "High in healthy fats"]
  },
  {
    id: 4,
    name: "Muesli",
    subtitle: "8g protein per serving · High fibre",
    emoji: "🥣",
    price: 399,
    badge: "New",
    macros: { protein: "8g", carbs: "42g", fat: "9g", calories: "278 kcal" },
    description: "No sugar-coated clusters, no mystery dried fruits, no vegetable oil. Just whole rolled oats, real nuts, seeds, and naturally dried fruit — the way muesli was always supposed to be.",
    ingredients: ["Rolled Oats", "Almonds", "Walnuts", "Sunflower Seeds", "Pumpkin Seeds", "Dried Cranberries", "Dried Apricots", "Flaxseeds"],
    benefits: ["High in fibre", "No added sugar", "Rich in omega-3", "Real whole nuts & seeds"]
  }
];
