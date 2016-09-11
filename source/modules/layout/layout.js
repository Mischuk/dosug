var str = "Is this enough?";
var patt1 = new RegExp("[^A-J]");
var result = str.match(patt1);
alert(result);