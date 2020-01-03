const Profile = require('./models/Profile');

module.exports = {
    Query: {
      profiles: () => Profile.find()
    },
    Mutation: {
      createProfile: async (_, { email }) => {
        const createdDate = new Date();
        const profile = new Profile({ email, createdDate });
        await profile.save();
        return profile;
      }
    }
};
