// src/routes/dataRoutes.js

const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');


router.post('/invoices', dataController.createInvoice);
router.get('/invoices/:invoiceId', dataController.getInvoiceDetails);
router.put('/invoices/:invoiceId/status', dataController.updateInvoiceStatus);
router.get('/invoices/customer/:customerId', dataController.getInvoicesByCustomer);
router.get('/invoices/sales', dataController.getTotalSalesPerCustomer);

module.exports = router;
