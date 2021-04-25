'use strict';
const fs = require('fs');
var express = require('express');
// const uuidv4 = require("uuid/v4")
var router = express.Router();


var ID = function () {
	// Math.random should be unique because of its seeding algorithm.
	// Convert it to base 36 (numbers + letters), and grab the first 9 characters
	// after the decimal.
	return '_' + Math.random().toString(36).substr(2, 32);
};
var data = function () {
	let rawdata = fs.readFileSync('routes/pokemon/users.json');
	let results = JSON.parse(rawdata);
	return results
}
var mons = function () {
	let rawdata = fs.readFileSync('routes/pokemon/poke.json');
	let results = JSON.parse(rawdata);
	return results
}
var defaults = function () {
	let rawdata = fs.readFileSync('routes/pokemon/default.json');
	let results = JSON.parse(rawdata);
	return results
}
function write(d){
	fs.writeFile('routes/pokemon/users.json',JSON.stringify(d), function (err, data){});
}

function win (d, winner, id) {
	// console.log(d);
	console.log(winner);
	console.log(id)
	d['users'][id][winner]['wins'] += 1;
	d['users'][id][winner]['encounters'] += 1;
	d.overall[winner]['wins'] += 1;
	d.overall[winner]['encounters'] += 1;
	return d
}
function lose (d, winner, id) {
	console.log(id)
	d['users'][id][winner]['encounters'] += 1;
	d.overall[winner]['encounters'] += 1;
	return d
}

function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}


/* GET users listing. */
/* Redirects */
router.get('/', function (req, res) {
	console.log('Cookies: ', req.cookies);
	res.render("pokemon/home");
});

router.get('/start', function (req, res) {
	var d = data()
	console.log(req.cookies['user'] == null)
	if (req.cookies['user'] == null) {
		var id = ID();
		res.cookie('user', id);
		let new_user = {id: defaults()};
		// console.log(d)
		d.users[id] = defaults();
		// console.log(d)
		write(d)
	}
	var m = mons()['starters']
	var c = getRandom(m, 2);
	res.render('pokemon/choices', {'a':{ choice1: c[0], choice2: c[1] }})
});

router.get('/choice/:winner/:loser', function (req, res) {
	var d = data();
	var m = mons()['starters']
	let winner = req.params['winner'];
	let loser = req.params['loser'];
	console.log(req.cookies);
	d = win(d, winner, req.cookies['user']);
	d = lose(d, loser, req.cookies['user']);
	write(d)
	var c = getRandom(m, 2);
	res.json({ choice1: c[0], choice2: c[1] });
});

router.get('/results', function (req, res) {
	var d = data()['users'][req.cookies['user']];
	// var rs;
	// console.log(rs);
	res.json(d);
});

router.get('/stats', function (req, res) {
	let results = data()
	res.json(results['overall'])
});


module.exports = router;