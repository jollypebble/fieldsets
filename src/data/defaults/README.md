# Defaults
This directory allows you define default values for your application without having to instantiate a persistent remote DB store or graphql server. Ultimately it will also define the data structure pushed to the fieldsets backend and stored in the PostgreSQL data jsonb data store.

Using the local apollo cache and localforage, you can build an application without needing to connect to any sort of remote datastore. This allows for a flexible development process as you are working out the necessary front end data architecture of you application as you simply need to adjust the json defaults.

The json js objects defined in here will be iterated over and used as the data cache default values when no data can be loaded from the local or remote persistent data stores.
