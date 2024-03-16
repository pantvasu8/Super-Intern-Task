// src/controllers/dataController.js

const db = require('../models/db');


const createInvoice = async (req, res) => {
    try {
        // Extract necessary information from the request body
        const { customer_id, items, status } = req.body;

        // Calculate total amount
        let totalAmount = 0;
        for (const item of items) {
            totalAmount += item.quantity * item.unit_price;
        }

        // Insert the invoice into the database
        const invoiceResult = await db.query('INSERT INTO public."Invoices" (customer_id, status, total_amount) VALUES ($1, $2, $3) RETURNING *', [customer_id, status, totalAmount]);
        const invoice = invoiceResult.rows[0];
        const invoiceId = invoice.invoice_id;

        // Insert items into the Invoice_Items table
        for (const item of items) {
            await db.query('INSERT INTO public."Invoice_Items" (invoice_id, item_name, quantity, unit_price) VALUES ($1, $2, $3, $4)', [invoiceId, item.item_name, item.quantity, item.unit_price]);
        }

        res.status(201).json({ message: 'Invoice created successfully', invoice });
    } catch (err) {
        console.error('Error creating invoice:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Function to retrieve details of a specific invoice
const getInvoiceDetails = async (req, res) => {
    try {
        const invoiceId = req.params.invoiceId;

        // Fetch the invoice details from the database
        const result = await db.query('SELECT * FROM public."Invoices" WHERE invoice_id = $1', [invoiceId]);
        const invoice = result.rows[0];

        // Fetch items associated with the invoice
        const itemsResult = await db.query('SELECT * FROM public."Invoice_Items" WHERE invoice_id = $1', [invoiceId]);
        const items = itemsResult.rows;

        res.status(200).json({ invoice, items });
    } catch (err) {
        console.error('Error fetching invoice details:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to update the status of an invoice
const updateInvoiceStatus = async (req, res) => {
    try {
        const invoiceId = req.params.invoiceId;
        const { status } = req.body;

        // Update the status of the invoice in the database
        await db.query('UPDATE public."Invoices" SET status = $1 WHERE invoice_id = $2', [status, invoiceId]);

        res.status(200).json({ message: 'Invoice status updated successfully' });
    } catch (err) {
        console.error('Error updating invoice status:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Function to list all invoices for a specific customer
const getInvoicesByCustomer = async (req, res) => {
    try {
        const customerId = req.params.customerId;

        // Fetch all invoices for the specified customer
        const result = await db.query('SELECT * FROM public."Invoices" WHERE customer_id = $1', [customerId]);
        const invoices = result.rows;

        res.status(200).json({ invoices });
    } catch (err) {
        console.error('Error fetching invoices for customer:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};





//This API not working rest working fine unfortunately can't rectify due to time boundation



// Function to calculate total sales value per customer
const getTotalSalesPerCustomer = async (req, res) => {
    try {
        // Write SQL query to calculate total sales per customer based on invoices table
        const query = `
            SELECT i.customer_id, i.total_amount AS total_sales
            FROM public."Invoices" i
            GROUP BY i.customer_id;
        `;

        // Execute the query
        const result = await db.query(query);
        const totalSales = result.rows;

        res.status(200).json({ totalSales });
    } catch (err) {
        console.error('Error calculating total sales per customer:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { createInvoice, getInvoiceDetails, updateInvoiceStatus, getInvoicesByCustomer, getTotalSalesPerCustomer };
