import productsData from "@/temp/products.json";

export const COLOR_CODES = {
  BLACK: "#000000",
  WHITE: "#FFFFFF",
  OFF_WHITE: "#FAF9F6",
  CREAM: "#FFFDD0",
  BEIGE: "#F5F5DC",
  TAN: "#D2B48C",
  BROWN: "#8B4513",
  CHOCOLATE: "#7B3F00",
  GREY: "#808080",
  CHARCOAL: "#36454F",
  SILVER: "#C0C0C0",
  RED: "#FF0000",
  MAROON: "#800000",
  BURGUNDY: "#800020",
  CORAL: "#FF7F50",
  ORANGE: "#FFA500",
  MUSTARD: "#FFDB58",
  GREEN: "#008000",
  OLIVE: "#808000",
  LIME: "#00FF00",
  MINT: "#98FF98",
  SAGE: "#B2AC88",
  TEAL: "#008080",
  BLUE: "#0000FF",
  NAVY: "#000080",
  SKY_BLUE: "#87CEEB",
  ROYAL_BLUE: "#4169E1",
  CYAN: "#00FFFF",
  TURQUOISE: "#40E0D0",
  PURPLE: "#800080",
  LAVENDER: "#E6E6FA",
  VIOLET: "#8F00FF",
  PINK: "#FFC0CB",
  HOT_PINK: "#FF69B4",
  MAGENTA: "#FF00FF",
  YELLOW: "#FFFF00",
  GOLD: "#FFD700",
} as const;

export type ColorName = keyof typeof COLOR_CODES;

export const getProduct = (slug: string) => {
  return productsData.find((product) => product.slug === slug);
};
