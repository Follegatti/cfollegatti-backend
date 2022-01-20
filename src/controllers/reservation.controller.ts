import { Request, Response } from 'express'
import { QueryResult } from 'pg';

import { pool } from '../database'

export const getReservation = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await pool.query('SELECT * FROM reservation');
        for (let i = 0; i < response.rows.length; i++) {
            let time = duration(response.rows[i].endhour, response.rows[i].starthour);

            response.rows[i].time = (time == 1) ? time + ' hr' : time + ' hrs';
        }

        return res.status(200).json(response.rows);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json('Internal Server Error');
    }

}

export const createReservation = async (req: Request, res: Response): Promise<Response> => {
    //console.log(req.body);
    //res.send('recived')
    const { id, id_customer, location, reservationdate, starthour, endhour } = req.body;
    const response: QueryResult = await pool.query('INSERT INTO reservation (id,id_customer,location,reservationdate,starthour,endhour) VALUES($1, $2, $3, $4, $5, $6)', [id, id_customer, location, reservationdate, starthour, endhour]);
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
    })
}
function duration(endhour: any, starthour: any) {
    var hour1 = (endhour).split(":");
    var hour2 = (starthour).split(":");
    var time_end = parseInt(hour1[0]) * 3600 + parseInt(hour1[1]) * 60 + parseInt(hour1[2]);
    var time_init = parseInt(hour2[0]) * 3600 + parseInt(hour2[1]) * 60 + parseInt(hour2[2]);
    var result = (time_end - time_init) / 3600;
    return result;
}