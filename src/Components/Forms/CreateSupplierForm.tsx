import React, { useState } from 'react';
import styles from './CreateSupplierForm.module.css'; // Import your CSS module

interface CreateSupplierFormProps {
  onClose: () => void;
  onSupplierCreated: (newSupplier: any) => void;
  loading?: boolean;
  error?: string | null;
}

interface FormData {
  name: string;
  emailAddress: string;
  category: string;
  description: string;
}

const CreateSupplierForm: React.FC<CreateSupplierFormProps> = ({ onClose, onSupplierCreated, loading, error }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    emailAddress: '',
    category: '',
    description: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      emailAddress: '',
      category: '',
      description: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  

  const handleCreateSupplier = async () => {
    console.log('Entrou aqui');
    // Check if all required fields are filled
    if (!formData.name || !formData.emailAddress || !formData.category) {
      window.alert('Please fill in all required fields.');
      return;
    }

    try {
      // Make the HTTP POST request to your backend using fetch
      const response = await fetch('/api/suppliers/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      // Invoke the callback with the new supplier data
      onSupplierCreated(responseData);

      //Reset the form state
      resetForm();

      // Close the modal after creating the supplier
      onClose();
    } catch (error: any) {
      console.error('Error creating supplier:', (error as Error).message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Create New Supplier</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className={styles.formField}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </label>
      </div>
      <div className={styles.formField}>
        <label>
          Email Address:
          <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleInputChange} required />
        </label>
      </div>
      <div className={styles.formField}>
        <label>
          Category:
          <select name="category" value={formData.category} onChange={handleInputChange} required>
            <option value="">Select Category</option>
            <option value="Services">Services</option>
            <option value="Sub-contractors">Sub-contractors</option>
            <option value="Manufacturers">Manufacturers</option>
            <option value="Distributors">Distributors</option>
            <option value="Importers">Importers</option>
          </select>
        </label>
      </div>
      <div className={styles.formField}>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleInputChange} required></textarea>
        </label>
      </div>
      <div className={styles.formField}>
        <button type="button" onClick={handleCreateSupplier} disabled={loading}>
          {loading ? 'Creating...' : 'Save Supplier'}
        </button>
      </div>
    </div>
  );
};

export default CreateSupplierForm;