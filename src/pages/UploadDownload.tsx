import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UploadDownload = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
    setUploadStatus("");
    setUploadProgress(0);
  };

  const handleUpload = () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setUploadStatus("Please select a file first.");
      return;
    }

    setUploadStatus("Uploading...");
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus("Upload completed successfully!");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleDownloadText = () => {
    const content = `DLB Software Testing Web - Sample Text File
    
This is a sample text file for download testing.

File Details:
- Generated: ${new Date().toLocaleString()}
- Purpose: Selenium automation testing
- Type: Plain text (.txt)

Test Instructions:
1. Click the download button
2. Verify file is downloaded to default directory
3. Open file and verify content matches this template
4. Check file name and extension

This file can be used to test:
- File download functionality
- Default download location
- File handling in automation scripts
- Content verification

End of sample file.`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-text-file.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleDownloadPdf = () => {
    // Create a simple PDF-like content (actually HTML that looks like PDF info)
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(Sample PDF for Testing) Tj
ET
endstream
endobj

xref
0 5
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000110 00000 n 
0000000181 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
279
%%EOF`;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-document.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleDownloadImage = () => {
    // Create a simple SVG image for download
    const svgContent = `<svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="100" fill="#3b82f6"/>
      <text x="100" y="50" text-anchor="middle" fill="white" font-family="Arial" font-size="16">Test Image</text>
      <text x="100" y="70" text-anchor="middle" fill="white" font-family="Arial" font-size="12">${new Date().toLocaleDateString()}</text>
    </svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test-image.svg';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* File Upload Section */}
        <Card id="upload-card">
          <CardHeader>
            <CardTitle id="upload-title">File Upload Testing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-input">Select File(s) to Upload</Label>
              <Input
                id="file-input"
                name="fileUpload"
                type="file"
                multiple
                onChange={handleFileSelect}
                accept=".txt,.pdf,.jpg,.jpeg,.png,.gif,.doc,.docx"
              />
            </div>

            {selectedFiles && (
              <div id="selected-files" className="space-y-2">
                <h4 className="font-medium">Selected Files:</h4>
                <ul className="text-sm space-y-1">
                  {Array.from(selectedFiles).map((file, index) => (
                    <li key={index} id={`selected-file-${index}`} className="text-muted-foreground">
                      {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Button 
              id="upload-button"
              onClick={handleUpload}
              disabled={!selectedFiles || uploadProgress > 0 && uploadProgress < 100}
            >
              Upload Files
            </Button>

            {uploadProgress > 0 && (
              <div id="upload-progress" className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Upload Progress</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {uploadStatus && (
              <div 
                id="upload-status"
                className={`p-3 rounded-md ${
                  uploadStatus.includes('completed') 
                    ? 'bg-success/10 text-success-foreground border border-success/20'
                    : uploadStatus.includes('Please')
                    ? 'bg-warning/10 text-warning-foreground border border-warning/20'
                    : 'bg-primary/10 text-primary-foreground border border-primary/20'
                }`}
              >
                {uploadStatus}
              </div>
            )}
          </CardContent>
        </Card>

        {/* File Download Section */}
        <Card id="download-card">
          <CardHeader>
            <CardTitle id="download-title">File Download Testing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="space-y-2">
                <h4 className="font-medium">Text File Download</h4>
                <p className="text-sm text-muted-foreground">
                  Download a sample text file with testing content
                </p>
                <Button 
                  id="download-text-button"
                  onClick={handleDownloadText}
                  variant="outline"
                  className="w-full"
                >
                  Download Sample.txt
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">PDF File Download</h4>
                <p className="text-sm text-muted-foreground">
                  Download a sample PDF document
                </p>
                <Button 
                  id="download-pdf-button"
                  onClick={handleDownloadPdf}
                  variant="outline"
                  className="w-full"
                >
                  Download Sample.pdf
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Image File Download</h4>
                <p className="text-sm text-muted-foreground">
                  Download a sample SVG image file
                </p>
                <Button 
                  id="download-image-button"
                  onClick={handleDownloadImage}
                  variant="outline"
                  className="w-full"
                >
                  Download Test Image.svg
                </Button>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Multiple Downloads</h4>
                <p className="text-sm text-muted-foreground">
                  Download all sample files at once
                </p>
                <Button 
                  id="download-all-button"
                  onClick={() => {
                    handleDownloadText();
                    setTimeout(handleDownloadPdf, 500);
                    setTimeout(handleDownloadImage, 1000);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Download All Files
                </Button>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Testing Instructions */}
        <Card id="instructions-card">
          <CardHeader>
            <CardTitle>Testing Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Upload Testing:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Select single or multiple files</li>
                  <li>• Verify file validation</li>
                  <li>• Test upload progress indication</li>
                  <li>• Check file size and type restrictions</li>
                  <li>• Test error handling for invalid files</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Download Testing:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Verify files download to correct location</li>
                  <li>• Test different file types (txt, pdf, svg)</li>
                  <li>• Check file integrity after download</li>
                  <li>• Test multiple simultaneous downloads</li>
                  <li>• Verify correct file names and extensions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </Layout>
  );
};

export default UploadDownload;