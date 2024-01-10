import Head from 'next/head'
import Navbar from '../Components/Navbar/Navbar';
import Table from '../Components/Table/Table';
import Supplier from '../Interfaces/supplierInterfaces'
import FloatingModal from '../Components/Modal/FloatingModal';
import CreateSupplierForm from '../Components/Forms/CreateSupplierForm';
import { useState, useEffect } from 'react';

const Suppliers: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmitted = async (newSupplier: Supplier) => {
    try {
      
      const response = await fetch('/api/suppliers/list');
      const updatedData = await response.json();

      if (!response.ok) {
        console.error('HTTP error:', response.status, response.statusText);
        const responseBody = await response.text();
        console.error('Response body:', responseBody);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Fetch the updated list of suppliers
      setSuppliers(updatedData.suppliers);
    } catch (error) {
      console.error('Error listing or fetching data:', error);
      setError('Error listing or fetching data');
    }
  };

  const handleTableDelete = async (id: number) => {
    
    try{
      const response = await fetch(`/api/suppliers/delete/${id}`, {
        method: 'DELETE',
      });

      
      if (!response.ok) {
        console.error('HTTP error:', response.status, response.statusText);
        const responseBody = await response.text();
        console.error('Response body:', responseBody);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const list = await fetch('/api/suppliers/list');
      const updatedData = await list.json();

      // Fetch the updated list of suppliers
      setSuppliers(updatedData.suppliers);
    }catch(error){
      console.error('Error listing or fetching data:', error);
      setError('Error listing or fetching data');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/suppliers/list');
        const data = await response.json();
        setSuppliers(data.suppliers);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
      
  return (
    <>
      <Head>
        <title>Supplier Technologies</title>
        <meta name="description" content="Carbon data Analylitcs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{alignSelf: 'center'}}>Here will found Suplliers List.</p>
          <button onClick={openModal} style={{ marginLeft: 'auto' }}>Create New Supplier</button>
        </div>
        
        <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && <Table suppliers={suppliers} onDeleteSupplier={handleTableDelete}/>}
        <FloatingModal isOpen={isModalOpen} onClose={closeModal}>
        {/* Use a separate component for the form */}
        <CreateSupplierForm 
          onClose={closeModal}
          onSupplierCreated={handleFormSubmitted}
          loading={loading}
          error={error}
        />
      </FloatingModal>
        </div>
    </>
  )
}

export default Suppliers;

