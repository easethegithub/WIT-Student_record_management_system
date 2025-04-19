const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const Student = require('../models/studentModel');

exports.generateStudentPDF = (req, res) => {
  const studentId = req.params.id;

  Student.getById(studentId)
    .then(student => {
      const pdfDir = path.join(__dirname, '../pdfs');
      if (!fs.existsSync(pdfDir)) {
        fs.mkdirSync(pdfDir);
      }

      const filePath = path.join(pdfDir, `student_${studentId}.pdf`);
      const doc = new PDFDocument();
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      doc.fontSize(25).text('Student Report', { align: 'center' }).moveDown();
      doc.fontSize(16).text(`Name: ${student.name}`);
      doc.text(`Roll: ${student.roll}`);
      doc.text(`Department: ${student.department}`);
      doc.text(`Year: ${student.year}`);
      doc.text(`Attendance: ${student.attendance}%`);
      doc.moveDown();

      if (student.subjects?.length) {
        doc.fontSize(18).text('Subjects & Grades:');
        student.subjects.forEach(sub => {
          const grade = student.grades?.[sub] || 'N/A';
          doc.text(`- ${sub}: ${grade}`);
        });
      }

      doc.end();

      stream.on('finish', () => {
        res.status(200).json({
          message: 'PDF generated successfully!',
          downloadLink: `/pdfs/student_${studentId}.pdf`
        });
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Error generating PDF', error: err });
    });
};
