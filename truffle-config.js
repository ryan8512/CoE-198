module.exports = {
  mocha: {
    enableTimeouts: false
  },

  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
  },
  contracts_directory: './src/backend/contracts/',
  contracts_build_directory: './src/backend/abis/',
  migrations_directory: './src/backend/migrations/',
  test_directory: './src/backend/test/',

  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }

}
