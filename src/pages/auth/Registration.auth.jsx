// src/pages/auth/Registration.auth.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../config/api.js"; // Explicit .js extension
import RegistrationForm from "../../components/ui/RegistrationForm.jsx"; // Explicit .jsx extension
import ConfirmModal from "../../components/shared/ConfirmModal.jsx"; // Explicit .jsx extension

export default function RegistrationAuth({ toggleView }) { // Added toggleView prop
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    ClientName: "",
    AgencyName: "",
    AgencyLicenseNumber: "",
    AgencyEmail: "",
    AgencyPhoneNumber: "",
    AgencyPassword: "",
    InsertedBy: "SYSTEM",
    Locality: "",
    Society: "",
    City: "",
    StateName: "",
    CountryId: 1,
    Pincode: "",
    AlternatePhoneNumber: "",
    ImageUrl: "",
    LicenseDocumentUrl: "",
    BrochureUrl: "",
    ExpiryDate: "",
    Website: "",
    YearsInBusiness: "",
    CompanyDescription: "",
    termsAccepted: false,
    newsletterSubscribed: false,
    CompanyOwner: "",
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canProceed, setCanProceed] = useState(false);

  const requiredFields = {
    1: ["ClientName", "AgencyName", "AgencyEmail", "AgencyPhoneNumber", "AgencyPassword"],
    2: ["AgencyLicenseNumber", "ExpiryDate", "CompanyOwner"],
    3: ["Locality", "City", "StateName", "Pincode"],
    4: ["termsAccepted"],
  };

  const validateStep = (stepToValidate = step, updatedForm = formData) => {
    const currentErrors = {};
    const fields = requiredFields[stepToValidate] || [];

    fields.forEach((field) => {
      if (field === "termsAccepted") {
        if (!updatedForm[field]) {
          currentErrors[field] = "You must accept the Terms and Conditions.";
        }
      } else if (!updatedForm[field]) {
        currentErrors[field] = `${field.replace(/([A-Z])/g, " $1").trim()} is required.`;
      }
    });

    if (
      stepToValidate === 1 &&
      updatedForm.AgencyEmail &&
      !/\S+@\S+\.\S+/.test(updatedForm.AgencyEmail)
    ) {
      currentErrors.AgencyEmail = "Invalid email format.";
    }

    if (
      stepToValidate === 1 &&
      updatedForm.AgencyPassword &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/.test(updatedForm.AgencyPassword)
    ) {
      currentErrors.AgencyPassword = "Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char.";
    }

    return currentErrors;
  };

  useEffect(() => {
    const validationErrors = validateStep(step, formData);
    setErrors(validationErrors);
    const proceed = Object.keys(validationErrors).length === 0 && (step !== 4 || formData.termsAccepted);
    setCanProceed(proceed);
  }, [formData, step]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = () => {
    if (canProceed) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!canProceed) return;

    try {
      await api.post("/agencies/register-client", formData);
      toast.success("Registration Successful! Please log in.");
      toggleView(); // Switch back to login after successful registration
    } catch (err) {
      console.error(
        "Registration error:",
        err.response ? err.response.data : err.message
      );

      if (err.response && err.response.status === 409) {
        toast.error("Client already exists. Please try logging in or use a different email.");
      } else if (err.response && err.response.data && err.response.data.detail) {
        toast.error(err.response.data.detail);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };

  const handleDiscardClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDiscard = () => {
    setIsModalOpen(false);
    toggleView(); // Switch back to login on discard
  };

  const handleCancelDiscard = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <RegistrationForm
        step={step}
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        handleNext={handleNext}
        handlePrev={handlePrev}
        handleSubmit={handleSubmit}
        canProceed={canProceed}
        handleDiscard={handleDiscardClick}
        toggleView={toggleView} // Pass toggleView to RegistrationForm
      />
      
      <ConfirmModal
        isOpen={isModalOpen}
        message="Are you sure you want to discard registration?"
        onConfirm={handleConfirmDiscard}
        onCancel={handleCancelDiscard}
      />
    </>
  );
}