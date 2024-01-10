import pool from "../../database/db"
import createTableSupplier from "../../database/createTableSuppliers"
import type { NextApiRequest, NextApiResponse } from 'next'

enum Category {
  Services = 'Services',
  SubContractors = 'Sub-contractors',
  Manufacturers = 'Manufacturers',
  Distributors = 'Distributors',
  Importers = 'Importers',
}

type body = {
  name: string,
  emailAddress: string,
  category: Category | string,
  description: string
}

type ResponseData = {
  message: string,
  supplier?: body,
  created?: boolean
}

const bodyShouldContents : body = {
  name: "name", 
  emailAddress: "emailAddress", 
  category: "category", 
  description: "description"
}


export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const { method, body } = req;
    
    if (method !== 'POST') {
      return res.status(405).json({message:'Method Not Allowed'});
    }
    
    const bodyRequestProperties = Object.getOwnPropertyNames(body);
    const shouldContainProperties = Object.getOwnPropertyNames(bodyShouldContents);
    const allPropertiesSet = shouldContainProperties.every(value => bodyRequestProperties.includes(value));
    //Check if all keys of bodyRequest JSON are set.
    if(!allPropertiesSet) {
      return res.status(400).json({ message: 'Body properties missing', supplier: bodyShouldContents, created: false });
    }
    
    const validCategories = Object.values(Category);
    //Check if includes a valid Category (avoid SQL exception).
    if (!validCategories.includes(req.body.category)) {
      return res.status(400).json({ message: 'Invalid category value' });
    }
    
    const bodyRequest : body = body;
    
    try {

      let result = await pool.query(
        `SELECT EXISTS (SELECT * FROM information_schema.tables WHERE table_name = $1);`,['supplier']
        );
        
        //If table supplier not exists.
        if(!result.rows[0].exists){
          await createTableSupplier();
        }
        
        result = await pool.query(
          `INSERT INTO supplier (name, email_address, category, description) VALUES ($1, $2, $3, $4) RETURNING *`, [bodyRequest.name, bodyRequest.emailAddress, bodyRequest.category, bodyRequest.description]
        );
        
      console.log('Creating Supplier, bodyRequest: ',bodyRequest);
      return res.status(201).json({ message: 'Supplier created successfully', supplier: result.rows[0], created: true});
    } catch (error) {
      console.error('Error creating supplier:', error);
      return res.status(500).json({ message: 'Internal Server Error', created: false });
    }
  }