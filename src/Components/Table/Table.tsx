import styles from './Table.module.css';
import { useState, useEffect } from 'react'
import Supplier from '../../Interfaces/supplierInterfaces'

interface TableProps {
  suppliers: Supplier[];
  onDeleteSupplier: (id: number) => void;
}

const Table: React.FC<TableProps> = ({ suppliers, onDeleteSupplier }) => {
  return (
        <table className={styles.table}>
        <thead>
            <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Email</td>
            <td>Category</td>
            <td>Description</td>
            <td>Delete</td>
            </tr>
        </thead>
        <tbody>
        {suppliers.length === 0 ? (
          <tr>
            <td colSpan={6}>You haven’t created any suppliers yet</td>
          </tr>
        ) : (
          suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td>{supplier.id}</td>
              <td>{supplier.name}</td>
              <td>{supplier.email_address}</td>
              <td>{supplier.category}</td>
              <td>{supplier.description}</td>
              <td><button onClick={() => onDeleteSupplier(supplier.id)} type="button">Delete</button></td>
            </tr>
          ))
        )}
        </tbody>
        </table>
  );
};

export default Table;