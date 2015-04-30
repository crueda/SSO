//llamamos al paquete mysql que hemos instalado
var mysql = require('mysql'),
//creamos la conexion a nuestra base de datos con los datos de acceso de cada uno
connection = mysql.createConnection(
    {
        host: '192.168.3.204',
        user: 'root',
        password: 'dat1234',
        database: 'sumoSSO'
    }
);

//creamos un objeto para ir almacenando todo lo que necesitemos
var userModel = {};

//obtenemos un usuario por su username
userModel.getUser = function(userData,callback)
{

    if (connection)
    {
        var sql = 'SELECT USERNAME as username, PASSWORD as password, ROLE as role FROM USER WHERE USERNAME = ' + connection.escape(userData.username);
        connection.query(sql, function(error, row)
        {
            if(error)
            {
                callback(null, null);
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
