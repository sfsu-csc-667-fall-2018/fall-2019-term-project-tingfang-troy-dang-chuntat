var db = require('../../db');

module.exports = Game = function(){
    // this.smallBlind = smallBlind;
    // this.bigBlind = bigBlind;
    // this.pot = 0;
    // this.roundName = 'Deal'; //Start the first round
    // this.betName = 'bet'; //bet,raise,re-raise,cap
    // this.bets = [];
    // this.roundBets = [];
    this.deck = [];
    // this.board = [];
    fillDeck(this.deck);
    console.log("AAAA" , this.deck);
}

function deckIntialize() {
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('club','3')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('spade','3')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('heart','3')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('diamond','3')`)

//     db.any(`INSERT INTO deck ("suit","title") VALUES ('club','4')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('spade','4')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('heart','4')`)
//    db.any(`INSERT INTO deck ("suit","title") VALUES ('diamond','4')`)  

//     db.any(`INSERT INTO deck ("suit","title") VALUES ('club','5')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('spade','5')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('heart','5')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('diamond','5')`)

//     db.any(`INSERT INTO deck ("suit","title") VALUES ('club','6')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('spade','6')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('heart','6')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('diamond','6')`)  

//     db.any(`INSERT INTO deck ("suit","title") VALUES ('club','7')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('spade','7')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('heart','7')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('diamond','7')`)  
    
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('club','8')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('spade','8')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('heart','8')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('diamond','8')`)

//     db.any(`INSERT INTO deck ("suit","title") VALUES ('club','9')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('spade','9')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('heart','9')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('diamond','9')`) 
    
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('club','J')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('spade','J')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('heart','J')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('diamond','J')`)  
    
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('club','Q')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('spade','Q')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('heart','Q')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('diamond','Q')`)  

//     db.any(`INSERT INTO deck ("suit","title") VALUES ('club','K')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('spade','K')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('heart','K')`)
//     db.any(`INSERT INTO deck ("suit","title") VALUES ('diamond','K')`)    

    // db.any(`INSERT INTO deck ("suit","title") VALUES ('club','A')`)
    // db.any(`INSERT INTO deck ("suit","title") VALUES ('spade','A')`)
    // db.any(`INSERT INTO deck ("suit","title") VALUES ('heart','A')`)
    // db.any(`INSERT INTO deck ("suit","title") VALUES ('diamond','A')`)
    
    // db.any(`INSERT INTO deck ("suit","title") VALUES ('club','2')`)
    // db.any(`INSERT INTO deck ("suit","title") VALUES ('spade','2')`)
    // db.any(`INSERT INTO deck ("suit","title") VALUES ('heart','2')`)
    // db.any(`INSERT INTO deck ("suit","title") VALUES ('diamond','2')`)  
    // .catch (
    //     error => {console.log(error)}
  
    // )
}

deckIntialize();

fillDeck = (deck) => {
    var deck = [];
    db.any(`SELECT * FROM deck`)  
    .then ( result => {
        // console.log("bbbb" ,result );
    deck = result;
        for ( let i = 0 ; i < deck.length; i++ ) {

        }
        var i, j, tempi, tempj;
        for(i=0;i< deck.length;i+=1){
            j = Math.floor(Math.random() * (i + 1));
            tempi = deck[i];
            tempj = deck[j];
            deck[i] = tempj;
            deck[j] = tempi;
        }
        
    } )
    .catch (
        error => {console.log(error)}
  
    )


};

