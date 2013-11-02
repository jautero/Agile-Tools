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
