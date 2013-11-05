var Decks={
    standard: {
        back: "https://www.dropbox.com/sh/eei6pverezsam0f/2b2pKJ3oEo/suttu.png",
        cards: [" ","0","\u00BD","1","2","3","5","8","13","20","40","100","?","\u2615"]
    }
}

function VirtualPlanningPokerDeck(deck){
    this.setupDeck=function(deckdata) {
        this.back=deckdata.back;
        this.cards=deckdata.cards;
    };
    this.Draw=function() {
        var cardFront=$("#front");
        cardFront.html(this.cards[this.currentCard]);
        var cardBack=$("#back");
        cardBack.css("background-image","url("+this.back+")");
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
    this.Flip=function () {
        var hide,show;
        if ($("#front").css("visibility")=="visible") {
            show=$("#back");
            hide=$("#front");
        } else {
            show=$("#front");
            hide=$("#back");
        };
        show.css("visibility","visible");
        hide.css("visibility","hidden");
    };
    this.currentCard=0;
    this.Draw();
};