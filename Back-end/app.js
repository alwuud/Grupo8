const mysql = require('mysql');
const express = require('express'),
app = express(),
port = process.env.PORT || 3001;
const session = require('express-session');
const path = require('path');
const bodyparser = require('body-parser');
var cors = require('cors')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));

app.use(cors())
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost', //route
    user: 'root', //
    password: '1234',
    database: 'proyecto',
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


app.get('/horario', (req, res) => {
    res.render('calendar');
});




//Registro de provededor
app.post('/proveedor/registry', (req, res) => {
    let emp = req.body;
    var username = req.body.username;
    var email = req.body.email;
    var sql = "SET @username = ?; SET @paswd = ?;SET @email = ?;SET @nombres = ?;SET @apellidos = ?; SET @categoria = ?;\
    INSERT INTO proveedor ( username, password, email, nombres, apellidos, categoria_codcategoria ) \
     VALUES ( @username,@paswd,@email, @nombres, @apellidos, @categoria);"
    var sql2 = "SET @username = ?SET @paswd = ?;SET @email = ?;SET @nombres = ?;SET @apellidos = ?;\
    CALL addproveedor(@username,@paswd,@email, @nombres, @apellidos);";

	mysqlConnection.query('SELECT * FROM proveedor WHERE username = ? OR email = ?', [username, email], function(error, results, fields) {
	if (results.length > 0) {
		console.log("Not unique");

	} else {
			mysqlConnection.query(sql, [username, emp.passwd, email, emp.nombres, emp.apellidos, emp.categoria], (err, rows, fields) => {
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
    mysqlConnection.query('SELECT horario.codhorario, horario.fecha, horario.hora_inicio, horario.hora_fin FROM horario, proveedor WHERE \
      proveedor.codproveedor = horario.proveedor_codproveedor AND proveedor.codproveedor = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


//ingresar horarios
app.post('/proveedor/horario', (req, res) => {
	//var usercode = req.session.code;
	var usercode = 2;
	let emp = req.body;
  let fecha = req.body.fecha;
  let should = true;
  mysqlConnection.query('SELECT horario.fecha FROM horario WHERE horario.proveedor_codproveedor = ?', [usercode], (err, rows, fields) => {
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
      var sql = "SET @fecha = ?;SET @horai = ?;SET @horaf = ?; SET @proveedor =?;\
      INSERT INTO horario ( fecha, hora_inicio, hora_fin, proveedor_codproveedor ) \
      VALUES ( @fecha, @horai, @horaf, @proveedor)";
         mysqlConnection.query(sql, [emp.fecha, emp.hora_inicio, emp.hora_fin, usercode], (err, rows, fields) => {
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
app.post('/cliente/schedule/:id', (req, res) => {
  //var usercode = session.code;
  var usercode = 1;
  let emp = req.body;
  var sql1 = "SET @horario = ?; SET @usuario = ?;\
  INSERT INTO cita ( horario_codhorario, cliente_codcliente ) \
  VALUES ( @horario, @usuario)";

  mysqlConnection.query(sql1, [req.params.id, usercode], (err, rows, fields) => {
    if (!err)
        res.send('Updated successfully');

    else
        console.log(err);
})
});

//Visualizar solicitudes
app.get('/proveedor/solicitud/:id', (req, res) => {
  mysqlConnection.query('SELECT * FROM solicitud, proveedor WHERE \
    proveedor.codproveedor = solicitud.proveedor_codproveedor AND proveedor.codproveedor = ? AND solicitud.accepted = false', [req.params.id], (err, rows, fields) => {
      if (!err)
          res.send(rows);
      else
          console.log(err);
  })
});



//aceptar solicitud
app.post('/proveedor/solicitud/:id', (req, res) => {
  //var usercode = session.code;
  var usercode = 2;
  let emp = req.body;
  var sql1 = "  UPDATE solicitud SET solicitud.accepted = 1 \
  WHERE solicitud.proveedor_codproveedor = ? AND solicitud.cliente_codcliente = ?"; 
  mysqlConnection.query(sql1, [usercode, req.params.id], (err, rows, fields) => {
    if (!err)
        res.send('Updated successfully');

    else
        console.log(err);
})

});



//Modificar horario
app.post('/cliente/mod_schedule', (req, res) => {
  //var usercode = session.code;
  var usercode = 1;
  let emp = req.body;
  var sql1 = "SET @horario = ?; SET @usuario = ?;\
  INSERT INTO cita ( horario_codhorario, cliente_codcliente ) \
  VALUES ( @horario, @usuario); \
  DELETE FROM cita WHERE horario_codhorario = ? ;";

  mysqlConnection.query(sql1, [req.body.next_sch, usercode, req.body.current_sch], (err, rows, fields) => {
    if (!err)
        res.send('Updated successfully');

    else
        console.log(err);
})
});



//get horarios from user
app.get('/client/cita/logged', (req, res) => {
  mysqlConnection.query('SELECT * FROM cita, horario WHERE \
    cita.horario_codhorario = horario.codhorario AND cita.cliente_codcliente = 1', [], (err, rows, fields) => {
      if (!err)
          res.send(rows);
      else
          console.log(err);
  })
});

//get horarios not reserved
app.get('/prov/cita/notsel', (req, res) => {
  mysqlConnection.query('SELECT * FROM cita, horario, proveedor WHERE \
    cita.horario_codhorario = horario.codhorario AND horario.proveedor_codproveedor = proveedor.codproveedor AND proveedor.codproveedor =1', [], (err, rows, fields) => {
      if (!err)
          res.send(rows);
      else
          console.log(err);
  })
});
