import jet1 from "../assets/jet-1.jpg";
import jet2 from "../assets/jet-2.jpg";
import jet3 from "../assets/hero-jet.jpg";

export const jets = [
  {
    id: 1,
    name: "Bombardier Global 7500",
    category: "Ultra-Long-Range",
    owner: "EliteJet",
    seats: 17,
    speed: 516,
    range: "7,700 nm",
    price: 11800,
    image: jet1,
    description:
      "A long-range luxury aircraft designed for intercontinental travel with premium comfort and advanced cabin technology.",
  },
  {
    id: 2,
    name: "Gulfstream G700",
    category: "Ultra-Long-Range",
    owner: "EliteJet",
    seats: 19,
    speed: 516,
    range: "7,500 nm",
    price: 12500,
    image: jet2,
    description:
      "A flagship private jet offering exceptional range, speed, and a spacious cabin for executive travel.",
  },
  {
    id: 3,
    name: "Embraer Phenom 300E",
    category: "Light",
    owner: "EliteJet",
    seats: 9,
    speed: 453,
    range: "2,010 nm",
    price: 2800,
    image: jet3,
    description:
      "A fast and efficient light jet suitable for short business trips and private regional flights.",
  },
];