const contestFormMocks = {
  nameContest: {
    type: 'name',
    selectInputs: [
      { name: 'typeOfName', header: 'type of company' },
      { name: 'nameStyle', header: 'Style name' },
    ],
    formInputs: [],
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
