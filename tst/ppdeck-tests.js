module("VirtualPlanningPokerDeck");
test("create deck",function(){
   var deck=new VirtualPlanningPokerDeck("reaktor");
   equal(deck.cards.length,14,"reaktor deck has 14 cards");
   equal(deck.currentCard,0,"Current card is first card");
});
test("create simple deck",function(){
    var deck=new VirtualPlanningPokerDeck({back:"",cards:["1","2","3","4"]});
    equal(deck.cards.length,4,"Deck does has four cards");
});
test("Draw deck",function(){
    var deck=new VirtualPlanningPokerDeck("reaktor");
    equal(deck.currentCard,0,"Current card is first card");
    deck.Draw();
    equal(document.getElementById("front").innerHTML,deck.cards[0],"Element front should contain first card.");
    deck.currentCard=3;
    deck.Draw();
    equal(document.getElementById("front").innerHTML,deck.cards[3],"Draw should update card to current card.");
});

test("Flick left", function() {
    var deck=new VirtualPlanningPokerDeck("reaktor");
    for (i=0;i<deck.cards.length;i++) {
        var nextCard=i+1;
        if (nextCard==deck.cards.length)
            nextCard=0;
        deck.flickLeft();
        equal(deck.currentCard,nextCard,"Current card is second card");
        equal(document.getElementById("front").innerHTML,deck.cards[nextCard],"Flick should update card.");    
    }
});

test("Flick right", function() {
    var deck=new VirtualPlanningPokerDeck("reaktor");
    deck.currentCard=1;
    deck.flickRight();
    equal(deck.currentCard,0,"Current card is first card");
    equal(document.getElementById("front").innerHTML,deck.cards[0],"And card is updated.");
    deck.flickRight();
    var newCard=deck.cards.length-1;
    equal(deck.currentCard,newCard,"cards flip over");
    equal(document.getElementById("front").innerHTML,deck.cards[newCard],"And card is updated.")
})
