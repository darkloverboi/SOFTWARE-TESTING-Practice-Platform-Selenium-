import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, Loader2, Plus, Trash2, Edit3 } from "lucide-react";
import { useState, useEffect } from "react";

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  salary: number;
  status: 'Active' | 'Inactive';
}

const AjaxTable = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);

  const sampleEmployees: Employee[] = [
    { id: 1, name: "John Doe", position: "Software Engineer", department: "Engineering", salary: 75000, status: "Active" },
    { id: 2, name: "Jane Smith", position: "Product Manager", department: "Product", salary: 85000, status: "Active" },
    { id: 3, name: "Mike Johnson", position: "Designer", department: "Design", salary: 65000, status: "Inactive" },
    { id: 4, name: "Sarah Wilson", position: "QA Engineer", department: "Quality", salary: 70000, status: "Active" },
    { id: 5, name: "David Brown", position: "DevOps Engineer", department: "Engineering", salary: 80000, status: "Active" },
  ];

  const simulateAjaxCall = async (): Promise<Employee[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Randomly modify data to simulate real-time updates
    return sampleEmployees.map(emp => ({
      ...emp,
      salary: emp.salary + Math.floor(Math.random() * 1000) - 500, // Random salary fluctuation
      status: Math.random() > 0.2 ? emp.status : (emp.status === 'Active' ? 'Inactive' : 'Active')
    }));
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await simulateAjaxCall();
      setEmployees(data);
      setLastUpdated(new Date());
      setUpdateCount(prev => prev + 1);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addRandomEmployee = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newEmployee: Employee = {
      id: employees.length + Math.floor(Math.random() * 1000),
      name: `New Employee ${Math.floor(Math.random() * 100)}`,
      position: ['Developer', 'Analyst', 'Manager'][Math.floor(Math.random() * 3)],
      department: ['Engineering', 'Marketing', 'Sales'][Math.floor(Math.random() * 3)],
      salary: 50000 + Math.floor(Math.random() * 50000),
      status: Math.random() > 0.5 ? 'Active' : 'Inactive'
    };
    
    setEmployees(prev => [...prev, newEmployee]);
    setLastUpdated(new Date());
    setLoading(false);
  };

  const removeEmployee = async (id: number) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setEmployees(prev => prev.filter(emp => emp.id !== id));
    setLastUpdated(new Date());
    setLoading(false);
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
  };

  // Auto refresh effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(() => {
        loadData();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary" id="ajax-table-title">
            🔄 AJAX Table Testing
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Practice handling dynamically updated tables with AJAX calls and real-time data changes.
            Essential for testing modern data-driven applications.
          </p>
        </div>

        {/* Status and Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary" id="employee-count">
                  {employees.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Employees</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary" id="update-count">
                  {updateCount}
                </div>
                <div className="text-sm text-muted-foreground">Updates</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${loading ? 'text-yellow-500' : 'text-green-500'}`} id="table-status">
                  {loading ? 'Loading' : 'Ready'}
                </div>
                <div className="text-sm text-muted-foreground">Status</div>
              </div>
              <div className="text-center">
                <div className={`text-sm font-bold ${autoRefresh ? 'text-blue-500' : 'text-gray-500'}`} id="auto-refresh-status">
                  {autoRefresh ? 'ON' : 'OFF'}
                </div>
                <div className="text-sm text-muted-foreground">Auto Refresh</div>
              </div>
            </div>
            
            {lastUpdated && (
              <div className="mt-4 text-center text-sm text-muted-foreground" id="last-updated">
                Last Updated: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap justify-center gap-2">
              <Button 
                onClick={loadData}
                disabled={loading}
                id="refresh-table-btn"
                variant="default"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Data
                  </>
                )}
              </Button>
              <Button 
                onClick={addRandomEmployee}
                disabled={loading}
                id="add-employee-btn"
                variant="secondary"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
              <Button 
                onClick={toggleAutoRefresh}
                id="toggle-auto-refresh-btn"
                variant={autoRefresh ? "destructive" : "outline"}
              >
                {autoRefresh ? 'Stop Auto Refresh' : 'Start Auto Refresh (5s)'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AJAX Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              Employee Data Table
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {loading && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Updating table data...</p>
                  </div>
                </div>
              )}
              
              <Table id="ajax-employee-table">
                <TableHeader>
                  <TableRow>
                    <TableHead id="header-id">ID</TableHead>
                    <TableHead id="header-name">Name</TableHead>
                    <TableHead id="header-position">Position</TableHead>
                    <TableHead id="header-department">Department</TableHead>
                    <TableHead id="header-salary">Salary</TableHead>
                    <TableHead id="header-status">Status</TableHead>
                    <TableHead id="header-actions">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id} id={`employee-row-${employee.id}`}>
                      <TableCell id={`employee-id-${employee.id}`}>
                        {employee.id}
                      </TableCell>
                      <TableCell id={`employee-name-${employee.id}`}>
                        {employee.name}
                      </TableCell>
                      <TableCell id={`employee-position-${employee.id}`}>
                        {employee.position}
                      </TableCell>
                      <TableCell id={`employee-department-${employee.id}`}>
                        {employee.department}
                      </TableCell>
                      <TableCell id={`employee-salary-${employee.id}`}>
                        ${employee.salary.toLocaleString()}
                      </TableCell>
                      <TableCell id={`employee-status-${employee.id}`}>
                        <span className={`px-2 py-1 rounded text-xs ${
                          employee.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {employee.status}
                        </span>
                      </TableCell>
                      <TableCell id={`employee-actions-${employee.id}`}>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            id={`edit-employee-${employee.id}`}
                          >
                            <Edit3 className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeEmployee(employee.id)}
                            disabled={loading}
                            id={`delete-employee-${employee.id}`}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {employees.length === 0 && !loading && (
                <div className="text-center py-8 text-muted-foreground" id="empty-table">
                  No employees found. Click "Add Employee" to populate the table.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Testing Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Selenium AJAX Table Testing Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">AJAX Wait Strategies:</h3>
                <div className="text-sm space-y-2 text-muted-foreground">
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Wait for table to load<br />
                    WebDriverWait wait = new WebDriverWait(driver, 10);<br />
                    wait.until(ExpectedConditions.presenceOfElementLocated(By.id("ajax-employee-table")));
                  </div>
                  <div className="bg-muted p-2 rounded font-mono text-xs">
                    // Wait for loading to complete<br />
                    wait.until(ExpectedConditions.invisibilityOfElementLocated(By.className("loading")));
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Dynamic Content Testing:</h3>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Count table rows before/after AJAX calls</li>
                  <li>• Wait for loading indicators to disappear</li>
                  <li>• Verify data changes after refresh</li>
                  <li>• Test add/remove operations</li>
                  <li>• Handle stale element exceptions</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">💡 Pro Testing Tips:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Use explicit waits instead of Thread.sleep()</li>
                <li>• Test with different network speeds (throttling)</li>
                <li>• Verify error handling for failed AJAX requests</li>
                <li>• Test concurrent updates and race conditions</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AjaxTable;