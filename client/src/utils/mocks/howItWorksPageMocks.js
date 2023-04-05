const howItWorksPageMocks = {
  hero: {
    title: 'How Does Squadhelp Work?',
    text: 'Squadhelp helps you come up with a great name for your business by combining the power of crowdsourcing with sophisticated technology and Agency-level validation services.',
    pic: 'howItWorksImages/app-user.svg',
  },
  services: {
    title: '3 Ways To Use Squadhelp',
    text: 'Squadhelp offers 3 ways to get you a perfect name for your business.',
    cards: [
      {
        id: 1,
        pic: 'howItWorksImages/card1.svg',
        title: 'Launch a Contest',
        text: 'Work with hundreds of creative experts to get custom name suggestions for your business or brand. All names are auto-checked for URL availability.',
        btn: { title: 'Launch a Contest', link: '/startContest' },
      },
      {
        id: 2,
        pic: 'howItWorksImages/card2.svg',
        title: 'Explore Names For Sale',
        text: 'Our branding team has curated thousands of pre-made names that you can purchase instantly. All names include a matching URL and a complimentary Logo Design',
        btn: { title: 'Explore Names For Sale', link: '' },
      },
      {
        id: 3,
        pic: 'howItWorksImages/card3.svg',
        title: 'Agency-level Managed Contests',
        text: 'Our Managed contests combine the power of crowdourcing with the rich experience of our branding consultants. Get a complete agency-level experience at a fraction of Agency costs',
        btn: { title: 'Learn More', link: '' },
      },
    ],
  },
  features: {
    icon: 'howItWorksImages/cup.svg',
    title: 'How Do Naming Contests Work?',
    pic: 'howItWorksImages/feature-user.svg',
    featuresList: [
      {
        id: 1,
        text: 'Fill out your Naming Brief and begin receiving name ideas in minutes.',
      },
      {
        id: 2,
        text: 'Rate the submissions and provide feedback to creatives. Creatives submit even more names based on your feedback. ',
      },
      {
        id: 3,
        text: 'Our team helps you test your favorite names with your target audience. We also assist with Trademark screening.',
      },
      {
        id: 4,
        text: 'Pick a Winner. The winner gets paid for their submission.',
      },
    ],
  },
};
export default howItWorksPageMocks;
