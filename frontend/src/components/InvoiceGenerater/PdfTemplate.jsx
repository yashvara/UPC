import React from "react";
import { saveAs } from "file-saver";
import easyinvoice from "easyinvoice"; 

function PdfTemplate({ order }) {
  const handleGenerateInvoice = () => {
    const data = {
      client: {
        company: "Umiya Powder Coating",
        address: "KALPATRU INDUSTRIAL EASTATE NR KHATRAJ CROSS ROAD, KAROLI,KHATRAJ",
        zip: "382721",
        city: "AHMEDABAD",
        country: "India",
      },
      sender: {
        company: "SAHJANAND LASER TECHNOLOGY LTD",
        address: " A-8 G.I.D.C. ELECTRONIC EASTATE SECTOR-15 ",
        zip: "382016",
        city: "GANDHINAGAR",
        country: "India",
      },
      images: {
        logo: "https://public.easyinvoice.cloud/img/logo_en_original.png",
      },
      information: {
        number: order.order_id.toString(),
        date: order.order_date,
        "due-date": order.due_date,
      },
      products: [
        {
          quantity: "1",
          description: "Order Type: " + order.order_type,
          "tax-rate": order.GST,
          price: order.total_amount_paid,
        },
      ],
      bottomNotice: "Please note: This is just a quotation. The original price may vary. Kindly pay your invoice within 15 days.",
      settings: {
        currency: "INR",
      },
    };

    easyinvoice.createInvoice(data, function (result) {
      const pdfData = "data:application/pdf;base64," + result.pdf;
      saveAs(pdfData, `Invoice_${order.order_id}.pdf`);
    });
  };

  return (
    <div>
      <h2>Invoice Details</h2>
      <p>Order ID: {order.order_id}</p>
      <p>Order Date: {order.order_date}</p>
      <button onClick={handleGenerateInvoice}>Generate Invoice</button>
    </div>
  );
}

export default PdfTemplate;
