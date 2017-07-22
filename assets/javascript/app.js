var emotions = ["Happy","Sad","Angry","Envious"];
var key = "fcfcb5d597d24a258d68c0871be63e9b";
var queryURL;
var $gifHolder = $("#gif-holder");
var $lastGif;
drawBtn(emotions);

function drawBtn(array){
	$("#button-holder").empty();
	for (var i = 0; i < array.length; i++) {
		$("#button-holder").append('<button class="emoteBtn btn btn-primary">' + array[i] + '</button>');
	}
	console.log('drawBtn called');
}

$(document).on("click",".emoteBtn", emoteBtnClicked);
$(document).on("click","img", gifClicked);

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
	var $tempDiv;
	$gifHolder.empty();
	for (var i = 0; i < obj.data.length; i++) {
		$tempDiv = $('<div class="gif"></div>');
		$gifHolder.append($tempDiv);
		console.log($tempDiv);
		$tempImg = $('<img src="' + obj.data[i].images.fixed_height_still.url + '">');
		$tempDiv.append($tempImg);
		$tempDiv.append('<p class="rating">Rating: '+ obj.data[i].rating +"</p>");
		$tempImg.attr("data-state","still");
		$tempImg.attr("data-animateURL", obj.data[i].images.fixed_height.url);
		$tempImg.attr("data-stillURL", obj.data[i].images.fixed_height_still.url);
	}
}

function gifClicked(){
	var $gif = $(this);
	if($gif.attr("data-state")==="still"){
		$gif.attr("src", $gif.attr("data-animateURL"));
		$gif.attr("data-state","animated");
	}
	else{
		$gif.attr("src", $gif.attr("data-stillURL"));
		$gif.attr("data-state","still");
	}
	if($lastGif){
		$lastGif.attr("src", $lastGif.attr("data-stillURL"));
		$lastGif.attr("data-state","still");
	}
	$lastGif = $gif;
}