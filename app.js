const mysql = require('mysql');
const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
const session = require('express-session');
const path = require('path');
const bodyparser = require('body-parser');
const moment = require('moment');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost', //route
    user: 'admin', //
    password: 'password',
    database: 'analisis1',
    multipleStatements: true
});


mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

//Registro de provededor
app.post('/proveedor/registry', (req, res) => {
    let emp = req.body;
    var username = req.body.id;
    var email = req.body.email;
    var sql = "SET @id = ?;SET @paswd = ?;SET @email = ?;SET @nombres = ?;SET @apellidos = ?;\
    CALL proveedorcall(@id,@paswd,@email, @nombres, @apellidos);";

	mysqlConnection.query('SELECT * FROM usuario WHERE id = ? OR email = ?', [username, email], function(error, results, fields) {
	if (results.length > 0) {
		console.log("Not unique");

	} else {
			mysqlConnection.query(sql, [username, emp.passwd, email, emp.nombres,emp.apellidos], (err, rows, fields) => {
       		if (!err)
            	res.send('Updated successfully');
			else
            	console.log(err);
    		})
	}

	});
    
});

//Visualizar   horarios

app.get('/client/:id', (req, res) => {
    mysqlConnection.query('SELECT horarios.fecha, horarios.hora_inicio, horarios.hora_fin FROM horarios, proveedor WHERE \
      proveedor.id = horario.proveedor AND proveedor.id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


//ingresar horarios
app.post('/proveedor/horario', (req, res) => {
	var username = session.code;
	let emp = req.body;
  let fecha = req.body.fecha;
  let should = true;
  mysqlConnection.query('SELECT horario.fecha FROM horario WHERE horario.proveedor = ?', [code], (err, rows, fields) => {
        if (!err){
          rows.forEach(function(row) {
            if(fecha == row.fecha)
              should = false;
          });
        }
        else
            console.log(err);
    })
    if (should != false)	{
      var sql = "SET @fecha = ?;SET @horai = ?;SET @horaf = ?;\
    CALL horarioset(@fecha,@horai,@horaf);";
         mysqlConnection.query(sql, [emp.fecha, emp.hora_inicio, emp.hora_fin], (err, rows, fields) => {
          if (!err){
              res.send('Updated successfully');

            }
          else
              console.log(err);
    
        });
    }
});
 



//Procedimiento para obtener fechas intermedias
var getDates = function(startDate, endDate) {
  var dates = [],
      currentDate = startDate,
      addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};


//Insertar horario
app.post('/cliente/schedule', (req, res) => {
	var usercode = session.code;
  let emp = req.body;
  var sql1 = "SET @fecha = ?;SET @hora_inicio = ?, SET @hora_fin = ?, SET @usuario;\
  CALL addschedule_client(@fecha,@hora_inicio,@hora_fin, @usuario);";
  var sql2 = "SET @fecha = ?;SET @hora_inicio = ?, SET @hora_fin = ?, SET @usuario;\
  CALL addschedule_prov(@fecha,@hora_inicio,@hora_fin, @usuario);";
  mysqlConnection.query(sql1, [emp.fecha, emp.hora_inicio, emp.hora_fin, usercode], (err, rows, fields) => {
    if (!err)
        res.send('Updated successfully');

    else
        console.log(err);
})
mysqlConnection.query(sql2, [emp.fecha, emp.hora_inicio, emp.hora_fin, usercode], (err, rows, fields) => {
  if (!err)
      res.send('Updated successfully');

  else
      console.log(err);
})
});
