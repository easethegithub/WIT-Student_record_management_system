const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');
const studentController = require('../controllers/studentController');
const pdfController = require('../controllers/pdfController');

// Add student
router.post('/add', verifyToken, allowRoles('admin', 'faculty'), studentController.addStudent);

// Get all students
router.get('/', verifyToken, allowRoles('admin', 'faculty'), studentController.getAllStudents);

// Get student by ID
router.get('/:id', verifyToken, allowRoles('admin', 'faculty'), studentController.getStudentById);

// Update student
router.put('/:id', verifyToken, allowRoles('admin', 'faculty'), studentController.updateStudent);

// Delete student
router.delete('/:id', verifyToken, allowRoles('admin'), studentController.deleteStudent);

// ✅ Generate PDF
router.get('/pdf/:id', verifyToken, allowRoles('admin', 'faculty'), pdfController.generateStudentPDF);

// ✅ Dashboard Stats
router.get('/stats', verifyToken, allowRoles('admin', 'faculty'), studentController.getDashboardStats);

module.exports = router;
