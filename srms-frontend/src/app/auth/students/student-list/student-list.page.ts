import { Component } from '@angular/core';
import { StudentService, Student } from '../student.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.page.html',
  styleUrls: ['./student-list.page.scss'],
  standalone:false,
})
export class StudentListPage {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  searchQuery: string = '';
  selectedDepartment: string = '';
  selectedYear: number | '' = '';
  userRole: string | null = null;

  totalStudents: number = 0;
  avgAttendance: number = 0;

  departments: string[] = ['CSE', 'IT', 'ECE', 'MECH', 'CIVIL'];
  years: number[] = [1, 2, 3, 4];

  constructor(
    private studentService: StudentService,
    private router: Router,
    private auth: AuthService
  ) {}

  ionViewWillEnter() {
    this.userRole = this.auth.getUserRole();
    this.fetchStudents();
    this.loadDashboardStats();
  }

  loadDashboardStats() {
    this.studentService.getDashboardStats().subscribe(stats => {
      this.totalStudents = stats.total;
      this.avgAttendance = stats.avgAttendance;
    });
  }

  fetchStudents() {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
      this.filterStudents();
    });
  }

  filterStudents() {
    this.filteredStudents = this.students.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || s.roll.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchDept = this.selectedDepartment ? s.department === this.selectedDepartment : true;
      const matchYear = this.selectedYear ? s.year === +this.selectedYear : true;
      return matchSearch && matchDept && matchYear;
    });
  }

  editStudent(id: number) {
    this.router.navigate(['/students/student-form'], { queryParams: { id } });
  }

  deleteStudent(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(() => this.fetchStudents());
    }
  }

  downloadPDF(id: number) {
    this.studentService.generatePDF(id).subscribe(res => {
      if (res?.downloadLink) {
        window.open(`http://localhost:5000${res.downloadLink}`, '_blank');
      } else {
        alert('Failed to generate PDF.');
      }
    });
  }

  logout() {
    this.auth.logout();
  }
}
