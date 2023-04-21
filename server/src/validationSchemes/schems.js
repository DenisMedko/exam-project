const yup = require('yup');

module.exports.registrationSchem = yup.object().shape({
  firstName: yup.string().required().min(1),
  lastName: yup.string().required().min(1),
  displayName: yup.string().required().min(1),
  email: yup.string().email().required().min(4),
  password: yup.string().required().min(1),
  role: yup
    .string()
    .matches(/(customer|creator)/)
    .required(),
});

module.exports.loginSchem = yup.object().shape({
  email: yup.string().email().required().min(4),
  password: yup.string().required().min(1),
});

module.exports.contestSchem = yup.object().shape({
  contestType: yup
    .string()
    .matches(/(name|logo|tagline)/)
    .required(),
  title: yup.string().required().min(1),
  industry: yup.string().required().min(1),
  focusOfWork: yup.string().required().min(1),
  targetCustomer: yup.string().required().min(1),
});

module.exports.EventSchem = yup.object().shape({
  title: yup.string().required().min(1),
  eventDate: yup.date().required(),
  remainingDate: yup.date().required(),
});
