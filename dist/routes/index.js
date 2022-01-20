"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const customer_controller_1 = require("../controllers/customer.controller");
const reservation_controller_1 = require("../controllers/reservation.controller");
router.get('/customer', customer_controller_1.getCustomer);
router.get('/customer/:id', customer_controller_1.getCustomerbyId);
router.post('/customer', customer_controller_1.createCustomer);
//router.put('/customer/:id',getCustomer)
//router.delete('/customer/:id',getCustomer)
router.get('/reservation', reservation_controller_1.getReservation);
router.post('/reservation', reservation_controller_1.createReservation);
exports.default = router;
