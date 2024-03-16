const request = require('supertest');
const app = require('../../src/app');

describe('Data API', () => {
    // Add your beforeEach hook to seed the database or perform other setup tasks

    it('should create a new invoice', async () => {
        const newInvoice = {
            customer_id: 1,
            items: [
                { item_name: 'Item 1', quantity: 2, unit_price: 10 },
                { item_name: 'Item 2', quantity: 3, unit_price: 15 }
            ],
            status: 'Pending'
        };
        const res = await request(app).post('/api/invoices').send(newInvoice);
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('Invoice created successfully');
        expect(res.body.invoice).toBeDefined();
        // Add more assertions to validate the created invoice
    });

    it('should retrieve details of a specific invoice', async () => {
        const invoiceId = 1; // Replace with a valid invoice ID
        const res = await request(app).get(`/api/invoices/${invoiceId}`);
        expect(res.statusCode).toEqual(200);
        // Add more assertions to validate the retrieved invoice details
    });

    it('should update the status of an invoice', async () => {
        const invoiceId = 1; // Replace with a valid invoice ID
        const updatedStatus = { status: 'Paid' };
        const res = await request(app).put(`/api/invoices/${invoiceId}/status`).send(updatedStatus);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Invoice status updated successfully');
        // Add more assertions to validate the updated invoice status
    });

    it('should list all invoices for a specific customer', async () => {
        const customerId = 1; // Replace with a valid customer ID
        const res = await request(app).get(`/api/invoices/customer/${customerId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.invoices).toBeDefined();
        // Add more assertions to validate the list of invoices for the customer
    });
    /*
        it('should calculate total sales value per customer', async () => {
            const res = await request(app).get('/api/invoices/sales');
            expect(res.statusCode).toEqual(200);
            expect(res.body.totalSales).toBeDefined();
            // Add more assertions to validate the total sales value per customer
        });*/
});

