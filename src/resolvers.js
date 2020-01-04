const Profile = require('./models/Profile');
const Event = require('./models/Event');

module.exports = {
    Profile: {
      events: async (profile) => {
        return (await profile.populate('events').execPopulate()).events;
      }
    },
    Event: {
      creator: async (event) => {
        return (await event.populate('creator').execPopulate()).creator;
      }
    },
    Query: {
      profiles: () => Profile.find(),
      events: () => Event.find()
    },
    Mutation: {
      createProfile: async (_, { email }) => {
        const createdDate = new Date();
        const profile = new Profile({ email, createdDate });
        await profile.save();

        return profile;
      },

      createEvent: async (_, { name, creator, date, description }) => {
        const event = Event.create({ creator, name, date, description });
        const profile = Profile.findById(creator);

        await profile.update(
          { _id: creator },
          { $push: { events: event } }
        );

        return event;
      }
    }
};
