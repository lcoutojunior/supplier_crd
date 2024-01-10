// Define the SQL statement to create the table
import pool from "./db";

const createTableQuery = `
CREATE TABLE IF NOT EXISTS supplier (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email_address VARCHAR(255) NOT NULL,
    category VARCHAR(50) CHECK (Category IN ('Services', 'Sub-contractors', 'Manufacturers', 'Distributors', 'Importers')) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

async function createTableSupplier() {
    try {
        // Execute the SQL statement to create the table
        await pool.query(createTableQuery);
        console.log("Function createTableSupplier executed.");
    } catch (error) {
        console.error("Error creating table:", error);
    }
}

export default createTableSupplier;
