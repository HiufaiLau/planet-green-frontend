## E-commerce Planet Green - Frontend

This project is basically using functional components and redux.
A functional component is a plain JavaScript function which accepts props as an argument and returns a React element.

# Getting Start

1. git clone or download this frontend project to your local machine

2. make sure that nodejs is installed, if not please follow the link:

- https://nodejs.org/en/download/

3. run `npm install` in terminal

4. run `npm start` and make sure your app is running

5. for new project could do the follow:

```
npx create-react-app <your-app-name>
cd <your-app-name>
npm start

```

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Dendencies for this project

There are some dependencies shoud be installed, if not please insert the following command lines in terminal:

1. axios - Promise based HTTP client for the browser and node.js

- `npm install axios`
- Make http requests from node.js
- Supports the Promise API
- Intercept request and response
- Transform request and response data
- Cancel requests
- Automatic transforms for JSON data

2. http-proxy-middleware - connect with server host

- `npm install http-proxy-middleware`
- proxy setting in src/setupProxy.js
- add `"proxy": "http://localhost:5000"` in package.json

3. js-cookie - get and remove cookies

- `npm install js-cookie`
- https://www.npmjs.com/package/js-cookie#json

4. redux

- `npm install redux`
  https://www.npmjs.com/package/redux

5. redux-thunk - middleware for Redux

- `npm install --save redux-thunk`
- It allows you to write action creators that return a function instead of an action.
- The thunk can be used to delay the dispatch of an action,
- or to dispatch only if a certain condition is met.
- The inner function receives the store methods dispatch and getState as parameters.

6. react-redux - If you are using Redux and React together, you should also use React-Redux to bind these two libraries.

- `npm install --save react-redux`

# User Flow

generally could see without login:

1. home screen to select product,
2. product screen to show product detail and add product to cart
3. cart screen to proceed checkout
4. side bar and nav bar

create user

1. register user account
2. in MongoDB please choose one user and change the role as 'admin'
3. signin user:

   - As 'admin' role, could choose product in dropdown to create and update a product

     - a product detail or images of a product could be uploaded and deleted seperately
     - thorugh signin as admin > click product in dropdown > click edit in a product.

   - As 'user' role, could proceed the whole checkout process

# Files in this porject

1. setupProxy.js

- to solve the CORS problem and handle the http request from different port
- The CORS mechanism supports secure cross-origin requests and data transfers between browsers and servers.

2. App.js

- defined all the routes to different screens

3. store.js

- initialized cookie states
- root reducer to combine all reducers

4. reducers folder

- contains differents reducers to specify different states change

5. actions folder

- contains different actions to fetch data and make request.
- Actions are payloads of information that send data from your application to your store. They are the only source of information for the store.

6. constants folder

- contains different action types
- As actions must have a type property that indicates the type of action being performed.
- Types should typically be defined as string constants.

7. screens folder

- like the view, display information at browser

8. components folder

- contains all small components which would be imported to screens

9. styles folder

- contain all stlying for this apps
