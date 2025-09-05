import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
  salary: number;
  joinDate: string;
}

const Tables = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof Employee>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const itemsPerPage = 5;

  const employeeData: Employee[] = [
    { id: 1, name: "John Smith", department: "Engineering", position: "Senior Developer", salary: 85000, joinDate: "2020-03-15" },
    { id: 2, name: "Sarah Johnson", department: "Marketing", position: "Marketing Manager", salary: 72000, joinDate: "2019-07-22" },
    { id: 3, name: "Michael Brown", department: "Engineering", position: "DevOps Engineer", salary: 78000, joinDate: "2021-01-10" },
    { id: 4, name: "Emily Davis", department: "HR", position: "HR Specialist", salary: 58000, joinDate: "2020-11-05" },
    { id: 5, name: "David Wilson", department: "Sales", position: "Sales Representative", salary: 52000, joinDate: "2022-02-18" },
    { id: 6, name: "Lisa Miller", department: "Engineering", position: "QA Tester", salary: 65000, joinDate: "2021-09-12" },
    { id: 7, name: "Robert Taylor", department: "Finance", position: "Financial Analyst", salary: 70000, joinDate: "2020-05-30" },
    { id: 8, name: "Jennifer Anderson", department: "Marketing", position: "Content Writer", salary: 55000, joinDate: "2022-08-14" },
    { id: 9, name: "James Thomas", department: "Engineering", position: "Junior Developer", salary: 62000, joinDate: "2023-01-20" },
    { id: 10, name: "Amanda White", department: "Sales", position: "Sales Manager", salary: 82000, joinDate: "2018-12-03" },
  ];

  const handleSort = (field: keyof Employee) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...employeeData].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    
    if (sortDirection === 'asc') {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    } else {
      return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
    }
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <Layout>
      <div className="space-y-6">
        
        {/* Static Table */}
        <Card id="static-table-card">
          <CardHeader>
            <CardTitle id="static-table-title">Static Employee Table</CardTitle>
          </CardHeader>
          <CardContent>
            <Table id="static-table">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Position</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow id="employee-row-1">
                  <TableCell id="emp-id-1">001</TableCell>
                  <TableCell id="emp-name-1">Alice Cooper</TableCell>
                  <TableCell id="emp-dept-1">IT</TableCell>
                  <TableCell id="emp-pos-1">Software Engineer</TableCell>
                </TableRow>
                <TableRow id="employee-row-2">
                  <TableCell id="emp-id-2">002</TableCell>
                  <TableCell id="emp-name-2">Bob Johnson</TableCell>
                  <TableCell id="emp-dept-2">Marketing</TableCell>
                  <TableCell id="emp-pos-2">Marketing Specialist</TableCell>
                </TableRow>
                <TableRow id="employee-row-3">
                  <TableCell id="emp-id-3">003</TableCell>
                  <TableCell id="emp-name-3">Carol Smith</TableCell>
                  <TableCell id="emp-dept-3">HR</TableCell>
                  <TableCell id="emp-pos-3">HR Manager</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Dynamic Sortable Table with Pagination */}
        <Card id="dynamic-table-card">
          <CardHeader>
            <CardTitle id="dynamic-table-title">Sortable Employee Table with Pagination</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              
              {/* Sort Info */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span id="sort-info">
                  Sorted by: <strong>{sortField}</strong> ({sortDirection})
                </span>
                <span id="page-info">
                  Page {currentPage} of {totalPages} | Showing {paginatedData.length} of {employeeData.length} records
                </span>
              </div>

              {/* Sortable Table */}
              <Table id="sortable-table">
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <button
                        id="sort-id"
                        onClick={() => handleSort('id')}
                        className="text-left hover:text-primary underline"
                      >
                        ID {sortField === 'id' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        id="sort-name"
                        onClick={() => handleSort('name')}
                        className="text-left hover:text-primary underline"
                      >
                        Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        id="sort-department"
                        onClick={() => handleSort('department')}
                        className="text-left hover:text-primary underline"
                      >
                        Department {sortField === 'department' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        id="sort-position"
                        onClick={() => handleSort('position')}
                        className="text-left hover:text-primary underline"
                      >
                        Position {sortField === 'position' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        id="sort-salary"
                        onClick={() => handleSort('salary')}
                        className="text-left hover:text-primary underline"
                      >
                        Salary {sortField === 'salary' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </button>
                    </TableHead>
                    <TableHead>
                      <button
                        id="sort-joindate"
                        onClick={() => handleSort('joinDate')}
                        className="text-left hover:text-primary underline"
                      >
                        Join Date {sortField === 'joinDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((employee, index) => (
                    <TableRow key={employee.id} id={`dynamic-row-${employee.id}`}>
                      <TableCell id={`dynamic-id-${employee.id}`}>{employee.id}</TableCell>
                      <TableCell id={`dynamic-name-${employee.id}`}>{employee.name}</TableCell>
                      <TableCell id={`dynamic-dept-${employee.id}`}>{employee.department}</TableCell>
                      <TableCell id={`dynamic-pos-${employee.id}`}>{employee.position}</TableCell>
                      <TableCell id={`dynamic-sal-${employee.id}`}>${employee.salary.toLocaleString()}</TableCell>
                      <TableCell id={`dynamic-join-${employee.id}`}>{employee.joinDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination Controls */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button
                    id="prev-page"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    variant="outline"
                  >
                    Previous
                  </Button>
                  <Button
                    id="next-page"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    variant="outline"
                  >
                    Next
                  </Button>
                </div>
                
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      id={`page-${page}`}
                      onClick={() => setCurrentPage(page)}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Elements */}
        <Card id="table-test-elements">
          <CardHeader>
            <CardTitle>Table Testing Elements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Available Test Cases:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Static table cell selection</li>
                  <li>• Dynamic table sorting</li>
                  <li>• Pagination navigation</li>
                  <li>• Row and cell data extraction</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Element Locators:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Table IDs: static-table, sortable-table</li>
                  <li>• Row IDs: employee-row-*, dynamic-row-*</li>
                  <li>• Sort buttons: sort-id, sort-name, etc.</li>
                  <li>• Pagination: prev-page, next-page, page-*</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </Layout>
  );
};

export default Tables;