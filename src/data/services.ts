export type ServiceDocument = {
  name: string;
  note: string;
};

export type Service = {
  slug: string;
  name: string;
  icon: string;
  short: string;
  description: string;
  applyLink: string;
  documents: ServiceDocument[];
};

export const services: Service[] = [
{
  slug: 'pan-card',
  name: 'PAN Card',
  icon: 'CreditCard',
  short: 'Your tax identity number, needed for banking and income filing.',
  description:
  'A Permanent Account Number is issued by the Income Tax Department and is mandatory for filing returns, opening most bank accounts, and high-value transactions.',
  applyLink: 'https://www.incometax.gov.in',
  documents: [
  { name: 'Aadhaar card', note: 'Primary identity proof' },
  { name: 'Passport-size photograph', note: 'Recent, plain background' },
  { name: 'Proof of date of birth', note: 'Birth certificate or matriculation certificate' },
  { name: 'Address proof', note: 'Utility bill, rent agreement or Aadhaar' },
  { name: 'Form 49A', note: 'Application form for Indian citizens' }]

},
{
  slug: 'passport',
  name: 'Passport',
  icon: 'Plane',
  short: 'Travel document issued by the Ministry of External Affairs.',
  description:
  'Apply online through Passport Seva, then visit a Passport Seva Kendra with originals. Police verification follows for most fresh applications.',
  applyLink: 'https://www.passportindia.gov.in',
  documents: [
  { name: 'Aadhaar card', note: 'Identity and address proof' },
  { name: 'Birth certificate', note: 'Or school leaving certificate with date of birth' },
  { name: 'Address proof', note: 'Electricity bill, bank passbook or rent agreement' },
  { name: 'PAN card', note: 'Supporting identity document' },
  { name: 'Annexure / self-declaration', note: 'Where applicable for minors or name change' },
  { name: 'Fee payment receipt', note: 'Generated after online appointment booking' }]

},
{
  slug: 'driving-license',
  name: 'Driving License',
  icon: 'Car',
  short: 'Learner’s and permanent license through your state RTO.',
  description:
  'Start with a learner’s licence, wait 30 days, then apply for the permanent licence and clear the driving test at your regional transport office.',
  applyLink: 'https://sarathi.parivahan.gov.in',
  documents: [
  { name: 'Form 1 / Form 2', note: 'Physical fitness declaration and application' },
  { name: 'Age proof', note: 'Birth certificate, PAN or school certificate' },
  { name: 'Address proof', note: 'Aadhaar, voter ID or utility bill' },
  { name: 'Learner’s licence', note: 'Required for the permanent licence stage' },
  { name: 'Passport-size photographs', note: 'Usually three copies' }]

},
{
  slug: 'voter-id',
  name: 'Voter ID (EPIC)',
  icon: 'Vote',
  short: 'Electoral photo identity card for citizens 18 and above.',
  description:
  'Register with the Election Commission via Form 6 to be added to the electoral roll of your constituency and receive your EPIC.',
  applyLink: 'https://voters.eci.gov.in',
  documents: [
  { name: 'Form 6', note: 'New elector registration form' },
  { name: 'Age proof', note: 'Birth certificate, PAN or Aadhaar' },
  { name: 'Address proof', note: 'Utility bill, passport or bank passbook' },
  { name: 'Passport-size photograph', note: 'Recent colour photo' }]

},
{
  slug: 'bank-account',
  name: 'Bank Account',
  icon: 'Landmark',
  short: 'Open a savings account with full KYC at any bank.',
  description:
  'Banks follow RBI’s KYC norms — one officially valid identity document and one address proof are the core requirement for a full-KYC savings account.',
  applyLink: 'local',
  documents: [
  { name: 'Aadhaar card', note: 'Officially valid document for KYC' },
  { name: 'PAN card', note: 'Or Form 60 if you do not hold a PAN' },
  { name: 'Address proof', note: 'Aadhaar, passport or utility bill' },
  { name: 'Passport-size photographs', note: 'Two copies for the account form' },
  { name: 'Initial deposit', note: 'Varies by bank and account type' }]

},
{
  slug: 'birth-certificate',
  name: 'Birth Certificate',
  icon: 'Baby',
  short: 'Registered proof of birth from your local municipal body.',
  description:
  'Issued by the municipal corporation or gram panchayat where the birth was registered, within 21 days of birth or with a late-registration affidavit.',
  applyLink: 'https://crsorgi.gov.in',
  documents: [
  { name: 'Birth registration form', note: 'From the municipal body or hospital' },
  { name: 'Hospital discharge summary', note: 'Proof of the birth event' },
  { name: 'Parents’ identity proof', note: 'Aadhaar of mother and father' },
  { name: 'Proof of residence', note: 'Address at the time of birth' },
  { name: 'Affidavit', note: 'Only for registrations after one year' }]

},
{
  slug: 'income-domicile-certificate',
  name: 'Income / Domicile Certificate',
  icon: 'FileText',
  short: 'State-issued proof of income or residence for schemes and quotas.',
  description:
  'Issued by the Tehsildar or revenue office, these certificates unlock scholarships, reservations and welfare schemes at the state level.',
  applyLink: 'local',
  documents: [
  { name: 'Application form', note: 'From the state e-district portal' },
  { name: 'Aadhaar card', note: 'Identity proof of the applicant' },
  { name: 'Ration card', note: 'Family and income reference' },
  { name: 'Salary slip or income affidavit', note: 'Self-declaration for informal income' },
  { name: 'Residence proof', note: 'Continuous residence in the state' }]

}];


export const getService = (slug?: string): Service | undefined =>
services.find((service) => service.slug === slug);