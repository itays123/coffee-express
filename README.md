This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and programmed with passion by me.

# Coffee Express

This is an online coffee shop, created with GraphQL and the MERN stack - MongoDB, Express.js, React.js and Node.js

## Available Scripts

In the project directory, you can run the create-react app built in scripts and a few of my own:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run server`

**Runs the server with nodemon**

### `npm run dev`

This script is used for development.<br />
It runs **`npm run server` and `npm start`** at the same time, 
so the frontend can interact with the backend.

### `npm run add-offer` and `npm run add-store`

These scripts run a query that adds an offer or a store to the database, and it's completely independent from the frontend.

## Devops

### Server Environment Variables

In order for the server to work correctly, add these 3 environment variables to an `.env` file in the root directory:
- `DB_URL` is the url of your MongoDB database. Either use a MongoDB Atlas URL, or the dockerized MongoDB version of it. If you wish touse the dockerized version of Mongo, simply add it to the docker-compose-file and change the DB_URL environment variable.
- `AUTH_TOKEN` is a custom string that will be used for encrypting the authentication token.
- `PASSWORD` is a custom string responsible for the mailing system to work. If you wish to use it, change the email in use.

### Docker

As of February 2021, this project has a full docker support.

## Architecture

### Frontend Components

The frontend is created with React.js and create-react-app. When entering the `src` folder, you will find a various of components:
- auth
    - address
        - `AddressForm` - responsible for collecting address information
        - `ChangeAddressModal` - responsible for changing the registrered address of an authenticated user.
    - form
        - `AddressForm` - responsible for collecting emails and passwords.
    - password
        - `ChangePasswordModal` - responsible for change the registrered password of authenticated users.
        - `ForgotPassword`- the page responsible for changing the password, after email confirmation.
        - `ForgotPasswordModal` - responsible for sending an email confirmation for users who forgot their passwords.
    - `AuthContext` - responsible for fetching and storing auth data.
    - `LoginModal` - responsiblle for the logging in functionality.
    - `SignupModal` - responsible for the registering functionality.
- cart
    - `Cart` - the page responsible for displaying the current cart in memory.
    - `CartConfirm` - responsible for picking an address to ship the offer to.
    - `CartContext` - responsible for fetching purshase operations and storing the cart.
    - `CartItem` - responsible for displaying an individual cart item.
- layout
    - feedback
        - `Feedback` is the component respnsible for submitting feedbacks to the system.
        - `Rating` is the 5-star ating system.
    - Loading
        - `Loading` is the CSS loading spinner.
    - Modal
        - `Modal` is an higher-order component responsible for showing modals on the screen
        - `Notification` is a component that displays a small message in the screen
    - Navigation
        - `NavAction` is a customizeable button for navbar actions
        - `Navbar` is the wrapper of the desired links and actions to display
        - `NavItem` is a custom navlink, combined with an icon.
        - `SignedInLinks` is the list of links and actions relevant for signed in users.
        - `SignedOutLinks` is the list of links and actions relevant for unauthenticated users.
    - `AppContext` controls the flow of loading and notifications.
    - `Home` is the page containing information for various parts of the site.
- offers
    - CoffeeCup
        - `CoffeeCup` is responsible for displaying a custom-sized cup of coffee with custom ingredients (from bottom to top)
    - Offer
        - `AllOffers` is a component displaying all offers, ordered by date.
        - `LastOffers` is a component displaying last offers of authenticated users and recently added offers of unauthenticated users.
        - `Offer` is a component responsible for displaying a single offer.
    - `OfferContext` is a component responsible for fetching and storing offer data.
    - `OfferPage` is a dynamic route responsible for displaying offers.
    - `Shop` is a route displaying all offers and last offers.
- `App` is the main component.