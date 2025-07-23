import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import './Application.css';
import Card from '../components/Card';

const totalSteps = 6;

const Application = () => {
  const [step, setStep] = useState(-1); // Step -1 = intro screen

  const initialValues = {
    fullName: '', dob: '', street: '', apt: '', city: '', state: '', zip: '',
    phone: '', email: '', startDate: '', authorized: '', ageOver21: '',
    felony: '', felonyExplain: '',

    hsName: '', hsAddress: '', hsDiploma: false, hsGED: false,
    collegeName: '', collegeAddress: '', collegeGrad: false,
    collegeDegree: '', otherCerts: '',

    references: Array(3).fill({ name: '', relation: '', company: '', phone: '' }),

    employment: Array(3).fill({
      company: '', phone: '', address: '', supervisor: '', title: '',
      from: '', to: '', contact: false
    }),

    maritalStatus: '', housingType: '', hasRoommates: '', roommateDetails: '',
    hasChildren: '', childrenDetails: '', hasPets: '', petDetails: '',
    driverLicense: '', carInsurance: '', hasTickets: '', ticketDetails: '',
    whyProvideServices: '', priorExperience: '', additionalInfo: '',

    signature: '', signatureDate: ''
  };

  const validationSchemas = [
    Yup.object({
      fullName: Yup.string().required('Required'),
      dob: Yup.date().required('Required'),
      street: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      zip: Yup.string().required('Required'),
      phone: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      authorized: Yup.string().required('Required'),
      ageOver21: Yup.string().required('Required'),
      felony: Yup.string().required('Required'),
      felonyExplain: Yup.string().when('felony', {
        is: 'Yes',
        then: Yup.string().required('Please explain your felony')
      }),
    }),
    Yup.object({}), // Education
    Yup.object({
      references: Yup.array().of(
        Yup.object({
          name: Yup.string().required('Required'),
          relation: Yup.string().required('Required'),
          company: Yup.string().required('Required'),
          phone: Yup.string().required('Required'),
        })
      )
    }),
    Yup.object({
      employment: Yup.array().of(
        Yup.object({
          company: Yup.string().required('Required'),
          phone: Yup.string().required('Required'),
          address: Yup.string().required('Required'),
          supervisor: Yup.string().required('Required'),
          title: Yup.string().required('Required'),
          from: Yup.date().required('Required'),
          to: Yup.date().required('Required'),
        })
      )
    }),
    Yup.object({
      maritalStatus: Yup.string().required('Required'),
      housingType: Yup.string().required('Required'),
      hasRoommates: Yup.string().required('Required'),
      roommateDetails: Yup.string().when('hasRoommates', {
        is: 'Yes',
        then: Yup.string().required('Please describe your roommates'),
      }),
      hasChildren: Yup.string().required('Required'),
      childrenDetails: Yup.string().when('hasChildren', {
        is: 'Yes',
        then: Yup.string().required('Please describe your children'),
      }),
      hasPets: Yup.string().required('Required'),
      petDetails: Yup.string().when('hasPets', {
        is: 'Yes',
        then: Yup.string().required('Please describe your pets'),
      }),
      whyProvideServices: Yup.string().required('Required'),
    }),
    Yup.object({
      signature: Yup.string().required('Required'),
      signatureDate: Yup.date().required('Required'),
    }),
  ];

  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
    alert('Application submitted successfully!');
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps - 1));
  const prevStep = () => setStep(prev => Math.max(prev - 1, -1));

  const StepIndicator = () =>
    step >= 0 && <h3 className="stepIndicator">Step {step + 1} of {totalSteps}</h3>;

  return (
    <div className="applicationContainer">
      <h2 className="heading">Host Home Provider Application</h2>
      <StepIndicator />
      <Formik
        initialValues={initialValues}
        validationSchema={step >= 0 ? validationSchemas[step] : null}
        onSubmit={handleSubmit}
      >
        {({ values, isValid, dirty }) => (
          <Form>
            {step === -1 && (
              <Card
                title="Welcome to the Host Home Provider Application"
                description="Before we begin, please ensure you have about 15–20 minutes to complete the full application. Click below to get started."
                buttonText="Start Application"
                onButtonClick={() => setStep(0)}
                variant="cta"
              />
            )}

            {step === 0 && (
              <Card title="1. Applicant Information">
                <Field name="fullName" placeholder="Full Name" />
                <ErrorMessage name="fullName" component="div" />
                <Field name="dob" type="date" placeholder="Date of Birth" />
                <ErrorMessage name="dob" component="div" />
                <Field name="street" placeholder="Street Address" />
                <ErrorMessage name="street" component="div" />
                <Field name="apt" placeholder="Apt/Suite" />
                <Field name="city" placeholder="City" />
                <ErrorMessage name="city" component="div" />
                <Field name="state" placeholder="State" />
                <ErrorMessage name="state" component="div" />
                <Field name="zip" placeholder="ZIP Code" />
                <ErrorMessage name="zip" component="div" />
                <Field name="phone" placeholder="Phone Number" />
                <ErrorMessage name="phone" component="div" />
                <Field name="email" type="email" placeholder="Email Address" />
                <ErrorMessage name="email" component="div" />
                <Field name="authorized" as="select">
                  <option value="">Are you authorized to work in the U.S.?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Field>
                <ErrorMessage name="authorized" component="div" />
                <Field name="ageOver21" as="select">
                  <option value="">Are you over 21?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Field>
                <ErrorMessage name="ageOver21" component="div" />
                <Field name="felony" as="select">
                  <option value="">Any felony convictions?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Field>
                <ErrorMessage name="felony" component="div" />
                {values.felony === 'Yes' && (
                  <>
                    <Field name="felonyExplain" placeholder="Explain felony" />
                    <ErrorMessage name="felonyExplain" component="div" />
                  </>
                )}
              </Card>
            )}

            {step === 1 && (
              <Card title="2. Education">
                <Field name="hsName" placeholder="High School Name" />
                <Field name="hsAddress" placeholder="High School Address" />
                <label><Field type="checkbox" name="hsDiploma" /> Diploma</label>
                <label><Field type="checkbox" name="hsGED" /> GED</label>
                <Field name="collegeName" placeholder="College Name" />
                <Field name="collegeAddress" placeholder="College Address" />
                <label><Field type="checkbox" name="collegeGrad" /> Graduated</label>
                <Field name="collegeDegree" placeholder="Degree" />
                <Field name="otherCerts" placeholder="Other Certifications" />
              </Card>
            )}

            {step === 2 && (
              <Card title="3. References">
                <FieldArray name="references">
                  {({ push, remove }) => (
                    values.references.map((ref, index) => (
                      <div key={index}>
                        <Field name={`references[${index}].name`} placeholder="Name" />
                        <ErrorMessage name={`references[${index}].name`} component="div" />
                        <Field name={`references[${index}].relation`} placeholder="Relation" />
                        <Field name={`references[${index}].company`} placeholder="Company" />
                        <Field name={`references[${index}].phone`} placeholder="Phone" />
                      </div>
                    ))
                  )}
                </FieldArray>
              </Card>
            )}

            {step === 3 && (
              <Card title="4. Employment History">
                <FieldArray name="employment">
                  {() =>
                    values.employment.map((job, index) => (
                      <div key={index}>
                        <Field name={`employment[${index}].company`} placeholder="Company" />
                        <Field name={`employment[${index}].phone`} placeholder="Phone" />
                        <Field name={`employment[${index}].address`} placeholder="Address" />
                        <Field name={`employment[${index}].supervisor`} placeholder="Supervisor" />
                        <Field name={`employment[${index}].title`} placeholder="Title" />
                        <Field name={`employment[${index}].from`} type="date" placeholder="From" />
                        <Field name={`employment[${index}].to`} type="date" placeholder="To" />
                      </div>
                    ))
                  }
                </FieldArray>
              </Card>
            )}

            {step === 4 && (
              <Card title="5. Personal Information">
                <Field name="maritalStatus" placeholder="Marital Status" />
                <Field name="housingType" placeholder="Housing Type" />
                <Field name="hasRoommates" as="select">
                  <option value="">Do you have roommates?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Field>
                {values.hasRoommates === 'Yes' && (
                  <Field name="roommateDetails" placeholder="Describe roommates" />
                )}
                <Field name="hasChildren" as="select">
                  <option value="">Do you have children?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Field>
                {values.hasChildren === 'Yes' && (
                  <Field name="childrenDetails" placeholder="Describe children" />
                )}
                <Field name="hasPets" as="select">
                  <option value="">Do you have pets?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Field>
                {values.hasPets === 'Yes' && (
                  <Field name="petDetails" placeholder="Describe pets" />
                )}
                <Field name="driverLicense" placeholder="Driver's License #" />
                <Field name="carInsurance" placeholder="Insurance Provider" />
                <Field name="hasTickets" as="select">
                  <option value="">Traffic tickets?</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Field>
                {values.hasTickets === 'Yes' && (
                  <Field name="ticketDetails" placeholder="Explain tickets" />
                )}
                <Field name="whyProvideServices" placeholder="Why do you want to provide services?" />
                <Field name="priorExperience" placeholder="Prior experience" />
                <Field name="additionalInfo" placeholder="Additional info" />
              </Card>
            )}

            {step === 5 && (
              <Card title="6. Declaration">
                <Field name="signature" placeholder="Full Name (Signature)" />
                <Field name="signatureDate" type="date" placeholder="Date" />
              </Card>
            )}

            {step >= 0 && (
              <div className="stickyNav">
                <div className="stepNav">
                  {step > 0 && (
                    <button type="button" onClick={prevStep}>
                      Back
                    </button>
                  )}
                  {step < totalSteps - 1 && (
                    <button type="button" onClick={nextStep} disabled={!dirty || !isValid}>
                      Next
                    </button>
                  )}
                  {step === totalSteps - 1 && (
                    <button type="submit" className="submitButton" disabled={!isValid}>
                      Submit
                    </button>
                  )}
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Application;
