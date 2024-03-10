import React, { useState, useEffect } from 'react';
import { useAuth } from "../../AuthContext";

const DownloadPdf = () => {
  const { auth } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch('http://localhost:7878/api/kund/invoices', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${auth.token}`,
            'Content-Type': 'application/json',
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

    fetchInvoices().then(r =>{} );
  }, [auth.token]); // Lägg till auth.token som en beroende

  const downloadInvoice = async (invoiceId) => {
    try {
      const response = await fetch('http://localhost:7878/api/invoices/download', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          invoiceId: invoiceId
        })
      });

      if (response.ok) {
        // Skapa en URL från svaret
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${invoiceId}.pdf`; // Namnge filen
        document.body.appendChild(a); // Lägg till a-elementet till dokumentet
        a.click(); // Simulera ett klick för att starta nedladdningen
        window.URL.revokeObjectURL(url); // Rensa upp URL:en
        a.remove(); // Ta bort a-elementet från dokumentet
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

export default DownloadPdf;