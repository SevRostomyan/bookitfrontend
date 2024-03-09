import React, { useState, useEffect } from 'react';

const UploadPdf = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await fetch('http://localhost:7878/api/customer/invoices', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer <JWT>' 
        }
      });

      if (response.ok) {
        const data = await response.json();
        setInvoices(data);
      } else {
        console.error('Något gick fel vid hämtning av fakturor');
      }
    } catch (error) {
      console.error('Något gick fel:', error);
    }
  };

  const downloadInvoice = async (invoiceId) => {
    try {
      const response = await fetch('http://localhost:7878/api/admin/invoices/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          invoiceId: invoiceId
        })
      });

      if (response.ok) {
        // Ladda ner fakturan som PDF här
      } else {
        console.error('Något gick fel vid nedladdning av faktura');
      }
    } catch (error) {
      console.error('Något gick fel:', error);
    }
  };

  return (
    <div>
      <h2>Mina Fakturor</h2>
      <table>
        <thead>
          <tr>
            <th>Faktura ID</th>
            <th>Belopp</th>
            <th>Skapad Datum</th>
            <th>Ladda ner PDF</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.createdDate}</td>
              <td>
                <button onClick={() => downloadInvoice(invoice.id)}>Ladda ner</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadPdf;

