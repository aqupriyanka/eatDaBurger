var express = require("express");

var router = express.Router();

var burger = require("../models/burgers.js");


//ON PAGE LOAD
router.get("/",function(req,res){

	var burgers = [];
	var devouredBurger = [];
	burger.all(function(data){

		if(data){
		for(var burger in data){
			console.log("burger in for loop :",data[burger]);

			if(data[burger].devoured){
				devouredBurger.push(data[burger]);
			} else{
				burgers.push(data[burger]);
			}
		}
	}
		res.render("burger",{"burgers":burgers, "deBurgers" : devouredBurger});
	});
	//getBurgers From DB
	//render burger.handlenars
});


//POST method to store data in db
router.post("/",function(req,res){

	//insert data in burger table
	//render("/")
	console.log("NAME === ",req.body.name);
	console.log("BODY === ",req.body);

	burger.create(req.body.name,function(data){
		res.redirect("/");
	})

});


//PUT to update data in db.
router.put("/:name",function(req,res){
	var name = req.params.name;
	console.log("inside put ",name);

	//Update burger table and devoured as false.
	//render("/")
	burger.update(name,function(data){
		res.redirect("/");
	});

});

router.delete("/:name",function(req,res){
	var name = req.params.name;
	console.log("inside delete ",name);

	//Update burger table and devoured as false.
	//render("/")
	burger.delete(name,function(data){
		res.redirect("/");
	});

});

module.exports = router;

