module("VirtualPlanningPokerDeck", {
    setup: function() {
        cardFrontElement = $("#front");
        cardBackElement = $("#back");
        deck=new VirtualPlanningPokerDeck("standard");
    }
});
test("create deck",function(){
   equal(deck.cards.length,14,"reaktor deck has 14 cards");
   equal(deck.currentCard,0,"Current card is first card");
});
test("create simple deck",function(){
    var deck=new VirtualPlanningPokerDeck({back:"",cards:["1","2","3","4"]});
    equal(deck.cards.length,4,"Deck does has four cards");
});
test("deck setup and draw",function(){
    equal(deck.currentCard,0,"Current card is first card");
    equal(cardFrontElement.html(),deck.cards[0],"Element front should contain first card.");
    equal(cardFrontElement.css("visibility"),"visible","Card front should be visible.");
    equal(cardBackElement.css("visibility"),"hidden","Card back should be hidden.");
    deck.currentCard=3;
    deck.Draw();
    equal(cardFrontElement.html(),deck.cards[3],"Draw should update card to current card.");
});

test("Flick left", function() {
    for (i=0;i<deck.cards.length;i++) {
        var nextCard=i+1;
        if (nextCard==deck.cards.length)
            nextCard=0;
        deck.flickLeft();
        equal(deck.currentCard,nextCard,"Current card is second card");
        equal(cardFrontElement.html(),deck.cards[nextCard],"Flick should update card.");
    }
});

test("Flick right", function() {
    deck.currentCard=1;
    deck.flickRight();
    equal(deck.currentCard,0,"Current card is first card");
    equal(cardFrontElement.html(),deck.cards[0],"And card is updated.");
    deck.flickRight();
    var newCard=deck.cards.length-1;
    equal(deck.currentCard,newCard,"cards flip over");
    equal(cardFrontElement.html(),deck.cards[newCard],"And card is updated.")
});
test("flip", function() {
    equal(cardFrontElement.css("visibility"),"visible","Card front should be visible.");
    equal(cardBackElement.css("visibility"),"hidden","Card back should be hidden.");
    deck.Flip();
    equal(cardFrontElement.css("visibility"),"hidden","Card front should be visible.");
    equal(cardBackElement.css("visibility"),"visible","Card back should be hidden.");
    deck.Flip();
    equal(cardFrontElement.css("visibility"),"visible","Card front should be visible.");
    equal(cardBackElement.css("visibility"),"hidden","Card back should be hidden.");
});