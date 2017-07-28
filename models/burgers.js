
	var orm = require("../config/orm.js");

	var burger = {

		all:function(cb){
			orm.all("burgers", function(data){
				cb(data);
			})
		},

		allWithDevoured: function(devoured,cb){
			orm.allWithDevoured("burgers",devoured,function(data){
				cb(data);
			});
		},

		create:function(burger_name,cb){
			orm.create("burgers",burger_name,function(data){
				cb(data);
			});
		},

		update:function(burger_name,cb){
			orm.update("burgers",burger_name,function(data){
				cb(data);
			});
		},
		delete:function(burger_name,cb){
			orm.delete("burgers",burger_name,function(data){
				cb(data);
			});
		}
	};

	module.exports = burger;