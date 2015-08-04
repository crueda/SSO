// Fichero de propiedades
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./sso.properties');

// Definición del log
var fs = require('fs');
var log = require('tracer').console({
    transport : function(data) {
        //console.log(data.output);
        fs.open(properties.get('main.log.file'), 'a', 0666, function(e, id) {
            fs.write(id, data.output+"\n", null, 'utf8', function() {
                fs.close(id, function() {
                });
            });
        });
    }
});

var dbConfig = {
  host: properties.get('bbdd.mysql.ip') ,
  user: properties.get('bbdd.mysql.user') ,
  password: properties.get('bbdd.mysql.passwd') ,
  database: properties.get('bbdd.mysql.name'),
    connectionLimit: 50,
    queueLimit: 0,
    waitForConnection: true
};

var mysql = require('mysql');

// Crear la conexion a la base de datos
/*
connection = mysql.createConnection(
    {
      host: properties.get('bbdd.mysql.ip') ,
      user: properties.get('bbdd.mysql.user') ,
      password: properties.get('bbdd.mysql.passwd') ,
      database: properties.get('bbdd.mysql.name')
    }
);
*/

var connection = mysql.createPool(dbConfig);

//creamos un objeto para ir almacenando todo lo que necesitemos
var userModel = {};

//obtenemos un usuario por su username
userModel.getUser = function(userData,callback)
{

    if (connection)
    {
        var sql = 'SELECT USERNAME as username, PASSWORD as password, ROLE as role FROM USER WHERE USERNAME = ' + connection.escape(userData.username);
        log.debug ("Query:" + sql);
        connection.query(sql, function(error, row)
        {
            if(error)
            {
                callback(error, null);
                //throw error;
            }
            else
            {
                callback(null, row);
            }
        });
    }
    else {
      callback(null, null);
      //throw error;
    }


}

//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = userModel;
