import { Router } from "express";
const router = Router();

import {createCustomer, getCustomer, getCustomerbyId} from '../controllers/customer.controller'
import {getReservation,createReservation} from '../controllers/reservation.controller'

router.get('/customer',getCustomer)
router.get('/customer/:id',getCustomerbyId)
router.post('/customer',createCustomer)
//router.put('/customer/:id',getCustomer)
//router.delete('/customer/:id',getCustomer)

router.get('/reservation',getReservation)
router.post('/reservation',createReservation)

export default router;