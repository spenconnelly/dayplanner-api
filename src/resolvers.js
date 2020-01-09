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
          { $push: { events: event, participants: event } }
        );

        return event.save();
      },

      addEventParticipant: async (_, { eventId, profileId }) => {
        const event = Event.findById(eventId, (err, event) => {
          if (err) {
            return null;
          }

          if (event) {
            Profile.findById(profileId, (err, profile) => {
              if (err) {
                return null;
              }

              if (profile && !event.participants.includes(profileId)) {
                event.participants.push(profile.id);
                profile.events.push(profile.id);
                event.save();
                profile.save();
              }
            });
          }
        });

        return event;
      }
    }
};
