import pool from "../../../database/db"
import type { NextApiRequest, NextApiResponse } from 'next'

enum Category {
    Services = 'Services',
    SubContractors = 'Sub-contractors',
    Manufacturers = 'Manufacturers',
    Distributors = 'Distributors',
    Importers = 'Importers',
}

type bodyResponse = {
    name: string,
    emailAddress: string,
    category: Category,
    description: string
}

type ResponseData = {
    message: string,
    supplier?: bodyResponse,
    deleted?: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const { method } = req;
    const { id } = req.query;
  
    if (method !== 'DELETE') {
      return res.status(405).json({message:'Method Not Allowed'});
    }
      
    try {
            
      let result = await pool.query(
        `SELECT EXISTS (SELECT * FROM information_schema.tables WHERE table_name = $1);`,['supplier']
      );
        
      //If table supplier not exists.
      if(!result.rows[0].exists){
        return res.status(200).json({message: 'Supplier table does not exists', deleted: false})
      }
        
      result = await pool.query(
        `SELECT EXISTS (SELECT * FROM supplier WHERE id = $1);`,[id]
      );

      //If supplier not exists.
      if(!result.rows[0].exists){
        return res.status(404).json({message: 'Supplier id not found.', deleted: false})
      }

      result = await pool.query(
         'DELETE FROM supplier WHERE id = $1 RETURNING *', [id]
      );

      console.log('Deleting Supplier, bodyRequest: ', result.rows[0]);
  
      return res.status(201).json({ message: 'Supplier deleted successfully', supplier: result.rows[0], deleted: true});
    } catch (error) {
      console.error('Error deleting supplier:', error);
      return res.status(500).json({ message: 'Internal Server Error', deleted: false });
    }
  }