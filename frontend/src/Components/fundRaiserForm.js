import React, { useEffect, useState } from 'react';
import { SelectMenu, Button,Alert } from 'evergreen-ui'
const StepForm = () => {
  const [step, setStep] = useState(1);
  const [patient, setSelected] = React.useState(null)
  const [empStatus, setEmpStatus] = React.useState(null)
  const [medicalCondition, setMedicalCondition] = React.useState(null)
  const [image1, setImage] = useState("");
  const [usrEmail, setUsrEmail] = useState(sessionStorage.getItem('userEmail'));
  const [formData, setFormData] = useState({
    fundRaiser: {
      amount: '',
      fundRaiserTitle: '',
      fundRaiseFor: '',
      employmentStatus: '',
      image: image1,
      urEmail: usrEmail
    },
    patientDetails: {
      Name: '',
      age: '',
      condition: '',
      hospitalName: '',
      city: ''
    },
    whyFundRaiser: {
      story: '',
      gdrive: ''
    },
  });

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      fundRaiser: {
        ...prevFormData.fundRaiser,
        urEmail: usrEmail
      }
    }));
  }, []);

  function convertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = error => {
      console.log(error);
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageData = reader.result;
        setImage(imageData);

        setFormData((prevData) => ({
          ...prevData,
          fundRaiser: {
            ...prevData.fundRaiser,
            image: imageData,
          },
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const saveFormDataToMongoDB = async () => {
    try {
      const response = await fetch('http://localhost:5000/submitFundRaiser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Data submitted successfully...!")
      } else {
        console.log('Error occured try again later');
      }
    } catch (error) {
      console.error('Error saving form data to MongoDB Atlas:', error);
    }
  };

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
          <div className="container mt-3" style={{ maxWidth: '600px' }}>
            <h2>Step 1: Tell us more about yout Fundraiser</h2>
            <div className="mb-3">
              <label className="form-label">How much do you want to raise? *</label>
              <input
                type="number"
                className="form-control"
                value={formData.fundRaiser.amount}
                onChange={(e) => handleChange('fundRaiser', 'amount', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Fundraiser Title *</label>
              <input
                type="text"
                className="form-control"
                value={formData.fundRaiser.fundRaiserTitle}
                onChange={(e) => handleChange('fundRaiser', 'fundRaiserTitle', e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Whom are you raising funds for? *</label>
              &nbsp;
              <SelectMenu
                title="Select"
                options={['Self', 'Father', 'Mother', 'GrandFather', 'GrandMother', 'Husband', 'Wife', 'Son', 'Daughter', 'Brother', 'Sister', 'Friend', 'Friends Family', 'Other'].map((label) => ({ label, value: label }))}
                width={280}
                height={200}
                selected={patient}
                onSelect={(item) => handleChange('fundRaiser', 'fundRaiseFor', item.value)}
              >
                <Button>{formData.fundRaiser.fundRaiseFor || 'Fundraise For'}</Button>
              </SelectMenu>
            </div>

            <div className="mb-3">
              <label className="form-label">Your employment status? *</label>
              &nbsp;
              <SelectMenu
                title="Select"
                options={['Salaried', 'Self-employed', 'Student', 'Unemployed'].map((label) => ({ label, value: label }))}
                width={280}
                height={200}
                selected={empStatus}
                onSelect={(item) => handleChange('fundRaiser', 'employmentStatus', item.value)}
              >
                <Button>{formData.fundRaiser.employmentStatus || 'Status'}</Button>
              </SelectMenu>
            </div>

            <div className="mb-3">
              <label className="form-label">Add image of the patient(Optional)</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="form-control" required />
            </div>
            <button className="btn btn-outline-dark" onClick={nextStep}>Next</button>
          </div>
        );
      case 2:
        return (
          <div className="container mt-3" style={{ maxWidth: '600px' }}>
            <h2>Step 2: Tell us about the patient</h2>
            <div className="mb-3">
              <label className="form-label">Name *</label>
              <input
                type="text"
                className="form-control"
                value={formData.patientDetails.Name}
                onChange={(e) => handleChange('patientDetails', 'Name', e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Age *</label>
              <input
                type="text"
                className="form-control"
                value={formData.patientDetails.age}
                onChange={(e) => handleChange('patientDetails', 'age', e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Medical Condition *</label>
              &nbsp;
              <SelectMenu
                title="Select"
                options={['Accident', 'Kidney Injury', 'Kidney transplant', 'Liver failure', 'Respiratory distress syndrome', 'Tumor lysis syndrome', 'Medical condition not in the list'].map((label) => ({ label, value: label }))}
                width={280}
                height={200}
                selected={formData.patientDetails.condition}
                onSelect={(item) => handleChange('patientDetails', 'condition', item.value)}
              >
                <Button>{formData.patientDetails.condition || 'Condition'}</Button>
              </SelectMenu>
            </div>

            <div className="mb-3">
              <label className="form-label">Hospital Name *</label>
              <input
                type="text"
                className="form-control"
                value={formData.patientDetails.hospitalName}
                onChange={(e) => handleChange('patientDetails', 'hospitalName', e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">City *</label>
              <input
                type="text"
                className="form-control"
                value={formData.patientDetails.city}
                onChange={(e) => handleChange('patientDetails', 'city', e.target.value)}
              />
            </div>
            <button className="btn btn-secondary me-2" onClick={prevStep}>Previous</button>
            <button className="btn btn-outline-dark" onClick={nextStep}>Next</button>
          </div>
        );
      case 3:
        return (
          <div className="container mt-3" style={{ maxWidth: '600px' }}>
            <h2>Step 3: Tell the story about why you are running a Fundraiser </h2>
            <div className="mb-3">
              <textarea className='form-control' rows={10} value={formData.whyFundRaiser.story} onChange={(e) => handleChange('whyFundRaiser', 'story', e.target.value)}></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Upload google drive link of medical documents (Optional)</label>
              <input
                type="url"
                className="form-control"
                value={formData.whyFundRaiser.gdrive}
                onChange={(e) => handleChange('whyFundRaiser', 'gdrive', e.target.value)}
              />
            </div>

            <button className="btn btn-secondary me-2" onClick={prevStep}>Previous</button>
            <button className="btn btn-outline-dark" onClick={nextStep}>Next</button>
          </div>
        );
      case 4:
        return (
          <div className="container mt-3" style={{ maxWidth: '600px' }}>
            <h2>Step 4: Confirmation</h2>
            <h3>Fundraiser Details: </h3>
            <p><strong>Amount that you want to raise:</strong> {formData.fundRaiser.amount}</p>
            <p><strong>Fundraiser Title:</strong> {formData.fundRaiser.fundRaiserTitle}</p>
            <p><strong>Fundraise for:</strong> {formData.fundRaiser.fundRaiseFor}</p>
            <p><strong>Your employment status:</strong> {formData.fundRaiser.employmentStatus}</p>
            <p><strong>Image:</strong><br></br><img src={formData.fundRaiser.image} height={200} width={200} /></p>
            <hr></hr>
            <h3>Patient Details: </h3>
            <p><strong>Name:</strong> {formData.patientDetails.Name}</p>
            <p><strong>Age:</strong> {formData.patientDetails.age}</p>
            <p><strong>Medical Condition:</strong> {formData.patientDetails.condition}</p>
            <p><strong>Hospital Name:</strong> {formData.patientDetails.hospitalName}</p>
            <p><strong>City:</strong> {formData.patientDetails.city}</p>
            <hr></hr>
            <h3>Message: </h3>
            <p>{formData.whyFundRaiser.story}</p>

            <hr></hr>
            <h3>Link: </h3>
            <p><a href={formData.whyFundRaiser.gdrive}>Document link</a></p>
            <button className="btn btn-secondary me-2" onClick={prevStep}>Previous</button>
            <button className="btn btn-outline-dark" onClick={saveFormDataToMongoDB}>Submit</button>
          </div>

        );
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
};

export default StepForm;
