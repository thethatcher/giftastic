var emotions = ["Happy","Sad","Angry","Envious"];
var key = "fcfcb5d597d24a258d68c0871be63e9b";
var queryURL;
var $gifHolder = $("#gif-holder");
drawBtn(emotions);

function drawBtn(array){
	$("#button-holder").empty();
	for (var i = 0; i < array.length; i++) {
		$("#button-holder").append('<button class="emoteBtn">' + array[i] + '</button>');
	}
	console.log('drawBtn called');
}

$(document).on("click",".emoteBtn", emoteBtnClicked);

$("#entry").submit(function(event){
	var $tempEntry = $(this).children().eq(2);
	emotions.push($tempEntry.val());
	drawBtn(emotions);
	$tempEntry.val("");
	event.preventDefault();
});

function emoteBtnClicked(){
	console.log("success! " + $(this).text() + " button clicked");
	queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).text() + "&api_key=" + key + "&limit=10&rating=g&rating=pg";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
			console.log(response);
			console.log(queryURL);
			loadGIFs(response);
	});
}

function loadGIFs(obj){
	$gifHolder.empty();
	for (var i = 0; i < obj.data.length; i++) {
		$gifHolder.append('<img src="' + obj.data[i].images.fixed_height.url + '">');
	}
}