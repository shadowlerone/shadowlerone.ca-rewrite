function submit(winner, loser) {
	// console.log(winner, loser);
	$.ajax({url:`/pokemon/choice/${winner}/${loser}`, success:function(results){
		console.log(results);
		$("#choices").html(`<div class="card bg-primary pkmn"><a id="a1" href="#" onclick="submit('${results.choice1}','${results.choice2}')"><div class="card-body text-center"> <h1 class="card-text display-3" id="p1">${results.choice1}</p></div></a></div><div class="card bg-success pkmn"><a id="a2" href="#" onclick="submit('${results.choice2}','${results.choice1}')"><div class="card-body text-center"><h1 class="card-text display-3" id="p2">${results.choice2}</p></div></a></div>`)
	}});

}