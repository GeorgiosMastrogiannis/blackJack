let suits = ["S", "D", "C", "H"]
let values = ["A", "2", "3", "4", "5","6","7","8","9","10","J","Q","K"]
let worth = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
let deck = []

// create a deck of cards
for (i = 0; i < suits.length; i++) {
    for (x = 0, y=0; x < values.length; x++, y++) {
        let card = { Value: values[x], Suit: suits[i], Worth: worth[y]};
        deck.push(card)
    }
}

//console.log(deck)

//shuffle the deck of cards
for (i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i)
    let temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
}

//console.log(deck)

//used in order to assign two random cards to the player and remove them from the deck
function deal() {
    let cardsArray = []
    let playerCard1 =  deck[Math.floor(Math.random() * deck.length)]
    //get the index of the card dealt:
    let cardIndex = deck.indexOf(playerCard1)
    //remove the dealt card from the deck:
    deck.splice(cardIndex, 1)

    let playerCard2 =  deck[Math.floor(Math.random() * deck.length)]
    cardIndex = deck.indexOf(playerCard2)
    deck.splice(cardIndex, 1)

    cardsArray.push(playerCard1, playerCard2)

    return cardsArray
}

//used in order to assign one random card to the player and remove them from the deck
function dealOneCard() {
    let cardsArray = []
    let playerCard1 =  deck[Math.floor(Math.random() * deck.length)]
    //get the index of the card dealt:
    let cardIndex = deck.indexOf(playerCard1)
    //remove the dealt card from the deck:
    deck.splice(cardIndex, 1)

    cardsArray.push(playerCard1)

    return cardsArray[0]
}

let playerCards = deal()
alert("Your cards are:\n\n" + playerCards[0].Value + playerCards[0].Suit + "\nand\n" + playerCards[1].Value + playerCards[1].Suit)

//playerCards[0].Value = "A"
//playerCards[1].Value = "10"


//check if black Jack meaning A + (10 || J || Q || k) 
if (((playerCards[0].Value == "A") || (playerCards[1].Value) == "A") && 
    ((playerCards[0].Value == "10") || (playerCards[1].Value == "10") || 
    (playerCards[0].Value == "J") || (playerCards[1].Value == "J") || 
    (playerCards[0].Value == "Q") || (playerCards[1].Value == "Q") || 
    (playerCards[0].Value == "K") || (playerCards[1].Value == "K"))) {
    alert("Black jack, you won!")
    location.reload()
} else {
    console.log("no BlackJack")
    let score = playerCards[0].Worth + playerCards[1].Worth
    
    while (score < 21) {
        let hitStand = prompt("Your score is: " + score + "\nWhat would you like to do?\n\nA) hold\nB) hit")
        if ((hitStand === "A") || (hitStand === "hold")) {
            location.reload()
        } else {
            score += dealOneCard().Worth
            if (((playerCards[0].Value == "A") || (playerCards[1].Value == "A")) && score > 21)  {
                score -= 10
            }
            alert("Your new card is: " + playerCards[0].Value + playerCards[0].Suit)
        }
    }
    alert("Busted!")
    location.reload()
}