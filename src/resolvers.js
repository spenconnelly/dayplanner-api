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

      profile: async (_, { id }) => await Profile.findById(id),

      profileByEmail: async (_, { email }) => await Profile.findOne({ email }),

      event: (_, { id }) => Event.findById(id)
    },

    Mutation: {
      findOrCreateProfile: async (_, { email }) => {
        const profile = await Profile.findOne({ email });
        if (!profile) {
          const createdDate = new Date();
          const newProfile = new Profile({ email, createdDate });
          return newProfile.save();
        }
        return profile;
      },

      createEvent: async (_, { creator, name, date, description }) => {
        const event = new Event({ creator, name, date, description, participants: [creator] });
        const profile = Profile.findById(creator);

        await profile.updateOne(
          { _id: creator },
          { $push: { events: event, participants: event } }
        );

        return event.save();
      },

      addEventParticipant: async (_, { eventId, profileId }) => {
        const event = await Event.findById(eventId);
        const profile = await Profile.findById(profileId);

        if (event && profile) {
          event.participants.push(profile.id);
          profile.events.push(profile.id);
          event.save();
          profile.save();
        }

        return event;
      }
    }
};
