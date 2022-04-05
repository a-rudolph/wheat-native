type RecipeType = {
  name: string;
  key: string;
  bulk: number;
  proof: number;
  start: number;
  btf: Btf;

  ingredients: IngredientType[];
};

type Btf = "overnight" | "samedayer";

type IngredientType = {
  quantity: number;
  unit: string;
  name: string;
  extra?: string;
};

export const recipes: RecipeType[] = [
  {
    name: "Saturday white bread",
    key: "saturday-white-bread",
    btf: "samedayer",
    bulk: 5,
    proof: 1.25,
    start: 8,
    ingredients: [
      {
        quantity: 1000,
        unit: "g",
        name: "white flour",
      },
      {
        quantity: 720,
        unit: "g",
        name: "water",
        extra: "90ºF - 95ºF",
      },
      {
        quantity: 21,
        unit: "g",
        name: "fine salt",
      },
      {
        quantity: 4,
        unit: "g",
        name: "yeast",
      },
    ],
  },
  {
    name: "Overnight white bread",
    key: "overnight-white-bread",
    btf: "overnight",
    bulk: 13,
    proof: 1.25,
    start: 19,
    ingredients: [
      {
        quantity: 1000,
        unit: "g",
        name: "white flour",
      },
      {
        quantity: 780,
        unit: "g",
        name: "water",
        extra: "90ºF - 95ºF",
      },
      {
        quantity: 22,
        unit: "g",
        name: "fine salt",
      },
      {
        quantity: 0.8,
        unit: "g",
        name: "yeast",
      },
    ],
  },
  {
    name: "Overnight whole wheat",
    key: "overnight-whole-wheat",
    btf: "overnight",
    bulk: 5,
    proof: 13,
    start: 15,
    ingredients: [
      {
        quantity: 600,
        unit: "g",
        name: "white flour",
      },
      {
        quantity: 400,
        unit: "g",
        name: "whole wheat flour",
      },
      {
        quantity: 800,
        unit: "g",
        name: "water",
        extra: "90ºF - 95ºF",
      },

      {
        quantity: 22,
        unit: "g",
        name: "fine salt",
      },
      {
        quantity: 3,
        unit: "g",
        name: "yeast",
      },
    ],
  },
];
