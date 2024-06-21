# auth0-nextjs-embedded

This is a custom hook library where you can authenticate your user on the client side of Next.js with embedded login. It is based on the all client side library [auth0.js](https://auth0.github.io/auth0.js/) build by Auth0.

## Why this library when there is auth0-nextjs and auth0-react?
1. Auth0 claims using embedded login will increase security vulnerabilities, so they only push universal login and would not recommend using embedded login.
2. Auth0 provide us with the SDK [nextjs-auth0](https://github.com/auth0/nextjs-auth0) for Next.js - Auth0 authentication, some would suggest using an auth0 spa library, however they only support universal login. 
3. This library will enable you to authenticate user on client with embedded login, where you can customize and create a more seamless UX/UI for your website needs.

![Release](https://img.shields.io/npm/v/auth0-nextjs-embedded)
![Downloads](https://img.shields.io/npm/dw/auth0-nextjs-embedded)
[![License](https://img.shields.io/:license-MIT-blue.svg?style=flat)](https://opensource.org/licenses/MIT)


 [Documentation](#documentation) -  [Getting Started](#getting-started) -  [API Reference](#api-reference) -  [Feedback](#feedback)

## Documentation
- [Options](#options) Basic configurations for Auth0
- [Types](#types) Types of each functions, configs and options.
- [Examples](https://github.com/auth0/auth0.js/blob/master/EXAMPLES.md) - code samples for common auth0-js authentication scenario's.

## Getting started

### Installation

From [npm](https://npmjs.org):

```sh
npm install auth0-nextjs-embedded
```

After installing the `auth0-nextjs-embedded` module using [npm](https://npmjs.org), you'll need to import the exposed hook `useAuth0`:

```ts
import { useAuth0 } from 'auth0-nextjs-embedded';
```

### Configure the Hook

#### useAuth0(options: Auth0Config): Auth0Hook
initialize configuration for useAuth0 with your Auth0 basic information
```ts
const { user } = useAuth0({
  domain: '{YOUR_AUTH0_DOMAIN}',
  clientID: '{YOUR_AUTH0_CLIENT_ID}'
  ...
});
```
Auth0Hook: Describes the Auth0Hook interface comprehensively, detailing its properties (isAuthenticated, user, isLoading, error) and methods (signupAndAuthorize, login, loginWithSocialProvider, logout, parseHash, passwordReset, revalidate, checkSession).

## API reference

### Types
Many of the types and options are extended from the [auth0.js](https://auth0.github.io/auth0.js/) library. Please check it with their documentations for detailed options.

| Type / Interface          | Description                                                     |
|---------------------------|-----------------------------------------------------------------|
| `Auth0Error`              | Error object used for Auth0-related errors.                      |
| `Auth0UserProfile`        | User profile object returned by Auth0 after authentication.      |
| `AuthOptions`             | Options object used for configuring Auth0 authentication.        |
| `ChangePasswordOptions`   | Options object for changing the user's password.                 |
| `CheckSessionOptions`     | Options object for checking the session status with Auth0.       |
| `DbSignUpOptions`         | Options object for signing up a new user using a database connection in Auth0. |
| `LoginOptions`            | Options object for logging in a user.                            |
| `LogoutOptions`           | Options object for logging out a user.                           |
| `ParseHashOptions`        | Options object for parsing the hash after authentication.        |
| `Auth0User`               | Interface representing an Auth0 user profile. Extends `Auth0UserProfile`. |
| `Auth0Config`             | Interface representing Auth0 configuration options. Extends `AuthOptions`. |
| `Auth0Hook`               | Interface representing a hook for Auth0 authentication management. Includes: <br>- `isAuthenticated`: Boolean indicating if user is authenticated. <br>- `user`: Current user profile (`Auth0User` or `null`). <br>- `isLoading`: Boolean indicating if authentication operations are in progress. <br>- `error`: Auth0 error object (`Auth0Error` or `null`). <br>- Methods for authentication operations: <br>  - `signupAndAuthorize(signUpForm: DbSignUpOptions)`: Sign up and authorize a user. <br>  - `login(loginForm: LoginOptions)`: Log in a user. <br>  - `loginWithSocialProvider(provider: Auth0SocialProvider)`: Log in with a social provider (`Auth0SocialProvider`). <br>  - `logout(logoutOptions: LogoutOptions)`: Log out a user. <br>  - `parseHash(hashOptions: ParseHashOptions)`: Parse authentication hash. <br>  - `passwordReset(resetForm: ChangePasswordOptions)`: Reset user's password. <br>  - `revalidate(checkSessionForm: CheckSessionOptions)`: Revalidate session. <br>  - `checkSession(checkSessionForm: CheckSessionOptions)`: Check session status. |
| `Auth0SocialProvider`     | Type representing supported social providers for Auth0 authentication: `"google-oauth2"`, `"linkedin"`. |


## Feedback

### Contributing

More features are coming to encapsulte the `auth0.js` library from Auth0 for embedded login.
I welcome and appreciate feedback and contribution to this repo!

### Raise an issue

To provide feedback or report a bug, please [raise an issue on our issue tracker](https://github.com/AnthonyZhang220/auth0-nextjs-embedded/issues).

---
