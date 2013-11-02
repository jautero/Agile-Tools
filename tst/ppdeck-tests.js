module("VirtualPlanningPokerDeck");
test("create deck",function(){
   var deck=new VirtualPlanningPokerDeck("reaktor");
   equal(deck.cards.length,14,"reaktor deck has 14 cards");
});
test ("create simple deck",function(){
    var deck=new VirtualPlanningPokerDeck({back:"",cards:["1","2","3","4"]});
    equal(deck.cards.length,4,"Deck does has four cards");
})
