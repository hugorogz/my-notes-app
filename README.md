# Getting Started with Notes App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

<img width="1080" alt="Screenshot 2025-05-01 at 1 42 00 a m" src="https://github.com/user-attachments/assets/49a84319-4801-4b8e-88e4-6237bcdd01ef" />


Apart from the React app (UI), I've decided to also mock a server to better illustrate the architechture I would follow for a project like this instead of just using mocked data in localStore. I think this approach would be really good in terms of creating a POC so both backend and frontend part of the picture can be illustrated in early development stages of a project like this one.

## To install/run this Notes App:

- You need to have previously installed in your system MongoDB
- Run `npm i` in root directory to install react app packages
- `cd server` to access server directory
- Run `npm i` in `server` to install Node/Express packages

Before start, since we are using mock data to simulate a Login/User selection:
- in `server` root, run this: `node seed.js`

This will insert mock data in the database, this includes 2 users, 10 UserA notes, 3 UserB notes. 
Two of the UserA Notes are shared to UserB so you should see 4 of them for UserB

Now, run the whole setup:
- Run `npm run start` to run both react app and node server
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- Server will run on [http://localhost:8888](http://localhost:8888).

## Other available scripts
- `npm run test` to run Jest test suites
- `npm run lint` to run eslint
- `npm run format` for prettier formating


## Some important libraries used

- `"@mui/material": "^7.0.2"` for Styled elements and Grid for Notes https://mui.com/material-ui/getting-started/
- `"uuid": "^11.1.0"` for unique Note ids https://www.npmjs.com/package/uuid
- `"react-quill-new": "^3.4.6"` to implement and handle the rich-text editor capabilities https://www.npmjs.com/package/react-quill-new
- `"sass": "^1.87.0"` for css styling
- `"mongoose": "^8.14.1"` for mongo db connection and schemas
- `"@reduxjs/toolkit": "^2.7.0"` for state management
- `"socket.io": "^4.8.1"` for real time collab (CURRENTLY NOT WORKING)


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
