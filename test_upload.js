const fs = require('fs');

async function testUpload() {
  console.log("Starting local test script...");
  
  // Create a dummy 1.5MB base64 string (A 1.5MB file is roughly 2MB in base64)
  const dummyBuffer = Buffer.alloc(1.5 * 1024 * 1024, 'a');
  const base64Content = dummyBuffer.toString('base64');
  const dataUrl = `data:application/pdf;base64,${base64Content}`;

  const payload = {
    projectType: 'web-app',
    projectName: 'Test Project',
    projectDescription: 'This is a test project to debug the upload failure',
    estimatedBudget: 'discuss',
    targetDeadline: '2026-12-31',
    name: 'Test Tester',
    email: 'test@example.com',
    fileData: dataUrl,
    fileName: 'test_large_document.pdf'
  };

  try {
    const res = await fetch("http://localhost:3000/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    const text = await res.text();
    console.log(`Status: ${res.status}`);
    console.log(`Response: ${text}`);
    fs.writeFileSync('test_upload_res.txt', text);
  } catch(e) {
    console.error("Fetch failed", e);
  }
}

testUpload();
