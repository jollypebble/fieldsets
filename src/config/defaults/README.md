# Defaults
This directory allows you define default values for your application without having to instantiate a persistant DB store. Ultimately it will also define the data structure pushed to the fieldsets backend and stored in the PostgreSQL data jsonb data store.

Using the local apollo cache and IndexedDB, you can build an application without needing to connect to any sort of remote datastore. This allows for a flexible development process as you are working out the necessary front end data architecture of you application as you simply need to adjust the json defaults.
