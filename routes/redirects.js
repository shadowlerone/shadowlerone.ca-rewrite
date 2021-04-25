'use strict';
const fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET users listing. */
/* Redirects */
router.get(['/twitter'], function (req,res){
	res.redirect('https://twitter.com/shadowlerone');
});
router.get("/undefined", function (req,res){
	res.redirect('/');
});
router.get("/:project", function (req,res){
	let rawdata = fs.readFileSync('routes/socials.json');
	let projects = JSON.parse(rawdata);
	let project = req.params['project'];
	console.log(projects['redirects'])
	let redir = projects['redirects'].filter(red => check_redir(red, project));
	console.log(redir);
	res.redirect(redir[0].url);
});
function check_redir(red, proj) {
	console.log(red['endpoints'])
	return red['endpoints'].includes(proj.toLowerCase());
}


module.exports = router;
