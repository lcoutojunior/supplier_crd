import pool from "../../database/db"
import type { NextApiRequest, NextApiResponse } from 'next'

enum Category {
    Services = 'Services',
    SubContractors = 'Sub-contractors',
    Manufacturers = 'Manufacturers',
    Distributors = 'Distributors',
    Importers = 'Importers',
  }
  
  type supplier = {
    name: string,
    emailAddress: string,
    category: Category | string,
    description: string
  }

type ResponseData = {
    message: string,
    suppliers?: supplier[],
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const { method } = req;
  
    if (method !== 'GET') {
      return res.status(405).json({message:'Method Not Allowed'});
    }

    try {

          
      let result = await pool.query(
        `SELECT EXISTS (SELECT * FROM information_schema.tables WHERE table_name = $1);`,['supplier']
      );
  
      //If table supplier not exists.
      if(!result.rows[0].exists){
        return res.status(200).json({message: 'Supplier table does not exists'})
      }
  
      result = await pool.query('SELECT * FROM supplier');

      //console.log("Suppliers: ", result.rows);
    
      return res.status(201).json({ message: 'Supplier listed successfully', suppliers: result.rows});
      } catch (error) {
        console.error('Error listing supplier:', error);
        
        return res.status(500).json({ message: 'Internal Server Error'});
      }
}