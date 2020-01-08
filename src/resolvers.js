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
      },
      participants: async (event) => {
        return (await event.populate('participants').execPopulate()).participants;
      }
    },
    Query: {
      profiles: () => Profile.find(),
      events: () => Event.find(),
      profile: (_, { id }) => Profile.findById(id, (err, res) => {
          if (err) console.log(err);
          return res;
      }),
      profileByEmail: (_, { email }) => Profile.findOne({ email }, (err, res) => {
          if (err) console.log(err);
          return res;
        }),
      event: (_, { id }) => Event.findById(id)
    },
    Mutation: {
      createProfile: async (_, { email }) => {
        const createdDate = new Date();
        const profile = new Profile({ email, createdDate });
        await profile.save();

        return profile;
      },

      createEvent: async (_, { creator, name, date, description }) => {
        const event = new Event({ creator, name, date, description, participants: [creator] });
        const profile = Profile.findById(creator);

        await profile.update(
          { _id: creator },
          { $push: { events: event } }
        );

        return event.save();
      },

      addEventParticipant: async (_, { eventId, profileId }) => {
        const event = Event.findById(eventId);
        const profile = Profile.findById(profileId);

        await profile.update(
          { _id: profileId },
          { $push: { events: event } }
        );

        await event.update(
          { _id: eventId },
          { $push: { partipants: profile } }
        );

        return event;
      }
    }
};
