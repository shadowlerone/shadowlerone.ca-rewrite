var express = require('express');
const fs = require('fs');
var router = express.Router();
var lipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In condimentum nibh ac placerat placerat. Ut dignissim iaculis risus et maximus. Integer fringilla lectus nisl, in mattis justo suscipit vel. Duis malesuada pellentesque volutpat. Vestibulum malesuada vel risus non convallis. Nam at nibh et lectus auctor hendrerit eu sit amet lacus. Suspendisse molestie massa non scelerisque sagittis. Duis interdum pretium efficitur. Praesent ac nunc vitae velit sodales porttitor nec quis neque. Donec luctus turpis ut scelerisque tristique. Donec ultrices egestas dignissim. Curabitur quis turpis aliquam, pharetra mi ut, sagittis mi. Aliquam egestas velit eu tellus vulputate, quis gravida orci ultrices. Nullam eros dui, laoreet ac semper a, volutpat a diam.`
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
getJson = function (fp) {
	let rawdata = fs.readFileSync(fp);
	return JSON.parse(rawdata);
}


router.get('/', function (req, res, next){
	res.render('animalcrossing/index');
});

router.get('/feed', function (req, res, next) {
	let characters = getJson('routes/animalcrossing/profiles.json');
	let posts = getJson('routes/animalcrossing/posts.json').filter(p => new Date(p.date) < new Date()).slice().sort((a, b) => { i = new Date(a.date); j = new Date(b.date); j - i }).map(p => {
		if (p.content=="lorem"){p.content = lipsum};
		p.author_img = characters[p.author].image;
		p.date = new Date(p.date).toLocaleDateString(undefined, options);
		return p;
	});

	res.render('animalcrossing/feed', { posts: posts });
});

router.get('/profile/:char', function (req, res, next) {
	let characters = getJson('routes/animalcrossing/profiles.json');
	console.log(characters)
	let posts = getJson('routes/animalcrossing/posts.json');
	let character = req.params['char'];
	console.log(character)
	let chardata = characters[character];
	console.log(chardata)
	chardata["posts"] = posts.filter(p => p.author == character).filter(p => new Date(p.date) < new Date()).slice().sort((a, b) => { i = new Date(a.date); j = new Date(b.date); j - i }).slice(0, 3).map(p => {if (p.content=="lorem"){p.content = lipsum}; p['author'] = chardata; return p});
	if (chardata.desc == "lorem") {
		chardata.desc =  lipsum;
	}
	res.render('animalcrossing/profile', { char: chardata });

});

router.get('/profiles', function (req, res, next) {
	let characters = getJson('routes/animalcrossing/profiles.json');
	res.render("animalcrossing/profiles", {characters : characters});
});
router.get('/add-profile', function(req, res, next) {
	res.render("animalcrossing/profilemenu");
})

router.post('/submit-profile', function(req, res, next) {
	var chars = getJson('routes/animalcrossing/profiles.json');
	var char = {}
	char.name = req.body.name
	char.pronouns = req.body.pronouns
	char.birth = req.body.birth
	char.joined = req.body.joined
	char.job = req.body.job
	//TODO take care of image
	char.desc = req.body.desc
	chars[char.name] = char;
	console.log(chars);
	fs.writeFile("routes/animalcrossing/profiles.json", JSON.stringify(chars), function (err) {
		if (err) throw err;
	})
	res.render("animalcrossing/debug", {char: req.body})
});

module.exports = router;
