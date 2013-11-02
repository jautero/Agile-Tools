var Decks={
    reaktor: {
        back: "",
        cards: [" ","0","\u00BD","1","2","3","5","8","13","20","40","100","?","\u2615"]
    }
}

function VirtualPlanningPokerDeck(deck){
    this.setupDeck=function(deckdata) {
        this.back=deckdata.back;
        this.cards=deckdata.cards;
    }
    if (typeof deck == "string") {
        if (deck in Decks) {
            this.setupDeck(Decks[deck]);
        }
    } else {
        this.setupDeck(deck);
    }
};