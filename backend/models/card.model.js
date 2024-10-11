import mongoose from "mongoose";

const PokemonCardSchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true 
}, 
  name: { 
    type: String, 
    required: true 
}, 
  supertype: String,
  subtypes: [String],
  hp: String,
  types: [String],
  evolvesTo: [String],
  rules: [String],
  attacks: [
    {
      name: String,
      cost: [String],
      convertedEnergyCost: Number,
      damage: String,
      text: String,
    }
  ],
  weaknesses: [
    {
      type: String,
      value: String,
    }
  ],
  retreatCost: [String],
  convertedRetreatCost: Number,
  set: {
    id: String,
    name: String,
    series: String,
    printedTotal: Number,
    total: Number,
    legalities: {
        unlimited: String,
        expanded: String,
    },
    ptcgoCode: String,
    releaseDate: String,
    updatedAt: String,
    images: {
      symbol: String,
      logo: String,
    }
  },
  number: String,
  artist: String,
  rarity: String,
  nationalPokedexNumbers: [Number],
  legalities: {
      unlimited: String,
      expanded: String
    },
  images: {
    small: String,
    large: String,
  },
  tcgplayer: {
    url: String,
    updatedAt: String,
    prices: {
      holofoil: {
        low: Number,
        mid: Number,
        high: Number,
        market: Number,
        directLow: Number,
      }
    }
  }
});

const PokemonCard = mongoose.model('PokemonCard', PokemonCardSchema);

export default PokemonCard;
