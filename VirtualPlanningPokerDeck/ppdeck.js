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
    };
    this.Draw=function() {
        var cardFront=document.getElementById("front");
        cardFront.innerHTML=this.cards[this.currentCard];
    }
    this.flickLeft=function() {
        if (this.currentCard<(this.cards.length-1)) {
            this.currentCard++;
        } else {
            this.currentCard=0;
        }
        this.Draw();
    }
    this.flickRight=function() {
        if(this.currentCard>0) {
            this.currentCard--;
        } else {
            this.currentCard=this.cards.length-1;
        }
        this.Draw();
    }
    if (typeof deck == "string") {
        if (deck in Decks) {
            this.setupDeck(Decks[deck]);
        }
    } else {
        this.setupDeck(deck);
    };
    this.currentCard=0;
};