const mocks = {
  baseBundles: [
    {
      id: 1,
      path: ['Name.png'],
      header: 'Name',
      describe: 'Get up and running with the perfect name.',
    },
    {
      id: 2,
      path: ['Logo.png'],
      header: 'Logo',
      describe: 'Kickstart your venture with a unique, memorable logo.',
    },
    {
      id: 3,
      path: ['Tagline.png'],
      header: 'Tagline',
      describe:
        'Connect deeply with your target audience with an on-target tagline.',
    },
  ],
  combinedBundles: [
    {
      id: 1,
      path: ['Name.png', 'Logo.png'],
      header: 'Name+Logo',
      describe:
        'Get the essentials needed to establish your brand together and save.',
    },
    {
      id: 2,
      path: ['Name.png', 'Tagline.png'],
      header: 'Name+Tagline',
      describe: 'Communicate your vision with the perfect Name/Tagline combo.',
    },
    {
      id: 3,
      path: ['Logo.png', 'Tagline.png'],
      header: 'Name+Tagline+Logo',
      describe: 'Description for Logo + Tagline will come here.',
    },
    {
      id: 4,
      path: ['Name.png', 'Logo.png', 'Tagline.png'],
      header: 'Tagline+Logo',
      describe:
        'Establish your entire brand identity and save with this bundle.',
    },
  ],
};
export default mocks;
