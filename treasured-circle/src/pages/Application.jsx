import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import './Application.css';
import Card from '../components/Card';
import styles from '../components/Card.module.css';

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
                description={
                  <>
                    <p>
                      Want to…
                      <br />1. Make a difference in the life of an individual with an intellectual or developmental disability?
                      <br />2. Have a positive impact?
                      <br />3. Get paid for rewarding work while working out of your own home?
                    </p>

                    <p>
                      Work with <strong>Treasured Circle</strong> as a caregiver/host home provider and support a person with an intellectual or developmental disability in your home.
                      A “Host Home” is a residential program model providing people with developmental disabilities a stable home environment. The program is designed to allow a person to live with a family or individual without disabilities. The focus of this model is to get away from constantly changing staff situations. In essence, the person becomes a member of the family.
                    </p>

                    <p>
                      Host Home Providers are independent contractors, not employees, with Treasured Circle. As a Host Home Provider, you are required to provide supervision and training to the person in your home. Training may range from teaching the person with IDD how to do certain daily living tasks, budgeting, cooking and laundry skills to personal hygiene and behavior coping skills.
                      Some of the people who are in need of Host Home support may have more intensive needs, such as assistance with mobility, bathing, or toileting. These needs are addressed through a team of people from various disciplines and backgrounds (Interdisciplinary Team) who have a strong interest in the well-being of the person receiving services. As a Host Home Provider, you and the individual served are members of this team. All training and involvement with the person(s) in your home must be documented.
                    </p>

                    <p>
                      <strong>The daily contract payment</strong> to the Host Home Provider will constitute payment for all services rendered by the provider which include:
                      <ul>
                        <li>Room and board</li>
                        <li>Daily support services</li>
                        <li>Attendance at ongoing training, classes, and meetings.</li>
                      </ul>
                      The daily contractual payment is based on an individualized payment structure established by the State of Colorado, Division of Developmental Disabilities.
                    </p>

                    <p>
                      Host Home Providers may work with up to two (in some situations, three) individuals with disabilities in their home, depending on the number of bedrooms/bathrooms and the amount of shared space that is available. Individuals are able to choose their roommates, and a designated trial period is required to ensure the Host Home is an appropriate placement if agreed upon by the team.
                    </p>

                    <p>
                      <strong>Minimum Qualifications</strong><br />
                      Applicants must:
                      <ol>
                        <li>Be at least 18 years old, with a high school diploma or equivalent.</li>
                        <li>Be honest, dependable and caring with good judgment, understanding, and patience.</li>
                        <li>Be a good communicator with organizational skills.</li>
                        <li>
                          Have a house or apartment, rented or owned. The home must provide:
                          <ul>
                            <li>A private bedroom. A bathroom can be shared.</li>
                            <li>Common living areas: kitchen, living room, dining room, and outside yard.</li>
                          </ul>
                        </li>
                        <li>Provide a written description of your home and household.</li>
                        <li>Successfully clear background checks (criminal, driving, and references).</li>
                        <li>Be eligible to work in the developmental disability system (no disqualifying allegations).</li>
                        <li>Complete required training: QMAP, First Aid, CPR, Legal Rights, and others.</li>
                        <li>Communicate effectively with case managers, guardians, and professionals.</li>
                        <li>Carry automobile insurance and ideally full home/renter’s insurance.</li>
                        <li>Have internet, computer access, and required documentation tools.</li>
                      </ol>
                    </p>

                    <p>
                      <strong>For inquiries or more information, please contact:</strong><br />
                      Sinead Marie — 720-998-7165<br />
                      Email: <a href="mailto:treasuredcircle@gmail.com">treasuredcircle@gmail.com</a>
                    </p>

                    <p style={{ marginTop: "1.5rem", fontWeight: "bold" }}>
                      Before we begin, please ensure you have about 15–20 minutes to complete the full application. Click below to get started.
                    </p>
                  </>
                }
                buttonText="Start Application"
                onButtonClick={() => setStep(0)}
                variant="cta"
                className={styles.introCardCta}
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
