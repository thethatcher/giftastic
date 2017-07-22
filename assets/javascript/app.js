var players = ["Kyle Beckerman","Nick Rimando","Lionel Messi"];
var key = "fcfcb5d597d24a258d68c0871be63e9b";
var queryURL;
drawBtn(players);

function drawBtn(array){
	$("#button-holder").empty();
	for (var i = 0; i < array.length; i++) {
		$("#button-holder").append('<button class="playerBtn">' + array[i] + '</button>');
	}
	console.log('drawBtn called');
}

$(document).on("click",".playerBtn", playerBtnClick);

$("#entry").submit(function(event){
	var $tempEntry = $(this).children().eq(2);
	players.push($tempEntry.val());
	drawBtn(players);
	$tempEntry.val("");
	event.preventDefault();
});

function playerBtnClick(){
	console.log("success! " + $(this).text() + " button clicked");
	queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).text() + "&api_key=" + key + "&limit=10";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
			console.log(response);
		});
}

