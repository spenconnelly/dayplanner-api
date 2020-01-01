const Profile = require('./models/Profile');

module.exports = {
    Query: {
      hello: () => 'hello'
    },
    Mutation: {
      createProfile: (_, { email }) => {
        const profile = new Profile({ email });
        return profile.save();
      }
    }
};
