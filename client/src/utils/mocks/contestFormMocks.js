const contestFormMocks = {
  nameContest: {
    type: 'name',
    selectInputs: [
      { name: 'typeOfName', header: 'type of company' },
      { name: 'nameStyle', header: 'Style name' },
    ],
    formInputs: [],
    formButtons: [
      {
        id: 1,
        title: 'The Domain should exactly match the name',
        value: 'domainMatchOnly',
        selected: false,
        isDomainRequired: true,
      },
      {
        id: 2,
        title: 'But minor variations are allowed (Recommended)',
        value: 'domainMinorAllowed',
        selected: true,
        isDomainRequired: true,
      },
      {
        id: 3,
        title: 'I am only looking for a name, not a Domain',
        value: 'noDomain',
        selected: false,
        isDomainRequired: false,
      },
    ],
  },
  logoContest: {
    type: 'logo',
    selectInputs: [{ name: 'brandStyle', header: 'Brand Style' }],
    formInputs: [
      {
        title: 'What name of your venture?',
        name: 'nameVenture',
        type: 'text',
        label: 'name of venture',
      },
    ],
  },
  taglineContest: {
    type: 'tagline',
    selectInputs: [{ name: 'typeOfTagline', header: 'Type tagline' }],
    formInputs: [
      {
        title: 'What name of your venture?',
        name: 'nameVenture',
        type: 'text',
        label: 'name of venture',
      },
    ],
  },
};

export default contestFormMocks;
