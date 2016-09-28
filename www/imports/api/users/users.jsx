import { uploadFunction, deleteFunction } from './upload'
import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

var UserProfile = new SimpleSchema({
  name: {
    type: String,
    label: 'Nombre',
    optional: true
  },
  gender: {
    type: String,
    label: 'Género',
    allowedValues: ['male', 'female'],
    optional: true
  },
  rut: {
    type: String,
    label: 'RUT',
    optional: true
  },
  picture: {
    type: Object,
    label: 'Foto',
    blackbox: true,
    optional: true,
    srf: {
      type: 'file',
      upload: uploadFunction,
      delete: deleteFunction
    }
  }
})

Meteor.users.attachSchema(new SimpleSchema({
  emails: {
    type: [Object]

  // For accounts-password, either emails or username is required, but not both. It is OK to make this
  // optional here because the accounts-password package does its own validation.
  // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
  // optional: true
  },

  // "emails.$": {
  //     type: Object
  // },
  'emails.$.address': {
    type: String,
    label: 'Dirección email',
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean,
    optional: true
  },
  createdAt: {
    type: Date
  },
  profile: {
    type: UserProfile,
    label: 'Perfil',
    optional: true
  },

  // Make sure this services field is in your schema if you're using any of the accounts packages
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },

  // Add `roles` to your schema if you use the meteor-roles package.
  // Option 1: Object type
  // If you specify that type as Object, you must also specify the
  // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
  // Example:
  // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP)
  // You can't mix and match adding with and without a group since
  // you will fail validation in some cases.
  // roles: {
  //     type: Object,
  //     optional: true,
  //     blackbox: true
  // },
  // Option 2: [String] type
  // If you are sure you will never need to use role groups, then
  // you can specify [String] as the type
  roles: {
    type: [String],
    optional: true
  },

  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true
  }
}))
