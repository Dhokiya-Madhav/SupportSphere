import React, { useState } from 'react';

const StepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
    },
    contactInfo: {
      email: '',
      phone: '',
    },
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="container mt-3" style={{ maxWidth: '400px' }}>
            <h2>Step 1: Personal Information</h2>
            <div className="mb-3">
              <label className="form-label">First Name:</label>
              <input
                type="text"
                className="form-control"
                value={formData.personalInfo.firstName}
                onChange={(e) => handleChange('personalInfo', 'firstName', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name:</label>
              <input
                type="text"
                className="form-control"
                value={formData.personalInfo.lastName}
                onChange={(e) => handleChange('personalInfo', 'lastName', e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={nextStep}>Next</button>
          </div>
        );
      case 2:
        return (
          <div className="container mt-3" style={{ maxWidth: '400px' }}>
            <h2>Step 2: Contact Information</h2>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="text"
                className="form-control"
                value={formData.contactInfo.email}
                onChange={(e) => handleChange('contactInfo', 'email', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone:</label>
              <input
                type="text"
                className="form-control"
                value={formData.contactInfo.phone}
                onChange={(e) => handleChange('contactInfo', 'phone', e.target.value)}
              />
            </div>
            <button className="btn btn-secondary me-2" onClick={prevStep}>Previous</button>
            <button className="btn btn-primary" onClick={nextStep}>Next</button>
          </div>
        );
      case 3:
        return (
          <div className="container mt-3" style={{ maxWidth: '400px' }}>
            <h2>Step 3: Confirmation</h2>
            <p>Confirm your information:</p>
            <p><strong>First Name:</strong> {formData.personalInfo.firstName}</p>
            <p><strong>Last Name:</strong> {formData.personalInfo.lastName}</p>
            <p><strong>Email:</strong> {formData.contactInfo.email}</p>
            <p><strong>Phone:</strong> {formData.contactInfo.phone}</p>
            <button className="btn btn-secondary me-2" onClick={prevStep}>Previous</button>
            <button className="btn btn-success" onClick={() => alert('Form submitted!')}>Submit</button>
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
};

export default StepForm;
