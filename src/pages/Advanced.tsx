import { useState, useEffect, useRef, useCallback } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon, Upload, Eye, EyeOff, Download, Search, Bell, MapPin } from "lucide-react";

// Shadow DOM Hook
const useShadowDOM = (hostRef: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (hostRef.current && !hostRef.current.shadowRoot) {
      const shadowRoot = hostRef.current.attachShadow({ mode: 'open' });
      shadowRoot.innerHTML = `
        <style>
          .shadow-input {
            padding: 8px 12px;
            border: 2px solid #e2e8f0;
            border-radius: 6px;
            font-size: 14px;
            width: 200px;
            background: white;
          }
          .shadow-input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
          }
        </style>
        <input type="text" class="shadow-input" placeholder="Shadow DOM Input" id="shadow-input" />
      `;
    }
  }, []);
};

export default function Advanced() {
  const [draggedItem, setDraggedItem] = useState<string>("");
  const [droppedItems, setDroppedItems] = useState<string[]>([]);
  const [scrollItems, setScrollItems] = useState<number[]>(Array.from({length: 20}, (_, i) => i + 1));
  const [tableData, setTableData] = useState([
    { id: 1, name: "John Doe", email: "john@email.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@email.com", status: "Inactive" },
  ]);
  const [date, setDate] = useState<Date>();
  const [sliderValue, setSliderValue] = useState([50]);
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);
  const [isHiddenVisible, setIsHiddenVisible] = useState(false);
  const [customDropdownOpen, setCustomDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [storageValue, setStorageValue] = useState("");
  const [cookieValue, setCookieValue] = useState("");
  const [apiData, setApiData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState<boolean | null>(null);

  const shadowHostRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useShadowDOM(shadowHostRef);

  // Generate random captcha text
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    const length = Math.floor(Math.random() * 3) + 6; // 6-8 characters
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Initialize captcha on component mount
  useEffect(() => {
    setCaptchaText(generateCaptcha());
  }, []);

  // Refresh captcha
  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setCaptchaInput("");
    setCaptchaVerified(null);
    toast("New captcha generated!");
  };

  // Verify captcha
  const verifyCaptcha = () => {
    const isCorrect = captchaInput.toUpperCase() === captchaText.toUpperCase();
    setCaptchaVerified(isCorrect);
    if (isCorrect) {
      toast.success("Captcha verified successfully!");
    } else {
      toast.error("Incorrect captcha code!");
    }
  };

  // Simulate API fetch
  const simulateAPIFetch = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const newData = [
      { id: Date.now(), name: "API User", email: "api@email.com", status: "Loaded" }
    ];
    setApiData(prev => [...prev, ...newData]);
    setIsLoading(false);
    toast("API data loaded successfully!");
  };

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container && container.scrollTop + container.clientHeight >= container.scrollHeight - 5) {
      const newItems = Array.from({length: 10}, (_, i) => scrollItems.length + i + 1);
      setScrollItems(prev => [...prev, ...newItems]);
    }
  }, [scrollItems.length]);

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, item: string) => {
    setDraggedItem(item);
    e.dataTransfer.setData("text/plain", item);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const item = e.dataTransfer.getData("text/plain");
    if (item && !droppedItems.includes(item)) {
      setDroppedItems(prev => [...prev, item]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
    toast(`${files.length} file(s) uploaded!`);
  };

  // Storage functions
  const saveToStorage = () => {
    localStorage.setItem("testValue", storageValue);
    sessionStorage.setItem("testSession", storageValue);
    toast("Saved to local and session storage!");
  };

  const loadFromStorage = () => {
    const local = localStorage.getItem("testValue") || "";
    const session = sessionStorage.getItem("testSession") || "";
    setStorageValue(local || session);
    toast("Loaded from storage!");
  };

  // Cookie functions
  const setCookie = () => {
    document.cookie = `testCookie=${cookieValue}; path=/; max-age=3600`;
    toast("Cookie set successfully!");
  };

  const getCookie = () => {
    const cookies = document.cookie.split(';');
    const testCookie = cookies.find(cookie => cookie.trim().startsWith('testCookie='));
    if (testCookie) {
      setCookieValue(testCookie.split('=')[1]);
      toast("Cookie loaded!");
    } else {
      toast("No cookie found!");
    }
  };

  // Show hidden element after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHiddenVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Simulate geolocation
  const requestGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => toast("Location permission granted!"),
        () => toast("Location permission denied!")
      );
    }
  };

  // Simulate notification
  const requestNotification = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        toast(`Notification permission: ${permission}`);
      });
    }
  };

  // Filter table data
  const filteredTableData = [...tableData, ...apiData].filter(
    item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" id="advanced-title">Advanced Testing Scenarios</h1>
          <p className="text-muted-foreground" id="advanced-description">
            Practice complex Selenium automation scenarios with real-world elements
          </p>
        </div>

        {/* Shadow DOM Section */}
        <Card>
          <CardHeader>
            <CardTitle>Shadow DOM Testing</CardTitle>
            <CardDescription>Test shadow DOM element access</CardDescription>
          </CardHeader>
          <CardContent>
            <div ref={shadowHostRef} id="shadow-host"></div>
            <p className="mt-2 text-sm text-muted-foreground">
              Shadow DOM input field - requires special handling in Selenium
            </p>
          </CardContent>
        </Card>

        {/* Nested IFrames */}
        <Card>
          <CardHeader>
            <CardTitle>Nested IFrames</CardTitle>
            <CardDescription>Multi-level iframe handling practice</CardDescription>
          </CardHeader>
          <CardContent>
            <iframe 
              src="data:text/html,<html><body><h3>Outer Frame</h3><iframe src='data:text/html,<html><body><input type=text placeholder=&quot;Inner Frame Input&quot; id=&quot;inner-input&quot;><button id=&quot;inner-button&quot;>Inner Button</button></body></html>' width=300 height=100></iframe></body></html>"
              width="100%"
              height="200"
              id="outer-iframe"
              className="border rounded"
            />
          </CardContent>
        </Card>

        {/* Drag and Drop */}
        <Card>
          <CardHeader>
            <CardTitle>Drag & Drop Interface</CardTitle>
            <CardDescription>Test drag and drop functionality</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-8">
              <div className="space-y-2">
                <h4 className="font-semibold">Draggable Items</h4>
                {["Item A", "Item B", "Item C"].map(item => (
                  <div
                    key={item}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    className="p-3 bg-secondary rounded cursor-move hover:bg-secondary/80"
                    id={`draggable-${item.toLowerCase().replace(' ', '-')}`}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="flex-1 min-h-[200px] border-2 border-dashed border-muted-foreground/25 rounded-lg p-4"
                id="drop-zone"
              >
                <h4 className="font-semibold mb-2">Drop Zone</h4>
                {droppedItems.map((item, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2">
                    {item}
                  </Badge>
                ))}
                {droppedItems.length === 0 && (
                  <p className="text-muted-foreground">Drop items here...</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Infinite Scroll */}
        <Card>
          <CardHeader>
            <CardTitle>Infinite Scroll Section</CardTitle>
            <CardDescription>Scroll to load more content</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="h-64 overflow-y-auto border rounded p-4 space-y-2"
              id="infinite-scroll-container"
            >
              {scrollItems.map(item => (
                <div key={item} className="p-3 bg-muted rounded" id={`scroll-item-${item}`}>
                  Scroll Item #{item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dynamic AJAX Table */}
        <Card>
          <CardHeader>
            <CardTitle>Dynamic AJAX Table</CardTitle>
            <CardDescription>Searchable table with API simulation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  id="table-search"
                />
              </div>
              <Button 
                onClick={simulateAPIFetch} 
                disabled={isLoading}
                id="load-api-data"
              >
                {isLoading ? "Loading..." : "Load API Data"}
              </Button>
            </div>
            <div className="border rounded">
              <table className="w-full" id="dynamic-table">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">ID</th>
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Email</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTableData.map(user => (
                    <tr key={user.id} className="border-b" id={`table-row-${user.id}`}>
                      <td className="p-3">{user.id}</td>
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">
                        <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                          {user.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Elements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Picker */}
          <Card>
            <CardHeader>
              <CardTitle>Date Picker Widget</CardTitle>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    id="date-picker-trigger"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    id="date-calendar"
                  />
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>

          {/* Slider */}
          <Card>
            <CardHeader>
              <CardTitle>Range Slider</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={1}
                  className="w-full"
                  id="range-slider"
                />
                <p className="text-center" id="slider-value">Value: {sliderValue[0]}</p>
              </div>
            </CardContent>
          </Card>

          {/* Multi-select */}
          <Card>
            <CardHeader>
              <CardTitle>Multi-Select Dropdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["Option 1", "Option 2", "Option 3", "Option 4"].map(option => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedMultiple.includes(option)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMultiple(prev => [...prev, option]);
                        } else {
                          setSelectedMultiple(prev => prev.filter(item => item !== option));
                        }
                      }}
                      id={`multi-select-${option.toLowerCase().replace(' ', '-')}`}
                    />
                    <span>{option}</span>
                  </label>
                ))}
                <p className="text-sm text-muted-foreground">
                  Selected: {selectedMultiple.join(", ") || "None"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Disabled Elements */}
          <Card>
            <CardHeader>
              <CardTitle>Disabled Elements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input disabled placeholder="Disabled input field" id="disabled-input" />
              <Button disabled id="disabled-button">Disabled Button</Button>
            </CardContent>
          </Card>
        </div>

        {/* Hidden Element */}
        <Card>
          <CardHeader>
            <CardTitle>Hidden Element (Explicit Wait)</CardTitle>
            <CardDescription>Element appears after 3 seconds</CardDescription>
          </CardHeader>
          <CardContent>
            {isHiddenVisible ? (
              <div className="p-4 bg-green-100 rounded animate-fade-in" id="hidden-element">
                🎉 Hidden element now visible! (Explicit wait scenario)
              </div>
            ) : (
              <div className="p-4 bg-muted rounded" id="loading-placeholder">
                ⏳ Waiting for element to appear...
              </div>
            )}
          </CardContent>
        </Card>

        {/* Custom Dropdown */}
        <Card>
          <CardHeader>
            <CardTitle>Custom Dropdown (Non-Select)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setCustomDropdownOpen(!customDropdownOpen)}
                className="w-full justify-between"
                id="custom-dropdown-trigger"
              >
                Select Custom Option
                <span className={`transform transition-transform ${customDropdownOpen ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </Button>
              {customDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded shadow-lg z-10" id="custom-dropdown-menu">
                  {["Custom Option A", "Custom Option B", "Custom Option C"].map(option => (
                    <div
                      key={option}
                      className="p-3 hover:bg-muted cursor-pointer"
                      onClick={() => {
                        setCustomDropdownOpen(false);
                        toast(`Selected: ${option}`);
                      }}
                      id={`custom-option-${option.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle>File Upload (Drag & Drop)</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors"
              onDrop={(e) => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files);
                setUploadedFiles(prev => [...prev, ...files]);
                toast(`${files.length} file(s) uploaded via drag & drop!`);
              }}
              onDragOver={(e) => e.preventDefault()}
              id="file-upload-zone"
            >
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="mb-2">Drag & drop files here or</p>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                id="file-upload-button"
              >
                Browse Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileUpload}
                id="file-input"
              />
              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <p className="font-semibold">Uploaded files:</p>
                  {uploadedFiles.map((file, index) => (
                    <p key={index} className="text-sm text-muted-foreground">
                      {file.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Modal Dialog */}
        <Card>
          <CardHeader>
            <CardTitle>Modal Dialog</CardTitle>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button id="modal-trigger">Open Modal</Button>
              </DialogTrigger>
              <DialogContent id="modal-content">
                <DialogHeader>
                  <DialogTitle>Test Modal Dialog</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p>This is a modal dialog for testing purposes.</p>
                  <Input placeholder="Modal input field" className="mt-4" id="modal-input" />
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Tab Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tab1" id="tab-container">
              <TabsList>
                <TabsTrigger value="tab1" id="tab-1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2" id="tab-2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3" id="tab-3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" id="tab-content-1">
                <p>Content for Tab 1 - Testing tab switching scenarios</p>
              </TabsContent>
              <TabsContent value="tab2" id="tab-content-2">
                <p>Content for Tab 2 - Different content for each tab</p>
              </TabsContent>
              <TabsContent value="tab3" id="tab-content-3">
                <p>Content for Tab 3 - Dynamic tab content handling</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Storage & Cookies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Local/Session Storage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Enter value to store"
                value={storageValue}
                onChange={(e) => setStorageValue(e.target.value)}
                id="storage-input"
              />
              <div className="flex gap-2">
                <Button onClick={saveToStorage} id="save-storage">Save</Button>
                <Button onClick={loadFromStorage} variant="outline" id="load-storage">Load</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cookies Demo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Enter cookie value"
                value={cookieValue}
                onChange={(e) => setCookieValue(e.target.value)}
                id="cookie-input"
              />
              <div className="flex gap-2">
                <Button onClick={setCookie} id="set-cookie">Set Cookie</Button>
                <Button onClick={getCookie} variant="outline" id="get-cookie">Get Cookie</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Permissions */}
        <Card>
          <CardHeader>
            <CardTitle>Permission Popups</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button onClick={requestGeolocation} variant="outline" id="geolocation-btn">
              <MapPin className="mr-2 h-4 w-4" />
              Request Location
            </Button>
            <Button onClick={requestNotification} variant="outline" id="notification-btn">
              <Bell className="mr-2 h-4 w-4" />
              Request Notifications
            </Button>
          </CardContent>
        </Card>

        {/* Tooltips & Hover Effects */}
        <Card>
          <CardHeader>
            <CardTitle>Tooltips & Hover Effects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" id="tooltip-button">Hover for tooltip</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This is a tooltip message!</p>
                </TooltipContent>
              </Tooltip>
              
              <div
                className="p-4 bg-secondary rounded cursor-pointer hover:bg-secondary/80 transition-colors"
                onDoubleClick={() => toast("Double clicked!")}
                onContextMenu={(e) => {
                  e.preventDefault();
                  toast("Right clicked!");
                }}
                id="hover-element"
              >
                Hover, Double-click, or Right-click me
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dynamic Captcha */}
        <Card>
          <CardHeader>
            <CardTitle>Dynamic Captcha</CardTitle>
            <CardDescription>Interactive captcha with refresh functionality</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div 
                className="relative p-4 bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-dashed border-gray-400 rounded font-mono text-lg tracking-wider select-none" 
                id="captcha-display"
                style={{
                  background: `linear-gradient(45deg, #f0f9ff, #faf5ff),
                              repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)`,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  letterSpacing: '0.2em'
                }}
              >
                {captchaText}
                <div className="absolute inset-0 pointer-events-none">
                  <svg width="100%" height="100%" className="absolute inset-0">
                    <line x1="0" y1="50%" x2="100%" y2="30%" stroke="rgba(0,0,0,0.2)" strokeWidth="1"/>
                    <line x1="0" y1="30%" x2="100%" y2="70%" stroke="rgba(0,0,0,0.2)" strokeWidth="1"/>
                  </svg>
                </div>
              </div>
              <Button variant="outline" onClick={refreshCaptcha} id="captcha-refresh">
                🔄 Refresh
              </Button>
            </div>
            <div className="mt-4 space-y-2">
              <Input 
                placeholder="Enter captcha code" 
                className="max-w-xs" 
                id="captcha-input"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
              />
              <Button onClick={verifyCaptcha} id="captcha-verify">
                Verify Captcha
              </Button>
              {captchaVerified !== null && (
                <p className={`text-sm ${captchaVerified ? 'text-green-600' : 'text-red-600'}`} id="captcha-result">
                  {captchaVerified ? '✅ Captcha verified successfully!' : '❌ Incorrect captcha code'}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}