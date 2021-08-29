import Style from './VolunteerRequestComponent.module.css';

const YES_NO_OPTIONS = [
  {
    label: 'Yes',
    value: 'true',
  },
  {
    label: 'No',
    value: 'false',
  },
];

const EXAMPLE_PERSONAL = [
  {
    type: 'text',
    name: 'name',
    label: 'Full Name',
    required: true,
    htmlInputAttributes: {
      placeholder: 'Full Name',
    },
    validityChecker: (e: React.FormEvent<HTMLInputElement>) => {
      if (!e.currentTarget.validity.valid) {
        return 'Please enter your full name';
      }
      return '';
    },
  },
  {
    type: 'email',
    name: 'email',
    label: 'Email',
    required: true,
    htmlInputAttributes: {
      placeholder: 'Email',
    },
  },
  {
    type: 'tel',
    name: 'phone',
    label: 'Phone Number',
    htmlInputAttributes: {
      placeholder: 'Phone Number',
    },
  },
  {
    type: 'text',
    name: 'address',
    label: 'Address',
    htmlInputAttributes: {
      placeholder: 'Address',
    },
  },
  {
    type: 'text',
    name: 'postal',
    label: 'Postal Code',
    required: true,
    htmlInputAttributes: {
      placeholder: 'Postal Code',
      className: Style.zipcodeInput,
      pattern:
        '[a-zA-Z][0-9][a-zA-Z] ?[a-zA-Z][0-9][a-zA-Z]|([a-zA-Z]{2})?[0-9]{5}',
    },
    validityChecker: (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.patternMismatch) {
        return 'Please enter a valid postal code (A1A A1A) or zip code (00000)';
      } else if (!e.currentTarget.validity.valid) {
        return 'Please enter your postal code';
      }
      return '';
    },
  },
  {
    type: 'checkbox',
    name: 'languages',
    label: 'Languages spoken with conversational proficiency',
    options: [
      {
        label: 'English',
        value: 'english',
      },
      {
        label: 'French',
        value: 'french',
      },
    ],
  },
];

const EXAMPLE_VOLUNTEERING = [
  {
    type: 'checkbox',
    name: 'offer',
    label: 'What I would like to do:',
    required: true,
    options: [
      {
        label: 'Run grocery shopping errands',
        value: 'grocery',
      },
      {
        label: 'Make phone calls to elderly people',
        value: 'phone',
      },
      {
        label: 'Take someone to vaccination appointment',
        value: 'vaccine',
      },
      {
        label: 'Participate in Walk & Talk Program',
        value: 'walk&talk',
      },
      {
        label: 'Participate in Wise Connections seniors tech training program',
        value: 'tech',
      },
    ],
    validityChecker: (e: React.FormEvent<HTMLInputElement>) => {
      if (!e.currentTarget.validity.valid) {
        return 'Please select at least one option';
      }
      return '';
    },
  },
  {
    type: 'number',
    name: 'time',
    label: 'Time commitment per week (approximate):',
    htmlInputAttributes: {
      placeholder: 'Hours',
      className: Style.hoursInput,
      min: '0',
      max: '168',
    },
  },
  {
    type: 'radio',
    name: 'license',
    label: "Do you have access to a vehicle and/or have a driver's license?",
    options: [
      {
        label: 'I have a car and a license',
        value: 'carlicense',
      },
      {
        label: 'I have another vehicle type and a license',
        value: 'otherlicense',
      },
      {
        label: 'I have a license but no vehicle',
        value: 'license',
      },
      {
        label: 'I have a bike',
        value: 'bike',
      },
      {
        label: 'I do not have a vehicle or license',
        value: 'none',
      },
    ],
  },
];

const EXAMPLE_HEALTH = [
  {
    type: 'radio',
    name: 'covid',
    label:
      'Are you currently sick with COVID-19 or experiencing any COVID-19 symptoms?',
    required: true,
    options: YES_NO_OPTIONS,
  },
  {
    type: 'radio',
    name: 'contactedcovid',
    label:
      'Have you been in close contact with someone with COVID-19 or someone who may have COVID-19?',
    required: true,
    options: YES_NO_OPTIONS,
  },
  {
    type: 'radio',
    name: 'travelledcovid',
    label:
      'Have you travelled abroad in the past two weeks or been in close contact with someone who has?',
    required: true,
    options: YES_NO_OPTIONS,
  },
];

export const EXAMPLE_FORM = [
  {
    id: 'personal-info',
    label: 'Personal Information',
    formFields: EXAMPLE_PERSONAL,
  },
  {
    id: 'volunteering-info',
    label: 'Volunteering Information',
    formFields: EXAMPLE_VOLUNTEERING,
  },
  {
    id: 'health-info',
    label: 'COVID-19 Health Information',
    formFields: EXAMPLE_HEALTH,
  },
];