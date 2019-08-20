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
    var username = req.body.username;
    var email = req.body.email;
    var sql = "SET @username = ?SET @paswd = ?;SET @email = ?;SET @nombres = ?;SET @apellidos = ?;\
    CALL addproveedor(@id,@paswd,@email, @nombres, @apellidos);";

	mysqlConnection.query('SELECT * FROM usuario WHERE username = ? OR email = ?', [username, email], function(error, results, fields) {
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
    mysqlConnection.query('SELECT horario.fecha, horario.hora_inicio, horario.hora_fin FROM horario, proveedor WHERE \
      proveedor.codproveedor = horario.proveedor AND proveedor.codproveedor = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


//ingresar horarios
app.post('/proveedor/horario', (req, res) => {
	var username = req.session.code;
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


//agendar horario
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

//Visualizar solicitudes
app.get('/proveedor/solicitudes', (req, res) => {
  mysqlConnection.query('SELECT * FROM solicitud, proveedor WHERE \
    proveedor.codproveedor = solicitud.proveedor AND proveedor.codproveedor = ? AND solicitud.accepted = false', [req.params.id], (err, rows, fields) => {
      if (!err)
          res.send(rows);
      else
          console.log(err);
  })
});



//aceptar solicitud
app.post('/proveedor/solicitud/:id', (req, res) => {
	var usercode = session.code;
  let emp = req.body;
  var sql1 = "SET @solicitud = ?;\
  CALL change_accepted(@solicitud);";
 
  mysqlConnection.query(sql1, [req.params.id], (err, rows, fields) => {
    if (!err)
        res.send('Updated successfully');

    else
        console.log(err);
})

});