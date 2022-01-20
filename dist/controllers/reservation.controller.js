"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReservation = exports.getReservation = void 0;
const database_1 = require("../database");
const getReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield database_1.pool.query('SELECT * FROM reservation');
        for (let i = 0; i < response.rows.length; i++) {
            let time = duracion(response.rows[i].endhour, response.rows[i].starthour);
            response.rows[i].time = (time == 1) ? time + ' hr' : time + ' hrs';
        }
        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getReservation = getReservation;
const createReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(req.body);
    //res.send('recived')
    const { id, id_customer, location, reservationdate, starthour, endhour } = req.body;
    const response = yield database_1.pool.query('INSERT INTO reservation (id,id_customer,location,reservationdate,starthour,endhour) VALUES($1, $2, $3, $4, $5, $6)', [id, id_customer, location, reservationdate, starthour, endhour]);
    return res.json({
        message: 'Customer Created Succesfully',
        body: {
            reservation: {
                id,
                id_customer,
                location,
                reservationdate,
                starthour,
                endhour
            }
        }
    });
});
exports.createReservation = createReservation;
function duracion(endhour, starthour) {
    var hora1 = (endhour).split(":");
    var hora2 = (starthour).split(":");
    var time_end = parseInt(hora1[0]) * 3600 + parseInt(hora1[1]) * 60 + parseInt(hora1[2]);
    var time_init = parseInt(hora2[0]) * 3600 + parseInt(hora2[1]) * 60 + parseInt(hora2[2]);
    var result = (time_end - time_init) / 3600;
    return result;
}
