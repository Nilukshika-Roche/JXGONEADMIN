import React, { useState } from 'react';

const LinkedInPageEditor = ({ onClose, companyData, setCompanyData }) => {
  // State for form fields
  const [activeEditTab, setActiveEditTab] = useState('overview');
  const [companyInfo, setCompanyInfo] = useState({
    name: companyData.name || '',
    location: companyData.location || '',
    description: companyData.description || '',
    tagline: companyData.tagline || '',
    website: companyData.website || '',
    phone: companyData.phone || '',
    industry: companyData.industry || '',
    companySize: companyData.companySize || '',
    founded: companyData.founded || '',
    headquarters: companyData.headquarters || '',
    linkedinUrl: companyData.linkedinUrl || '',
    logo: companyData.logo || '',
    coverPhoto: companyData.coverPhoto || '',
    overview: companyData.overview || '',
    products: Array.isArray(companyData.products) ? companyData.products : [],
    services: Array.isArray(companyData.services) ? companyData.services : [],
    awards: Array.isArray(companyData.awards) ? companyData.awards : []
  });

  // State for character count
  const [taglineCount, setTaglineCount] = useState(companyInfo.tagline.length);



  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'tagline') {
      const count = value.length;
      setTaglineCount(count);
    }

    setCompanyInfo({
      ...companyInfo,
      [name]: value
    });
  };

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCompanyInfo({
          ...companyInfo,
          logo: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle cover upload
  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCompanyInfo({
          ...companyInfo,
          coverPhoto: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setCompanyData(companyInfo);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="linkedin-editor modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="editor-header">
          <div className="header-top">
            <div className="edit-label">Edit Page</div>
            <div className="header-right">
              <div className="header-info">Page info</div>
              <div className="header-buttons">
                <button className="btn-secondary" onClick={onClose}>Cancel</button>
                <button className="btn-primary" onClick={handleSubmit}>Save</button>
              </div>
            </div>
          </div>

        </header>

        <div className="editor-main">
          {/* Main content */}
          <div className="editor-content">
            <div className="page-header">
              <h2>Page info</h2>
              <p className="required-info">* indicates required</p>
            </div>

            <form onSubmit={handleSubmit} className="company-form">
              {/* Logo upload */}
              <div className="form-section span-4">
                <label className="form-label">Logo</label>
                <div className="logo-upload">
                  <div className="logo-preview">
                    {companyInfo.logo ? (
                      <img src={companyInfo.logo} alt="Company logo" />
                    ) : (
                      <div className="logo-placeholder">
                        <span className="logo-icon">{companyInfo.name.substring(0, 2).toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                  <div className="logo-upload-controls">
                    <input
                      type="file"
                      id="logo-upload"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      style={{ display: 'none' }}
                    />
                    <div className="logo-actions">
                      <label htmlFor="logo-upload" className="btn-upload">
                        {companyInfo.logo ? 'Change' : 'Upload'}
                      </label>
                      {companyInfo.logo && (
                        <button
                          type="button"
                          className="btn-remove"
                          onClick={() => setCompanyInfo({ ...companyInfo, logo: '' })}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover photo upload */}
              <div className="form-section span-8">
                <label className="form-label">Cover image</label>
                <div className="cover-upload-container">
                  <div className="cover-preview">
                    {companyInfo.coverPhoto ? (
                      <img src={companyInfo.coverPhoto} alt="Cover preview" />
                    ) : (
                      <div className="cover-placeholder">
                        <span>No cover photo</span>
                      </div>
                    )}
                  </div>
                  <div className="logo-upload-controls">
                    <input
                      type="file"
                      id="cover-upload"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      style={{ display: 'none' }}
                    />
                    <div className="logo-actions">
                      <label htmlFor="cover-upload" className="btn-upload">
                        {companyInfo.coverPhoto ? 'Change' : 'Upload'}
                      </label>
                      {companyInfo.coverPhoto && (
                        <button
                          type="button"
                          className="btn-remove"
                          onClick={() => setCompanyInfo({ ...companyInfo, coverPhoto: '' })}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Company name */}
              <div className="form-section span-6">
                <label className="form-label required">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={companyInfo.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter company name"
                  required
                />
              </div>

              {/* Location */}
              <div className="form-section span-6">
                <label className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={companyInfo.location}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g. Colombo, Sri Lanka"
                />
              </div>

              {/* Website */}
              <div className="form-section span-6">
                <label className="form-label">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  value={companyInfo.website}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g. www.janashakthigroup.com"
                />
              </div>


              {/* Tagline */}
              <div className="form-section span-6">
                <label className="form-label">
                  Tagline
                  <span className="char-counter">{taglineCount}/120</span>
                </label>
                <textarea
                  name="tagline"
                  value={companyInfo.tagline}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Enter your company tagline"
                  maxLength="120"
                />
              </div>

              {/* About Sections */}
              <div className="form-group-separator span-12" id="about-form-section">
                <h3 className="separator-title">About Sections</h3>
                <p className="separator-hint">Manage your company's detailed information</p>

                <div className="edit-tabs">
                  <button
                    type="button"
                    className={`edit-tab-btn ${activeEditTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveEditTab('overview')}
                  >
                    Overview
                  </button>
                  <button
                    type="button"
                    className={`edit-tab-btn ${activeEditTab === 'products' ? 'active' : ''}`}
                    onClick={() => setActiveEditTab('products')}
                  >
                    Products & Services
                  </button>
                  <button
                    type="button"
                    className={`edit-tab-btn ${activeEditTab === 'awards' ? 'active' : ''}`}
                    onClick={() => setActiveEditTab('awards')}
                  >
                    Awards & Recognitions
                  </button>
                </div>
              </div>

              {/* Overview */}
              {/* Overview */}
              {activeEditTab === 'overview' && (
                <>
                  <div className="form-section span-12">
                    <label className="form-label">
                      Overview
                    </label>
                    <textarea
                      name="overview"
                      value={companyInfo.overview}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Provide a detailed overview of the company"
                      rows="5"
                    />
                  </div>

                  {/* Company Details Fields */}
                  <div className="form-section span-6">
                    <label className="form-label">Website</label>
                    <input
                      type="text"
                      name="website"
                      value={companyInfo.website}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Website URL"
                    />
                  </div>
                  <div className="form-section span-6">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={companyInfo.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="+94 ..."
                    />
                  </div>
                  <div className="form-section span-6">
                    <label className="form-label">Industry</label>
                    <input
                      type="text"
                      name="industry"
                      value={companyInfo.industry}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="e.g. Insurance"
                    />
                  </div>
                  <div className="form-section span-6">
                    <label className="form-label">Company Size</label>
                    <input
                      type="text"
                      name="companySize"
                      value={companyInfo.companySize}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="e.g. 1000+ employees"
                    />
                  </div>
                  <div className="form-section span-6">
                    <label className="form-label">Headquarters</label>
                    <input
                      type="text"
                      name="headquarters"
                      value={companyInfo.headquarters}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="form-section span-6">
                    <label className="form-label">Founded</label>
                    <input
                      type="text"
                      name="founded"
                      value={companyInfo.founded}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Year"
                    />
                  </div>
                </>
              )}

              {/* Products & Services List */}
              {activeEditTab === 'products' && (
                <div className="form-section span-12">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

                    {/* Products Column */}
                    <div>
                      <div className="list-headers" style={{ padding: '0 0 8px', marginBottom: '8px' }}>
                        <label className="form-label col-header">Products</label>
                      </div>
                      <div className="items-list">
                        {companyInfo.products.map((item, index) => (
                          <div key={item.id} className="list-item-row">
                            <input
                              type="text"
                              placeholder="Product Name"
                              value={item.name}
                              onChange={(e) => {
                                const newProducts = [...companyInfo.products];
                                newProducts[index].name = e.target.value;
                                setCompanyInfo({ ...companyInfo, products: newProducts });
                              }}
                              className="form-input item-name"
                            />
                            <button type="button" className="btn-remove-item" onClick={() => {
                              const newProducts = companyInfo.products.filter(p => p.id !== item.id);
                              setCompanyInfo({ ...companyInfo, products: newProducts });
                            }}>×</button>
                          </div>
                        ))}
                        {companyInfo.products.length === 0 && (
                          <div className="empty-list-message">No products added.</div>
                        )}
                      </div>
                      <button type="button" className="btn-add-item-large" onClick={() => {
                        const newItem = { id: Date.now(), name: '' };
                        setCompanyInfo({ ...companyInfo, products: [...companyInfo.products, newItem] });
                      }}>+ Add Product</button>
                    </div>

                    {/* Services Column */}
                    <div>
                      <div className="list-headers" style={{ padding: '0 0 8px', marginBottom: '8px' }}>
                        <label className="form-label col-header">Services</label>
                      </div>
                      <div className="items-list">
                        {companyInfo.services.map((item, index) => (
                          <div key={item.id} className="list-item-row">
                            <input
                              type="text"
                              placeholder="Service Name"
                              value={item.name}
                              onChange={(e) => {
                                const newServices = [...companyInfo.services];
                                newServices[index].name = e.target.value;
                                setCompanyInfo({ ...companyInfo, services: newServices });
                              }}
                              className="form-input item-name"
                            />
                            <button type="button" className="btn-remove-item" onClick={() => {
                              const newServices = companyInfo.services.filter(s => s.id !== item.id);
                              setCompanyInfo({ ...companyInfo, services: newServices });
                            }}>×</button>
                          </div>
                        ))}
                        {companyInfo.services.length === 0 && (
                          <div className="empty-list-message">No services added.</div>
                        )}
                      </div>
                      <button type="button" className="btn-add-item-large" onClick={() => {
                        const newItem = { id: Date.now(), name: '' };
                        setCompanyInfo({ ...companyInfo, services: [...companyInfo.services, newItem] });
                      }}>+ Add Service</button>
                    </div>

                  </div>
                </div>
              )}

              {/* Awards List */}
              {activeEditTab === 'awards' && (
                <div className="form-section span-12">
                  <label className="form-label">
                    Awards & Recognitions
                    <button type="button" className="btn-add-item" onClick={() => {
                      const newItem = { id: Date.now(), title: '', date: '', description: '' };
                      setCompanyInfo({ ...companyInfo, awards: [...companyInfo.awards, newItem] });
                    }}>+ Add Award</button>
                  </label>
                  <div className="items-list">
                    {companyInfo.awards.map((item, index) => (
                      <div key={item.id} className="list-item-card">
                        <div className="list-row-top">
                          <input
                            type="text"
                            placeholder="Award Title"
                            value={item.title}
                            onChange={(e) => {
                              const newAwards = [...companyInfo.awards];
                              newAwards[index].title = e.target.value;
                              setCompanyInfo({ ...companyInfo, awards: newAwards });
                            }}
                            className="form-input item-title"
                          />
                          <input
                            type="text"
                            placeholder="Date/Year"
                            value={item.date}
                            onChange={(e) => {
                              const newAwards = [...companyInfo.awards];
                              newAwards[index].date = e.target.value;
                              setCompanyInfo({ ...companyInfo, awards: newAwards });
                            }}
                            className="form-input item-date"
                          />
                          <button type="button" className="btn-remove-item" onClick={() => {
                            const newAwards = companyInfo.awards.filter(a => a.id !== item.id);
                            setCompanyInfo({ ...companyInfo, awards: newAwards });
                          }}>×</button>
                        </div>
                        <textarea
                          placeholder="Award Description"
                          value={item.description}
                          onChange={(e) => {
                            const newAwards = [...companyInfo.awards];
                            newAwards[index].description = e.target.value;
                            setCompanyInfo({ ...companyInfo, awards: newAwards });
                          }}
                          className="form-input item-desc"
                          rows="2"
                        />
                      </div>
                    ))}
                    {companyInfo.awards.length === 0 && (
                      <div className="empty-list-message">No awards added yet.</div>
                    )}
                  </div>
                </div>
              )}


            </form>
          </div>

        </div>

        <style>{`
          .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            backdrop-filter: blur(4px);
          }

          .modal-content {
            width: 90%;
            max-width: 900px;
            max-height: 90vh;
            overflow-y: auto;
            border-radius: 12px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            animation: modalFadeIn 0.3s ease-out;
          }

          @keyframes modalFadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .linkedin-editor {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background-color: #f8f9fa;
          }

          /* Header styles */
          .editor-header {
            background-color: #fff;
            border-bottom: 1px solid #e0e0e0;
            position: sticky;
            top: 0;
            z-index: 10;
          }

          .header-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px 24px;
            border-bottom: 1px solid #f0f0f0;
          }

          .edit-label {
            font-size: 20px;
            font-weight: 600;
            color: #000;
          }

          .header-right {
            display: flex;
            align-items: center;
            gap: 24px;
          }

          .header-info {
            color: #666;
            font-size: 14px;
          }

          .header-buttons {
            display: flex;
            gap: 8px;
          }

          .btn-primary, .btn-secondary {
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            border: none;
            transition: all 0.2s;
          }

          .btn-primary {
            background-color: #0a66c2;
            color: white;
          }

          .btn-primary:hover {
            background-color: #004182;
          }

          .btn-secondary {
            background-color: transparent;
            color: #666;
            border: 1px solid #ccc;
          }

          .btn-secondary:hover {
            background-color: #f5f5f5;
          }


          /* Main content layout */
          .editor-main {
            padding: 12px 24px;
            display: block;
          }

          .editor-content {
            width: 100%;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            padding: 20px 24px;
            box-sizing: border-box;
          }

          /* Page header */
          .page-header {
            margin-bottom: 16px;
          }

          .page-header h2 {
            font-size: 20px;
            font-weight: 600;
            color: #000;
            margin: 0;
          }

          .required-info {
            font-size: 12px;
            color: #646669;
            margin-top: 4px;
          }

          /* Form styles */
          .company-form {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 24px;
          }

          .form-section {
            margin-bottom: 0;
            grid-column: span 12;
          }

          /* Grid Spans */
          .span-6 { grid-column: span 6; }
          .span-4 { grid-column: span 4; }
          .span-12 { grid-column: span 12; }

          @media (max-width: 768px) {
            .span-6, .span-4 { grid-column: span 12; }
          }

          .form-label {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            font-weight: 600;
            color: #000;
            margin-bottom: 8px;
          }

          .form-label.required::after {
            content: "*";
            color: #d11124;
            margin-left: 4px;
          }

          .form-input, .form-textarea {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
            box-sizing: border-box;
            transition: all 0.2s;
          }

          .form-input:focus, .form-textarea:focus {
            outline: none;
            border-color: #f97316;
            box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
          }

          .form-textarea {
            min-height: 80px;
            resize: vertical;
            font-family: inherit;
          }

          /* Logo upload */
          .logo-upload {
            display: flex;
            gap: 16px;
            align-items: flex-start;
          }

          .logo-preview {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            overflow: hidden;
            background-color: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }

          .logo-preview img {
             width: 100%;
             height: 100%;
             object-fit: cover;
          }

          .cover-upload-container {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .cover-preview {
            width: 100%;
            height: 120px;
            border-radius: 8px;
            overflow: hidden;
            background-color: #f0f0f0;
            border: 1px solid #e0e0e0;
          }

          .cover-preview img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .cover-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f1f5f9;
            color: #64748b;
            font-size: 14px;
            font-weight: 500;
          }

          .logo-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #0a66c2 0%, #004182 100%);
            color: white;
            font-weight: 700;
            font-size: 28px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }

          .logo-actions {
            display: flex;
            gap: 12px;
            margin-bottom: 8px;
          }

          .btn-upload {
            display: inline-block;
            padding: 8px 16px;
            background-color: #fff;
            border: 1px solid #0a66c2;
            border-radius: 100px;
            color: #0a66c2;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
          }

          .btn-upload:hover {
            background-color: #f0f7ff;
          }

          .btn-remove {
            background-color: transparent;
            border: 1px solid #666;
            border-radius: 100px;
            color: #666;
            padding: 8px 16px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
          }

          .btn-remove:hover {
            background-color: #f5f5f5;
            border-color: #333;
            color: #333;
          }

          /* List Editors */
          .items-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .list-item-row {
            display: flex;
            gap: 12px;
            align-items: center;
            background: #fff;
            border: 1px solid #e2e8f0;
            padding: 16px;
            border-radius: 8px;
            transition: all 0.2s;
          }
          .list-item-row:hover {
            border-color: #cbd5e1;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          }

          .list-item-card {
            background: #fff;
            padding: 16px;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
            transition: all 0.2s;
          }
          .list-item-card:hover {
             border-color: #cbd5e1;
             box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          }

          .list-row-top {
            display: flex;
            gap: 12px;
            margin-bottom: 12px;
          }

          .item-name, .item-category, .item-title, .item-date {
            flex: 1;
          }

          /* Enhanced Add Button */
          .btn-add-item {
            font-size: 13px;
            color: #ea580c;
            background: #fff7ed;
            border: 1px solid #fdba74;
            padding: 6px 16px;
            border-radius: 100px;
            cursor: pointer;
            font-weight: 600;
            margin-left: auto;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .btn-add-item:hover {
            background: #ffedd5;
            color: #c2410c;
            transform: translateY(-1px);
          }

          /* Enhanced Remove Button */
          .btn-remove-item {
            color: #94a3b8;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s;
            padding: 0;
            border: 1px solid transparent;
            background: transparent;
            font-size: 20px;
            cursor: pointer;
            flex-shrink: 0;
          }
          .btn-remove-item:hover {
            background: #fee2e2;
            color: #ef4444;
            border-color: #fca5a5;
          }

          .empty-list-message {
            font-size: 13px;
            color: #64748b;
            font-style: italic;
            padding: 8px 0;
          }

          .upload-hint {
            color: #666;
            font-size: 12px;
            margin: 0;
          }

          .form-group-separator {
            margin: 32px 0 24px;
            padding-bottom: 8px;
            border-bottom: 2px solid #f1f5f9;
          }

          .separator-title {
            font-size: 16px;
            font-weight: 700;
            color: #0f172a;
            margin: 0 0 4px 0;
          }

          .separator-hint {
            font-size: 12px;
            color: #64748b;
            margin: 0;
          }

          /* Edit Tabs */
          .edit-tabs {
            display: flex;
            gap: 12px;
            margin-top: 16px;
            border-bottom: 2px solid #f1f5f9;
          }
          .edit-tab-btn {
            background: none;
            border: none;
            padding: 10px 16px;
            font-size: 14px;
            font-weight: 500;
            color: #64748b;
            cursor: pointer;
            border-bottom: 2px solid transparent;
            margin-bottom: -2px;
            transition: all 0.2s;
          }
          .edit-tab-btn:hover {
            color: #1e293b;
          }
          .edit-tab-btn.active {
            color: #ea580c;
            border-bottom-color: #ea580c;
            font-weight: 600;
            margin: 0;
          }

          /* List Headers */
          .list-headers {
            display: flex;
            padding: 0 16px 8px;
            gap: 12px;
          }
          .col-header {
             flex: 1;
             font-size: 13px;
             color: #64748b;
             font-weight: 600;
             margin-bottom: 0;
          }

          .btn-add-item-large {
            display: block;
            width: 100%;
            padding: 10px;
            margin-top: 12px;
            background-color: #fff;
            border: 1px dashed #cbd5e1;
            color: #64748b;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
          }
          .btn-add-item-large:hover {
            border-color: #ea580c;
            color: #ea580c;
            background-color: #fff7ed;
          }
        `}</style>
      </div>
    </div>
  );
};

export default LinkedInPageEditor;