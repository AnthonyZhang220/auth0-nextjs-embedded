# Examples using auth0-nextjs-embedded
## How to use the useAuth0 Hook in Next.js
### Basic Example
```ts
"use client";

const { user, login, signupAndAuthenticate, logout, handleAuthentication } = useAuth0({
    domain: `{Your Domain from Auth0}`, 
    clientID: `{Your Domain from Auth0}`
    ...   
})
```

```tsx
//signup
<form onSubmit={()=> signupAndAuthenticate(email: "email@email.com", password: "password", connection: "User-Password-Authentication")}>
    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="email" required>
    <label for="password"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required>
    <button type="submit">Sign Up</button>
</form>

//login
<button onClick={()=> login(username: "username", password: "password")}>Login</button>

//logout
<button onClick={()=> logout(returnTo: "Your callback URL")}>Logout</button>

//user
function UserProfile(){
    const { user, handleAuthentication } = useAuth0({...config})

    useEffect(()=>{
        handleAuthentication({})
    }, [])

    return (
        user ? <h1>Your are logged in as {user.name}</h1> : <NotAuthorized/>;
    )
}

export default UserProfile;

```

