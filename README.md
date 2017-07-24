# Spotify sample app

### What's this?
- This repo contains a simple application that allows an spotify user to create and manipulate his private playlists 
outside the official Spotify client
- This is only intended to be a demonstration about how can we build up an ES6 React-Redux app from scratch that can do async
requests to a remote server
- The app also contains a very basic nodejs backend server, made with ``express`` that allow us to complete the Spotify's
authentication flow.

#### Tech stack
- ``webpack v2``
- ``babel``
- ``react.js v15``
- ``redux v3``
- ``react-router v4``
- ``material-ui``
- ``sass``
- ``Express.js``

#### How can I run the app?
- ``npm start`` will run both backend/frontend servers
- Once the build process is completed. You can access the app on http://localhost:3000

#### Pending items:
- Most of the styling is pending
- Spotify playlist save/delete API calls. Currently the playlists are not saved into the spotify account. Instead **they are saved into browser's local storage**
- Handling of Spotify's expired tokens & refresh tokens logic is also pending
- View/Modify playlist page is not yet developed

#### About the author
[LinkedIn: Matias Bogado](https://www.linkedin.com/in/mat%C3%ADas-bogado-71108652/)
