
var connection = require("../config/connection.js");

var orm = {

  all:function(tablename,cb){
    connection.query("select * from burgers", function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  allWithDevoured:function(tablename,devoured,cb){
    connection.query("select * from burgers where devoured = ?",[devoured], function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  create:function(tablename,burger_name,cb){
    connection.query(
             "INSERT INTO burgers SET ?",
             {
               burger_name: burger_name,
               devoured: false
             },
             function(err, res) {
               console.log(res.affectedRows + " quote inserted!\n");
               
            return cb(res);

             });
  },
  update:function(tablename,burger_name,cb){
    var query = "UPDATE burgers set devoured = true WHERE burger_name = ?" ;

      connection.query( query,[burger_name], function(error, results){
          if( error )
              throw error;
          return cb(results);
      });
  },
  delete:function(tablename,burger_name,cb){
    var query = "delete from burgers WHERE burger_name = ?" ;

      connection.query( query,[burger_name], function(error, results){
          if( error )
              throw error;
          return cb(results);
      });
  }
};

module.exports=orm;