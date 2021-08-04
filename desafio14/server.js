'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

//para entrar a la aplicacion http://localhost:8080
require("@babel/polyfill");
var express = require('express');
var app = express();
var routerApi = express.Router();

var listado = require('./Archivo');
var chatMensajes = require('./msgChat');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

var handlebars = require('express-handlebars');

app.engine("hbs", handlebars({
    extname: ".hbs",
    defaultLayout: 'index.hbs'
}));

app.use('/', routerApi);
app.set("view engine", "hbs");
app.set("views", "./views");

routerApi.get('/', function (req, res) {
    res.render("vistaTabla");
});
routerApi.get("/productos/vista", function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var contenido;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return listado.leer();

                    case 3:
                        contenido = _context.sent;

                        if (!(contenido.length == 0)) {
                            _context.next = 6;
                            break;
                        }

                        throw new Error('no hay productos');

                    case 6:
                        res.render("vista", { productos: contenido });
                        _context.next = 12;
                        break;

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context['catch'](0);

                        res.render("vista", { error: _context.t0.message });

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 9]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

/*
 almacena el producto y devuelve el producto incorporado
*/
routerApi.post('/productos/guardar', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var resultado;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;

                        if (!(!req.body.title || !req.body.price || !req.body.thumbnail)) {
                            _context2.next = 3;
                            break;
                        }

                        throw new Error("debe rellenar todos los datos solicitados");

                    case 3:
                        _context2.next = 5;
                        return listado.guardar({ "title": req.body.title, "price": req.body.price, "thumbnail": req.body.thumbnail });

                    case 5:
                        resultado = _context2.sent;

                        if (!(resultado.length == 0)) {
                            _context2.next = 8;
                            break;
                        }

                        throw new Error("Error al guardar el archivo");

                    case 8:
                        res.json(resultado);
                        _context2.next = 14;
                        break;

                    case 11:
                        _context2.prev = 11;
                        _context2.t0 = _context2['catch'](0);

                        res.json({ "error": _context2.t0.message });

                    case 14:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 11]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());
/*
    Permite modificar un producto
*/
routerApi.put('/productos/:id', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var producto, productoaModificar, productoModificado;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return listado.buscar(req.params.id);

                    case 3:
                        producto = _context3.sent;

                        if (!(producto.length == 0)) {
                            _context3.next = 6;
                            break;
                        }

                        throw new Error("El producto buscado no existe");

                    case 6:
                        productoaModificar = {
                            "title": req.body.title,
                            "price": req.body.price,
                            "thumbnail": req.body.thumbnail,
                            "id": req.params.id
                        };
                        _context3.next = 9;
                        return listado.modificar(productoaModificar);

                    case 9:
                        productoModificado = _context3.sent;

                        if (!(productoModificado.length == 0)) {
                            _context3.next = 14;
                            break;
                        }

                        throw new Error("Se ha producido un error al modificar el producto");

                    case 14:
                        res.json(productoModificado);

                    case 15:
                        _context3.next = 20;
                        break;

                    case 17:
                        _context3.prev = 17;
                        _context3.t0 = _context3['catch'](0);

                        res.send({ "Mensaje": _context3.t0.message });

                    case 20:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 17]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());
/*
 Devuelve un array de productos
*/
routerApi.get('/productos/listar', function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var contenido;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return listado.leer();

                    case 3:
                        contenido = _context4.sent;

                        if (!(contenido.length == 0)) {
                            _context4.next = 6;
                            break;
                        }

                        throw new Error('no hay productos cargados');

                    case 6:
                        res.json(contenido);
                        _context4.next = 12;
                        break;

                    case 9:
                        _context4.prev = 9;
                        _context4.t0 = _context4['catch'](0);

                        res.json({ "error": _context4.t0.message });

                    case 12:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 9]]);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}());
/*
Devuelve un producto del listado
*/
routerApi.get('/productos/listar/:id', function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var contenido;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return listado.buscar(req.params.id);

                    case 3:
                        contenido = _context5.sent;

                        if (!(contenido.length == 0)) {
                            _context5.next = 6;
                            break;
                        }

                        throw new Error('producto no encontrado');

                    case 6:
                        res.json(contenido);
                        _context5.next = 12;
                        break;

                    case 9:
                        _context5.prev = 9;
                        _context5.t0 = _context5['catch'](0);

                        res.json({ "error": _context5.t0.message });

                    case 12:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 9]]);
    }));

    return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}());
/*
    Permite eliminar un producto
*/
routerApi.delete('/productos/borrar/:id', function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var producto, borrado;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        _context6.prev = 0;
                        producto = {
                            "title": req.body.title,
                            "price": req.body.price,
                            "thumbnail": req.body.thumbnail,
                            "id": req.params.id
                        };
                        _context6.next = 4;
                        return listado.borrarProducto(producto);

                    case 4:
                        borrado = _context6.sent;

                        if (!(borrado.length == 0)) {
                            _context6.next = 7;
                            break;
                        }

                        throw new Error("Error al borrar el producto");

                    case 7:
                        res.json(borrado);
                        _context6.next = 13;
                        break;

                    case 10:
                        _context6.prev = 10;
                        _context6.t0 = _context6['catch'](0);

                        res.json({ "error": _context6.t0.message });

                    case 13:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[0, 10]]);
    }));

    return function (_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}());
http.listen(8080, function () {
    return console.log('El servidor esta funcionando');
});
io.on('connect', function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(socket) {
        var contenido, contenidochat, mensajeGuarda;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
            while (1) {
                switch (_context12.prev = _context12.next) {
                    case 0:
                        contenido = function () {
                            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                                var cont;
                                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                                    while (1) {
                                        switch (_context7.prev = _context7.next) {
                                            case 0:
                                                _context7.prev = 0;
                                                _context7.next = 3;
                                                return listado.leer();

                                            case 3:
                                                cont = _context7.sent;

                                                if (!(cont.length == 0)) {
                                                    _context7.next = 6;
                                                    break;
                                                }

                                                throw new Error('no hay productos');

                                            case 6:
                                                return _context7.abrupt('return', { productos: cont });

                                            case 9:
                                                _context7.prev = 9;
                                                _context7.t0 = _context7['catch'](0);
                                                return _context7.abrupt('return', { error: _context7.t0.message });

                                            case 12:
                                            case 'end':
                                                return _context7.stop();
                                        }
                                    }
                                }, _callee7, undefined, [[0, 9]]);
                            }));

                            return function contenido() {
                                return _ref8.apply(this, arguments);
                            };
                        }();

                        contenidochat = function () {
                            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                                var cont;
                                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                                    while (1) {
                                        switch (_context8.prev = _context8.next) {
                                            case 0:
                                                _context8.prev = 0;
                                                _context8.next = 3;
                                                return chatMensajes.leer();

                                            case 3:
                                                cont = _context8.sent;
                                                return _context8.abrupt('return', { mensajes: cont });

                                            case 7:
                                                _context8.prev = 7;
                                                _context8.t0 = _context8['catch'](0);
                                                return _context8.abrupt('return', { error: _context8.t0.message });

                                            case 10:
                                            case 'end':
                                                return _context8.stop();
                                        }
                                    }
                                }, _callee8, undefined, [[0, 7]]);
                            }));

                            return function contenidochat() {
                                return _ref9.apply(this, arguments);
                            };
                        }();

                        mensajeGuarda = function () {
                            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(msg) {
                                var resultado;
                                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                                    while (1) {
                                        switch (_context9.prev = _context9.next) {
                                            case 0:
                                                _context9.prev = 0;
                                                _context9.next = 3;
                                                return chatMensajes.guardar(msg);

                                            case 3:
                                                resultado = _context9.sent;

                                                if (!(resultado.length == 0)) {
                                                    _context9.next = 6;
                                                    break;
                                                }

                                                throw new Error("Error al guardar el archivo");

                                            case 6:
                                                return _context9.abrupt('return', { mensajes: resultado });

                                            case 9:
                                                _context9.prev = 9;
                                                _context9.t0 = _context9['catch'](0);
                                                return _context9.abrupt('return', { "error": _context9.t0.message });

                                            case 12:
                                            case 'end':
                                                return _context9.stop();
                                        }
                                    }
                                }, _callee9, undefined, [[0, 9]]);
                            }));

                            return function mensajeGuarda(_x14) {
                                return _ref10.apply(this, arguments);
                            };
                        }();

                        socket.on('chat:mensaje', function () {
                            var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(data) {
                                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                                    while (1) {
                                        switch (_context10.prev = _context10.next) {
                                            case 0:
                                                _context10.next = 2;
                                                return mensajeGuarda(data);

                                            case 2:
                                                _context10.t0 = io.sockets;
                                                _context10.next = 5;
                                                return contenidochat();

                                            case 5:
                                                _context10.t1 = _context10.sent;

                                                _context10.t0.emit.call(_context10.t0, 'chat', _context10.t1);

                                            case 7:
                                            case 'end':
                                                return _context10.stop();
                                        }
                                    }
                                }, _callee10, undefined);
                            }));

                            return function (_x15) {
                                return _ref11.apply(this, arguments);
                            };
                        }());
                        _context12.t0 = socket;
                        _context12.next = 7;
                        return contenido();

                    case 7:
                        _context12.t1 = _context12.sent;

                        _context12.t0.emit.call(_context12.t0, 'productos', _context12.t1);

                        _context12.t2 = socket;
                        _context12.next = 12;
                        return contenidochat();

                    case 12:
                        _context12.t3 = _context12.sent;

                        _context12.t2.emit.call(_context12.t2, 'chat', _context12.t3);

                        socket.on('guardarProducto', function () {
                            var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(data) {
                                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                                    while (1) {
                                        switch (_context11.prev = _context11.next) {
                                            case 0:
                                                _context11.t0 = io.sockets;
                                                _context11.next = 3;
                                                return contenido();

                                            case 3:
                                                _context11.t1 = _context11.sent;

                                                _context11.t0.emit.call(_context11.t0, 'productos', _context11.t1);

                                            case 5:
                                            case 'end':
                                                return _context11.stop();
                                        }
                                    }
                                }, _callee11, undefined);
                            }));

                            return function (_x16) {
                                return _ref12.apply(this, arguments);
                            };
                        }());

                    case 15:
                    case 'end':
                        return _context12.stop();
                }
            }
        }, _callee12, undefined);
    }));

    return function (_x13) {
        return _ref7.apply(this, arguments);
    };
}());
