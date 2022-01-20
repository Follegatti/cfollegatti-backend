import {Request, Response} from 'express'
import { QueryResult } from 'pg';

import {pool} from '../database'

export const getCustomer = async(req : Request, res : Response): Promise<Response> => {
    try {
        const responce:QueryResult = await pool.query('SELECT * FROM customer');
        return res.status(200).json(responce.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }
 
}

export const getCustomerbyId = async (req : Request, res : Response): Promise<Response> => {
   // console.log(req.params.id);
  //  res.send('recived')
    const id = parseInt(req.params.id)
    const response: QueryResult = await pool.query('SELECT * FROM customer WHERE id = $1',[id]);
   return res.json(response.rows);
}

export const createCustomer = async(req : Request, res : Response): Promise<Response> => {
    //console.log(req.body);
    //res.send('recived')
    const {id,name,birthday} = req.body;
    const responce : QueryResult = await pool.query('INSERT INTO customer (id,name,birthday) VALUES($1, $2, $3)',[id,name,birthday]);
    return res.json({
        message: 'Customer Created Succesfully',
        body: {
            customer:{
                id,
                name,
                birthday
            }
        }
    })
}
