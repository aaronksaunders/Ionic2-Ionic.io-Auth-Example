Simple Ionic2 App Using Ionic.io Auth And rxjs/BehaviorSubject
==
## This is based on a plunker that I wrote to show how to manage user state

**[Original Plunker: QuickStart Showing how to user BehaviorSubject to manage & track login state](http://embed.plnkr.co/sS7htB/)**

### Setup your application to use the [Ionic.io Auth Service for Authentication](https://docs.ionic.io/services/auth/); I am only touching on the key changes in the application to support the use of rxjs/BehaviorSubject to managing authentication state

Lets get into the code changes to get the app working for us; starting with our authentication service in `auth.ts`
```Javascript
// src/providers/auth.ts
//
// this will hold the user object when we have one, we can subscribe
// to changes of this object to determine of we are logged in or not
activeUser = new BehaviorSubject(null)
```

We us the Ionic.io Service to login a user and when the user is logged in we set the value of the BehaviorSubject using the values from the Ionic User object.
See the ionic documentation for additional information [https://docs.ionic.io/services/auth/](https://docs.ionic.io/services/auth/)
```Javascript
// src/providers/auth.ts
//
/**
* here we check to see if ionic saved a user for us
*/
doCheckAuth() {
    if (this.auth.isAuthenticated()) {
        // this will force the subscribers to get signaled there is user !!
        this.activeUser.next(Object.assign({}, this.user.details, { id: this.user.id }))
    }
}
````
Inside of the `app.component.ts` is where the real work is happening, we subscribe to the `this.auth.activeUser` from the Authentication 
Service to be notified of a change in status. When the activeUser is updated all subscribers will get notified with the new user
```Javascript
// src/app/app.component.ts
//
constructor(platform: Platform, private auth: Authentication) {
  platform.ready().then(() => {
    //...
  });

  // subscribe to the activeUser to see if we should go to the LoginPage
  // or directly to the HomePage since we have a user
  this.auth.activeUser.subscribe((_user) => {

    // get the user...
    this.currentUser = _user

    // if user.. show data, else show login
    if (this.currentUser) {
      this.rootPage = HomePage;
    } else {
      this.rootPage = LoginPage;
    }
  })

  // check to see if there is already a user... Ionic saves it for you,
  // this will automatically log the user in when you restart the application
  this.auth.doCheckAuth();

}
```
#### Check Out Video On YouTube

https://www.youtube.com/watch?v=QicFdqDi6ns
