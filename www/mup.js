module.exports = {
  servers: {
    one: {
      host: '45.55.141.9',
      username: 'root',
      // pem:
      password: ''
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'federeichon',
    path: '.',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://45.55.141.9',
      MONGO_URL: 'mongodb://localhost/federeichon'
    },

    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
