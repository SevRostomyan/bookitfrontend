import React, { useState, useEffect } from 'react';
import { useAuth } from "../../AuthContext";
import '../../assets/BookedClean.css';

const DownloadPdf = () => {
  const {auth} = useAuth();
  const [invoices, setInvoices] = useState([]);

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

    fetchInvoices().then(r => {
    });
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
      <div className="bookings">
        <h2>Mina Fakturor</h2>
        <table>
          <thead>
          <tr>
            <th className="invoice-header">Faktura ID</th>
            <th className="invoice-header">Belopp</th>
            <th className="invoice-header">Fakturadatum</th>
            <th className="invoice-header">Förfallodatum</th>
            <th className="invoice-header">Tjänst</th>
            <th className="invoice-header">Ladda ner PDF</th>
          </tr>
          </thead>
          <tbody>
          {invoices.map((invoice) => (
              <tr key={invoice.id} className="invoice-row">
                <td className="invoice-data">{invoice.id}</td>
                <td className="invoice-data">{invoice.totaltBelopp}</td>
                <td className="invoice-data">{invoice.invoiceDate}</td>
                <td className="invoice-data">{invoice.förfallodatum}</td>
                <td className="invoice-data">{invoice.tjänstTyp || 'Ej tillgänglig'}</td>
                <td className="invoice-data">
                  <button className="user-action-button" onClick={() => downloadInvoice(invoice.id)}>Ladda ner</button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );

}
  export default DownloadPdf;