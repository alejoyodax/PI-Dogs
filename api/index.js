//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const loadTemperamentsOnBD = require("./src/helpers/loadTemperamentsOnBD.js")
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const portToUse = process.env.PORT || 3001

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(portToUse, () => {
    console.log("¡CONECTADO A LA BASE DE DATOS EXITOSAMENTE!")
    console.log("# Escuchando en el puerto: ", portToUse); // eslint-disable-line no-console

    try {
      loadTemperamentsOnBD()
    } catch (error) {
      console.log(error)
    }


  });
});
