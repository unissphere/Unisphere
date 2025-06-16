import React, { useState, useRef } from 'react';

const UploadNotes = () => {
  const fileInputRef = useRef(null);
  
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [notesTitle, setNotesTitle] = useState('');
  const [notesDescription, setNotesDescription] = useState('');

  const categories = [
    'Lecture Notes',
    'Study Materials',
    'Research Papers',
    'Assignments',
    'Lab Reports',
    'Presentations',
    'Reference Materials'
  ];

  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Computer Science',
    'Engineering',
    'Biology',
    'Business',
    'Economics',
    'Psychology',
    'Literature',
    'History',
    'Other'
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter(file => {
      const validTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'image/jpeg',
        'image/png',
        'image/gif'
      ];
      return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024; // 10MB limit
    });

    const newFiles = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadProgress: 0,
      status: 'pending'
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Simulate file upload progress
    newFiles.forEach(fileObj => {
      simulateUpload(fileObj.id);
    });
  };

  const simulateUpload = (fileId) => {
    const interval = setInterval(() => {
      setUploadedFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          const newProgress = Math.min(file.uploadProgress + Math.random() * 20, 100);
          return {
            ...file,
            uploadProgress: newProgress,
            status: newProgress === 100 ? 'completed' : 'uploading'
          };
        }
        return file;
      }));
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setUploadedFiles(prev => prev.map(file => {
        if (file.id === fileId) {
          return { ...file, uploadProgress: 100, status: 'completed' };
        }
        return file;
      }));
    }, 2000);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('image')) return '🖼️';
    if (fileType.includes('text')) return '📃';
    return '📁';
  };

  const handleSaveNotes = () => {
    if (!notesTitle.trim() || !selectedCategory || !selectedSubject || uploadedFiles.length === 0) {
      alert('Please fill in all required fields and upload at least one file.');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('Notes uploaded successfully!');
      // In a real app, you'd navigate here - for demo purposes, we'll just reset the form
      setNotesTitle('');
      setNotesDescription('');
      setSelectedCategory('');
      setSelectedSubject('');
      setUploadedFiles([]);
    }, 2000);
  };

  const handleBackToStudy = () => {
    // In a real app, you'd use navigate here
    alert('Navigation would happen here in a real app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-300 via-pink-200 to-orange-200">
      {/* Header */}
      <div className="w-full bg-white/60 backdrop-blur-2xl shadow-lg">
        <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 relative">
              <div className="absolute inset-0 border-2 border-red-400 rounded-full"></div>
              <div className="absolute top-0 left-1/2 w-0.5 h-full bg-red-400 transform -translate-x-0.5"></div>
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-400 transform -translate-y-0.5"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-red-400">U</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
              Upload Notes
            </h1>
          </div>
          <button 
            onClick={handleBackToStudy}
            className="text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            ← back to study assistant
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white/60 backdrop-blur-2xl rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8 space-y-8">
            
            {/* Notes Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-red-500">Notes Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-red-500 font-medium mb-2">
                    Notes Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={notesTitle}
                    onChange={(e) => setNotesTitle(e.target.value)}
                    placeholder="Enter a descriptive title for your notes"
                    className="w-full px-4 py-3 rounded-xl border border-red-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-300 text-red-700 placeholder-red-400"
                  />
                </div>

                <div>
                  <label className="block text-red-500 font-medium mb-2">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-red-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-300 text-red-700"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-red-500 font-medium mb-2">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-red-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-300 text-red-700"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-red-500 font-medium mb-2">Description</label>
                  <textarea
                    value={notesDescription}
                    onChange={(e) => setNotesDescription(e.target.value)}
                    placeholder="Add a brief description of your notes (optional)"
                    className="w-full px-4 py-3 rounded-xl border border-red-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-red-300 text-red-700 placeholder-red-400 resize-none"
                    rows="3"
                  />
                </div>
              </div>
            </div>

            {/* File Upload Area */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-red-500">Upload Files</h2>
              
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-red-400 bg-red-50' 
                    : 'border-red-200 bg-white/50 hover:border-red-300 hover:bg-red-50/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileInput}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="space-y-4">
                  <div className="text-6xl">📁</div>
                  <div>
                    <p className="text-xl font-medium text-red-600 mb-2">
                      Drop files here or click to browse
                    </p>
                    <p className="text-red-400">
                      Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG, GIF
                    </p>
                    <p className="text-sm text-red-400">Maximum file size: 10MB</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-xl font-medium hover:from-red-500 hover:to-red-600 transition-all duration-300"
                  >
                    Choose Files
                  </button>
                </div>
              </div>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-red-500">Uploaded Files</h3>
                <div className="space-y-3">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="bg-white/70 rounded-xl p-4 border border-red-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          <span className="text-2xl">{getFileIcon(file.type)}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-red-700 font-medium truncate">{file.name}</p>
                            <p className="text-red-400 text-sm">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          {file.status === 'uploading' && (
                            <div className="w-24">
                              <div className="bg-red-100 rounded-full h-2">
                                <div 
                                  className="bg-red-400 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${file.uploadProgress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-red-400 mt-1">{Math.round(file.uploadProgress)}%</p>
                            </div>
                          )}
                          
                          {file.status === 'completed' && (
                            <span className="text-green-500 text-sm font-medium">✓ Uploaded</span>
                          )}
                          
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-red-400 hover:text-red-600 transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end pt-6">
              <button
                onClick={handleSaveNotes}
                disabled={isProcessing}
                className={`px-8 py-3 bg-gradient-to-r from-red-400 to-red-500 text-white rounded-xl font-medium ${
                  isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:from-red-500 hover:to-red-600'
                } transition-all duration-300`}
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Save Notes'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadNotes;