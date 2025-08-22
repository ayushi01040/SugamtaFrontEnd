// src/components/ui/RegistrationForm.jsx
import React from 'react';
import {
  FaBuilding, FaPhone, FaMapMarkerAlt, FaGlobe, FaEnvelope, FaTimes,
  FaUser, FaRegFileAlt, FaGlobeEurope, FaIdCardAlt, FaCalendarCheck
} from 'react-icons/fa';

// Import reusable components
import InputField from '../shared/InputField.jsx';
import TextareaField from '../shared/TextAreaField.jsx';
import DropdownField from '../shared/DropdownField.jsx';
import PasswordField from '../shared/PasswordField.jsx';
import ToggleButton from '../shared/ToggleButton.jsx';

export default function RegistrationForm({
  step,
  formData,
  errors,
  handleChange,
  handleNext,
  handlePrev,
  handleSubmit,
  handleDiscard, // New prop for discarding
  toggleView // Passed from AuthAuth.jsx
}) {
  const steps = [
    { name: "Personal & Contact Info", requiredFields: ["ClientName", "AgencyName", "AgencyEmail", "AgencyPhoneNumber", "AgencyPassword"] },
    { name: "Business Details", requiredFields: ["AgencyLicenseNumber", "ExpiryDate", "CompanyOwner"] },
    { name: "Address & Media", requiredFields: ["Locality", "City", "StateName", "Pincode"] },
    { name: "Company Profile", requiredFields: ["termsAccepted"] }
  ];

  const currentStepRequiredFields = steps[step - 1].requiredFields || [];
  const canProceed = currentStepRequiredFields.every(field => {
    // Corrected password validation regex
    if (field === "AgencyPassword") {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/.test(formData[field]) && !errors[field];
    }
    return formData[field] && !errors[field];
  });

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Removed max-h and overflow-y-auto */}
            <InputField
              icon={<FaUser />}
              label="Client Name"
              name="ClientName"
              value={formData.ClientName}
              onChange={handleChange}
              error={errors.ClientName}
              placeholder="e.g. Prime Assurance"
            />
            <InputField
              icon={<FaBuilding />}
              label="Agency Name"
              name="AgencyName"
              value={formData.AgencyName}
              onChange={handleChange}
              error={errors.AgencyName}
              placeholder="e.g. Prime Insurance Agency"
            />
            <InputField
              icon={<FaEnvelope />}
              label="Agency Email"
              type="email"
              name="AgencyEmail"
              value={formData.AgencyEmail}
              onChange={handleChange}
              error={errors.AgencyEmail}
              placeholder="e.g. contact@agency.in"
            />
            <InputField
              icon={<FaPhone />}
              label="Agency Phone Number"
              type="tel"
              name="AgencyPhoneNumber"
              value={formData.AgencyPhoneNumber}
              onChange={handleChange}
              error={errors.AgencyPhoneNumber}
              placeholder="e.g. 011-2345-6789"
            />
            <PasswordField
              label="Agency Password"
              name="AgencyPassword"
              value={formData.AgencyPassword}
              onChange={handleChange}
              error={errors.AgencyPassword}
              placeholder="min. 8 characters"
            />
            <InputField
              icon={<FaPhone />}
              label="Alternate Phone Number"
              type="tel"
              name="AlternatePhoneNumber"
              value={formData.AlternatePhoneNumber}
              onChange={handleChange}
              placeholder="Optional"
            />
          </div>
        );

      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Removed max-h and overflow-y-auto */}
            <InputField
              icon={<FaRegFileAlt />}
              label="License Number"
              name="AgencyLicenseNumber"
              value={formData.AgencyLicenseNumber}
              onChange={handleChange}
              error={errors.AgencyLicenseNumber}
              placeholder="e.g. PRM-DEL-1234"
            />
            <InputField
              icon={<FaCalendarCheck />}
              label="License Expiry Date"
              type="date"
              name="ExpiryDate"
              value={formData.ExpiryDate}
              onChange={handleChange}
              error={errors.ExpiryDate}
            />
            <InputField
              icon={<FaUser />}
              label="Company Owner"
              name="CompanyOwner"
              value={formData.CompanyOwner}
              onChange={handleChange}
              error={errors.CompanyOwner}
              placeholder="e.g. Sanjay Sharma"
            />
            <InputField
              icon={<FaRegFileAlt />}
              label="License Document URL"
              type="url"
              name="LicenseDocumentUrl"
              value={formData.LicenseDocumentUrl}
              onChange={handleChange}
              placeholder="https://example.com/doc.pdf"
            />
            <InputField
              icon={<FaRegFileAlt />}
              label="Brochure URL"
              type="url"
              name="BrochureUrl"
              value={formData.BrochureUrl}
              onChange={handleChange}
              placeholder="https://example.com/brochure.pdf"
            />
             <InputField
              icon={<FaRegFileAlt />}
              label="Image URL"
              type="url"
              name="ImageUrl"
              value={formData.ImageUrl}
              onChange={handleChange}
              placeholder="https://example.com/logo.png"
            />
          </div>
        );

      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Removed max-h and overflow-y-auto */}
            <InputField
              icon={<FaMapMarkerAlt />}
              label="Locality"
              name="Locality"
              value={formData.Locality}
              onChange={handleChange}
              error={errors.Locality}
              placeholder="e.g. Connaught Place"
            />
            <InputField
              icon={<FaBuilding />}
              label="Society"
              name="Society"
              value={formData.Society}
              onChange={handleChange}
              placeholder="e.g. Statesman House"
            />
            <InputField
              icon={<FaMapMarkerAlt />}
              label="City"
              name="City"
              value={formData.City}
              onChange={handleChange}
              error={errors.City}
              placeholder="e.g. New Delhi"
            />
            <DropdownField
              label="State"
              name="StateName"
              value={formData.StateName}
              onChange={handleChange}
              error={errors.StateName}
              options={[
                "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi",
                "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
                "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
                "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
                "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
                "Dadra and Nagar Haveli and Daman and Diu", "Jammu and Kashmir", "Ladakh",
                "Lakshadweep", "Puducherry"
              ]}
            />
            <InputField
              icon={<FaIdCardAlt />}
              label="Pincode"
              name="Pincode"
              value={formData.Pincode}
              onChange={handleChange}
              error={errors.Pincode}
              placeholder="e.g. 110001"
            />
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Removed max-h and overflow-y-auto */}
            <InputField
              icon={<FaCalendarCheck />}
              label="Years in Business"
              name="YearsInBusiness"
              value={formData.YearsInBusiness}
              onChange={handleChange}
              error={errors.YearsInBusiness}
              placeholder="e.g. 15"
            />
            <InputField
              icon={<FaGlobe />}
              label="Website"
              type="url"
              name="Website"
              value={formData.Website}
              onChange={handleChange}
              error={errors.Website}
              placeholder="https://example.com"
            />
            <TextareaField
              label="Company Description"
              name="CompanyDescription"
              value={formData.CompanyDescription}
              onChange={handleChange}
              error={errors.CompanyDescription}
              placeholder="Tell us about your company..."
            />

            <div className="col-span-2 flex flex-col space-y-3 mt-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#2563EB] border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  I agree to the <a href="/terms" className="text-[#2563EB] hover:underline">Terms & Conditions</a> *
                </span>
              </label>
              {errors.termsAccepted && (
                <p className="text-xs text-red-500">{errors.termsAccepted}</p>
              )}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="newsletterSubscribed"
                  checked={formData.newsletterSubscribed}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#2563EB] border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  Subscribe to our newsletter (optional)
                </span>
              </label>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

 return (
    <> {/* Replaced outer div with a React Fragment */}
        {/* Close/Discard Button */}
        <button
          onClick={handleDiscard}
          className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#fa0000] transition-colors hover:cursor-pointer"
        >
          <FaTimes size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center text-[#334155] mb-2">
          Agency Registration
        </h2>
        <p className="text-md text-center text-[#94A3B8] mb-8">
          Step {step} of 4: {steps[step - 1].name}
        </p>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-10">
          <div
            className="bg-[#2563EB] h-2 rounded-full transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step === 4) {
              handleSubmit();
            } else {
              handleNext();
            }
          }}
          className="space-y-8"
        >
          {renderStep()}
          <p className="text-xs text-gray-500 mt-2 mb-0">
            Mandatory fields are marked with an asterisk (*)
          </p>

          <div className="flex justify-between pt-6 items-center">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-6 py-3 rounded-lg bg-[#94A3B8] text-white font-semibold transition-colors hover:bg-gray-500 hover:cursor-pointer"
              >
                Previous
              </button>
            )}

            {/* This is the new, centered button for toggling */}
            <ToggleButton
              onClick={toggleView}
              text="Already have an account? Login here."
            />

            {step < 4 && (
              <button
                type="submit"
                disabled={!canProceed}
                className={`px-8 py-3 rounded-lg text-white font-semibold transition-all ${
                  canProceed
                    ? "bg-[#2563EB] hover:bg-blue-700 hover:cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            )}
            {step === 4 && (
              <button
                type="submit"
                disabled={!canProceed}
                className={`px-8 py-3 rounded-lg text-white font-bold transition-all ${
                  canProceed
                    ? "bg-[#10B981] hover:bg-green-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Register
              </button>
            )}
          </div>
        </form>
    </>
  );
}
