import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import './Application.css';
import Card from '../components/Card';

const totalSteps = 6;

const Application = () => {
  const [step, setStep] = useState(0);

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
    // Step 0: Applicant Info
    Yup.object({
      fullName: Yup.string().required('Required'),
      dob: Yup.date().required('Required'),
      street: Yup.string().required('Required'),
      city: Yup.string().required('Required'),
      state: Yup.string().required('Required'),
      zip: Yup.string().required('Required'),
      phone: Yup.string().required('Required'),
      email: Yup.string().email('Invalid').required('Required'),
      authorized: Yup.string().required('Required'),
      ageOver21: Yup.string().required('Required'),
      felony: Yup.string().required('Required'),
      felonyExplain: Yup.string().when('felony', {
        is: 'Yes',
        then: Yup.string().required('Please explain')
      })
    }),
    // Step 1: Education
    Yup.object({}),
    // Step 2: References
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
    // Step 3: Employment
    Yup.object({
      employment: Yup.array().of(
        Yup.object({
          company: Yup.string().required('Required'),
          phone: Yup.string().required('Required'),
          address: Yup.string().required('Required'),
          supervisor: Yup.string().required('Required'),
          title: Yup.string().required('Required'),
          from: Yup.date().required('Required'),
          to: Yup.date().required('Required')
        })
      )
    }),
    // Step 4: Personal Info
    Yup.object({
      maritalStatus: Yup.string().required('Required'),
      housingType: Yup.string().required('Required'),
      hasRoommates: Yup.string().required('Required'),
      roommateDetails: Yup.string().when('hasRoommates', {
        is: 'Yes',
        then: Yup.string().required('Required')
      }),
      hasChildren: Yup.string().required('Required'),
      childrenDetails: Yup.string().when('hasChildren', {
        is: 'Yes',
        then: Yup.string().required('Required')
      }),
      hasPets: Yup.string().required('Required'),
      petDetails: Yup.string().when('hasPets', {
        is: 'Yes',
        then: Yup.string().required('Required')
      }),
      whyProvideServices: Yup.string().required('Required'),
    }),
    // Step 5: Declaration
    Yup.object({
      signature: Yup.string().required('Required'),
      signatureDate: Yup.date().required('Required'),
    })
  ];

  const handleSubmit = (values) => {
    console.log('Application submitted:', values);
    alert('Application submitted!');
  };

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const StepIndicator = () => <h3 className="stepIndicator">Step {step + 1} of {totalSteps}</h3>;

  return (
    <div className="applicationContainer">
      <h2 className="heading">Host Home Provider Application</h2>
      <StepIndicator />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas[step]}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isValid, dirty }) => (
          <Form>
            {/* Step 0 – Applicant Info */}
            {step === 0 && (
              <Card title="Applicant Information">
                <div className="formSection">
                  <label>Full Name: <Field type="text" name="fullName" /></label>
                  <ErrorMessage name="fullName" component="div" className="error" />

                  <label>Date of Birth: <Field type="date" name="dob" /></label>
                  <ErrorMessage name="dob" component="div" className="error" />

                  <label>Street Address: <Field type="text" name="street" /></label>
                  <ErrorMessage name="street" component="div" className="error" />

                  <label>Apt/Unit #: <Field type="text" name="apt" /></label>

                  <label>City: <Field type="text" name="city" /></label>
                  <ErrorMessage name="city" component="div" className="error" />

                  <label>State: <Field type="text" name="state" /></label>
                  <ErrorMessage name="state" component="div" className="error" />

                  <label>ZIP: <Field type="text" name="zip" /></label>
                  <ErrorMessage name="zip" component="div" className="error" />

                  <label>Phone: <Field type="tel" name="phone" /></label>
                  <ErrorMessage name="phone" component="div" className="error" />

                  <label>Email: <Field type="email" name="email" /></label>
                  <ErrorMessage name="email" component="div" className="error" />

                  <label>Date Available to Start: <Field type="date" name="startDate" /></label>

                  <label>Authorized to work in the U.S.:
                    <Field as="select" name="authorized">
                      <option value="">--Select--</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Field>
                  </label>
                  <ErrorMessage name="authorized" component="div" className="error" />

                  <label>Are you at least 21 years of age?
                    <Field as="select" name="ageOver21">
                      <option value="">--Select--</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Field>
                  </label>
                  <ErrorMessage name="ageOver21" component="div" className="error" />

                  <label>Have you or anyone in your home been convicted of a felony?
                    <Field as="select" name="felony">
                      <option value="">--Select--</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Field>
                  </label>
                  <ErrorMessage name="felony" component="div" className="error" />

                  {values.felony === "Yes" && (
                    <>
                      <label>Please explain:
                        <Field type="text" name="felonyExplain" />
                      </label>
                      <ErrorMessage name="felonyExplain" component="div" className="error" />
                    </>
                  )}
                </div>
              </Card>
            )}

            {/* TODO: Steps 1 to 5 — will be added below in next message for clarity due to size */}
            {/* Step 1 – Education */}
            {step === 1 && (
              <Card title="Education">
                <div className="formSection">
                  <label>High School Name: <Field type="text" name="hsName" /></label>
                  <label>High School Address: <Field type="text" name="hsAddress" /></label>

                  <div className="checkboxGroup">
                    <label>High School Diploma
                      <Field type="checkbox" name="hsDiploma" />
                    </label>
                    <label>GED
                      <Field type="checkbox" name="hsGED" />
                    </label>
                  </div>

                  <label>College Name: <Field type="text" name="collegeName" /></label>
                  <label>College Address: <Field type="text" name="collegeAddress" /></label>

                  <div className="checkboxGroup">
                    <label>Graduated College
                      <Field type="checkbox" name="collegeGrad" />
                    </label>
                  </div>

                  <label>Degree: <Field type="text" name="collegeDegree" /></label>
                  <label>Other Certifications: <Field type="text" name="otherCerts" /></label>
                </div>
              </Card>
            )}

            {/* Step 2 – References */}
            {step === 2 && (
              <Card title="References (At least 1 Professional)">
                <div className="formSection">
                  <FieldArray name="references">
                    {({ remove, push }) => (
                      values.references.map((ref, index) => (
                        <div key={index} className="referenceBlock">
                          <h4>Reference {index + 1}</h4>
                          <label>Full Name:
                            <Field type="text" name={`references[${index}].name`} />
                          </label>
                          <ErrorMessage name={`references[${index}].name`} component="div" className="error" />

                          <label>Relationship:
                            <Field type="text" name={`references[${index}].relation`} />
                          </label>
                          <ErrorMessage name={`references[${index}].relation`} component="div" className="error" />

                          <label>Company:
                            <Field type="text" name={`references[${index}].company`} />
                          </label>
                          <ErrorMessage name={`references[${index}].company`} component="div" className="error" />

                          <label>Phone:
                            <Field type="tel" name={`references[${index}].phone`} />
                          </label>
                          <ErrorMessage name={`references[${index}].phone`} component="div" className="error" />
                        </div>
                      ))
                    )}
                  </FieldArray>
                </div>
              </Card>
            )}

            {/* Step 3 – Employment */}
            {step === 3 && (
              <Card title="Employment History (Last 3 Jobs)">
                <div className="formSection">
                  <FieldArray name="employment">
                    {() =>
                      values.employment.map((job, index) => (
                        <div key={index} className="employmentBlock">
                          <h4>Job {index + 1}</h4>
                          <label>Company:
                            <Field type="text" name={`employment[${index}].company`} />
                          </label>
                          <ErrorMessage name={`employment[${index}].company`} component="div" className="error" />

                          <label>Phone:
                            <Field type="tel" name={`employment[${index}].phone`} />
                          </label>
                          <ErrorMessage name={`employment[${index}].phone`} component="div" className="error" />

                          <label>Address:
                            <Field type="text" name={`employment[${index}].address`} />
                          </label>
                          <ErrorMessage name={`employment[${index}].address`} component="div" className="error" />

                          <label>Supervisor:
                            <Field type="text" name={`employment[${index}].supervisor`} />
                          </label>
                          <ErrorMessage name={`employment[${index}].supervisor`} component="div" className="error" />

                          <label>Job Title:
                            <Field type="text" name={`employment[${index}].title`} />
                          </label>
                          <ErrorMessage name={`employment[${index}].title`} component="div" className="error" />

                          <label>From:
                            <Field type="date" name={`employment[${index}].from`} />
                          </label>
                          <ErrorMessage name={`employment[${index}].from`} component="div" className="error" />

                          <label>To:
                            <Field type="date" name={`employment[${index}].to`} />
                          </label>
                          <ErrorMessage name={`employment[${index}].to`} component="div" className="error" />

                          <div className="checkboxGroup">
                            <label>May we contact this employer?
                              <Field type="checkbox" name={`employment[${index}].contact`} />
                            </label>
                          </div>
                        </div>
                      ))
                    }
                  </FieldArray>
                </div>
              </Card>
            )}

            {/* Step 4 – Personal Info */}
            {step === 4 && (
              <Card title="Personal Information">
                <div className="formSection">
                  <label>Marital Status:
                    <Field type="text" name="maritalStatus" />
                  </label>
                  <ErrorMessage name="maritalStatus" component="div" className="error" />

                  <label>Type of Housing:
                    <Field type="text" name="housingType" />
                  </label>
                  <ErrorMessage name="housingType" component="div" className="error" />

                  <label>Do you have roommates?
                    <Field as="select" name="hasRoommates">
                      <option value="">--Select--</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Field>
                  </label>
                  <ErrorMessage name="hasRoommates" component="div" className="error" />

                  {values.hasRoommates === "Yes" && (
                    <>
                      <label>If yes, describe:
                        <Field as="textarea" name="roommateDetails" />
                      </label>
                      <ErrorMessage name="roommateDetails" component="div" className="error" />
                    </>
                  )}

                  <label>Do you have children?
                    <Field as="select" name="hasChildren">
                      <option value="">--Select--</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Field>
                  </label>
                  <ErrorMessage name="hasChildren" component="div" className="error" />

                  {values.hasChildren === "Yes" && (
                    <>
                      <label>If yes, describe:
                        <Field as="textarea" name="childrenDetails" />
                      </label>
                      <ErrorMessage name="childrenDetails" component="div" className="error" />
                    </>
                  )}

                  <label>Do you have pets?
                    <Field as="select" name="hasPets">
                      <option value="">--Select--</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Field>
                  </label>
                  <ErrorMessage name="hasPets" component="div" className="error" />

                  {values.hasPets === "Yes" && (
                    <>
                      <label>If yes, describe:
                        <Field as="textarea" name="petDetails" />
                      </label>
                      <ErrorMessage name="petDetails" component="div" className="error" />
                    </>
                  )}

                  <label>Driver’s License #: <Field type="text" name="driverLicense" /></label>
                  <label>Car Insurance Provider: <Field type="text" name="carInsurance" /></label>

                  <label>Have you had any traffic tickets?
                    <Field as="select" name="hasTickets">
                      <option value="">--Select--</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Field>
                  </label>
                  <ErrorMessage name="hasTickets" component="div" className="error" />

                  {values.hasTickets === "Yes" && (
                    <>
                      <label>If yes, describe:
                        <Field as="textarea" name="ticketDetails" />
                      </label>
                      <ErrorMessage name="ticketDetails" component="div" className="error" />
                    </>
                  )}

                  <div className="fullWidthField">
                    <label>Why do you want to provide host home services?</label>
                    <Field as="textarea" name="whyProvideServices" />
                    <ErrorMessage name="whyProvideServices" component="div" className="error" />
                  </div>
                  <div className="fullWidthField">
                    <label>Any prior experience with individuals with disabilities?</label>
                    <Field as="textarea" name="priorExperience" />
                  </div>
                  <div className="fullWidthField">
                    <label>Anything else you would like us to know?</label>
                    <Field as="textarea" name="additionalInfo" />
                  </div>
                </div>
              </Card>
            )}

            {/* Step 5 – Declaration */}
            {step === 5 && (
              <Card title="Declaration">
                <div className="formSection">
                  <p className="declarationText">
                    I hereby certify that the information provided in this application is true, correct, and complete to the best of my knowledge.
                    I understand that any misrepresentation or omission of facts may result in the rejection of my application or termination of services.
                  </p>
                  <label>Signature:
                    <Field type="text" name="signature" />
                  </label>
                  <ErrorMessage name="signature" component="div" className="error" />

                  <label>Date:
                    <Field type="date" name="signatureDate" />
                  </label>
                  <ErrorMessage name="signatureDate" component="div" className="error" />
                </div>
              </Card>
            )}


            
            <div className="stickyNav">
              <div className="stepNav">
                {step > 0 && <button type="button" onClick={prevStep}>Back</button>}
                {step < totalSteps - 1 && (
                  <button type="button" onClick={nextStep} disabled={!dirty || !isValid}>Next</button>
                )}
                {step === totalSteps - 1 && (
                  <button type="submit" className="submitButton" disabled={!isValid}>Submit</button>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Application;
