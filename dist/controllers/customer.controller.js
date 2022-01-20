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
exports.createCustomer = exports.getCustomerbyId = exports.getCustomer = void 0;
const database_1 = require("../database");
const getCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responce = yield database_1.pool.query('SELECT * FROM customer');
        return res.status(200).json(responce.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getCustomer = getCustomer;
const getCustomerbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.params.id);
    //  res.send('recived')
    const id = parseInt(req.params.id);
    const response = yield database_1.pool.query('SELECT * FROM customer WHERE id = $1', [id]);
    return res.json(response.rows);
});
exports.getCustomerbyId = getCustomerbyId;
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(req.body);
    //res.send('recived')
    const { id, name, birthday } = req.body;
    const responce = yield database_1.pool.query('INSERT INTO customer (id,name,birthday) VALUES($1, $2, $3)', [id, name, birthday]);
    return res.json({
        message: 'Customer Created Succesfully',
        body: {
            customer: {
                id,
                name,
                birthday
            }
        }
    });
});
exports.createCustomer = createCustomer;
/*
 export const updateCustomer = async(req : Request, res : Response): Promise<Response>{

}
export const deleteCustomer = async(req : Request, res : Response): Promise<Response>{

} */ 
