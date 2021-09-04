import { Deck } from "./model/Deck";

const deck = new Deck("brackjack")
console.log(deck.drawOne())
console.log(deck.drawOne())
console.log(deck.drawOne())
console.log(deck.drawOne())
console.log(deck.drawOne())
deck.shuffle()
deck.shuffle()
