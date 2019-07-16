export const clients = `
  fragment client on Client @client {
    id
    accountName
    clientName1
    clientName2
    cpaName
    attyName
    ipAddress
  }

  fragment clients on ClientList @client {
    id
    list {
      ...client
    }
  }
`;
