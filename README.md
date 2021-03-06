# Login protected React app featuring Google Maps driving directions

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Built with React `16.9`

## How to install and run

Clone, install and run the Node.js authentication app:  
https://github.com/ChristianRich/node-server-side-firebase-auth

Once above code base is running on `localhost:3001`, in this repo, install dependencies and start the React app:

```
yarn
yarn start
```

## Available login credentials

Valid user (`HTTP 200`)

```
admin@test.com
123456
```

Registered user with insufficient permissions (`HTTP 401`)

```
user@admin.com
123456
```

Non registered user. Any random credentials will do :-)

```
foo@bar.com
123456
```

## Known issues

- There's a concurrency issue or race condition with initial login, `authUser` is being accessed from `localStorage` before it exists (make async listener function)
- Google Maps is initialised twice. Should remove the API key in index.html and only pass it in the Maps component

## TODO

- Add unit tests (jest)

## Available Scripts

In the project directory, you can run:

### `yarn deploy:stg`

Builds and deploy app to Firebase staging env

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
