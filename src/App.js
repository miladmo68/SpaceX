import { Switch, Route, useRouteMatch } from 'react-router-dom';

import './App.css';

import Launches from './pages/Launches';
import LaunchDetails from './pages/LaunchDetails';

function App() {

  // You can use match for dynamic generation of urls
  // Useful when nesting long URLs (Optional for smaller applications)
  const match = useRouteMatch();
  console.log('This provides the base URL');
  console.log(match.url); // This gives us a "/" which is the base url


  return (
    <div className="App">
      <div className="container">
        <div className="jumbotron">
          <h1>SpaceX</h1>
          <p className="lead">Welcome to our SpaceX application!</p>
        </div>
        <Switch>
          <Route exact path={`${match.url}launch/:launchId`}>
            {/* in route paths, especially in JS, anything prefixed with a : means it's a variable. eg :id */}
            {/* Params are placeholders in the URL that begin with a colon, like the `:launchId` param */}
            {/* This will be used to pass data from one page to the  next through the URL */}
            <LaunchDetails />
          </Route>
          <Route exact path={match.url}>
            <Launches />
          </Route>
        </Switch>
        
      </div>
    </div>
  );
}

export default App;



/*


NOTES:

DAY 11 - API

For file pathing, let's use a feature we haven't used before (useRouteMatch)
React Router has a hook called useRouteMatch(), which allows us to build relative route paths and link locations, thus making our code more flexible
The useRouteMatch hook attempts to match the current URL in the same way that <Route> would.
It's mostly useful for getting access to the match data without actually rendering a <Route>
useRouteMatch() gives us access to the "match" object
The default way to "resolve" URLs is to join the match.url string to the "relative" path

A match object contains information about how a <Route path> matched the URL. match objects contain the following:

  params - (object) key/value pairs parsed from the URL corresponding to the dynamic segments of the path
  isExact - (boolean) true if the entire URL was matched (no trailing characters)
  path - (string) The path pattern used to match. Useful for building nested <Route>s
  url - (string) The matched portion of the URL. Useful for building nested <Link>s











DAY 10 - API

AJAX (Asynchronous JavaScript and XML):

  Ajax is a programming technique used to update a webpage's content asynchronously without reloading the page.

  *** Homework: Read up on Ajax and REST APIs ***

  XMLHttpRequest allowed us to make this happen
  Using this method you could call the server to fetch or send data from the Front End (using JS).
  Which is turn, dynamically updated the content of the webpage.

  WHAT IS A REST API:

  REST (Representational State Transfer) API (Application Programming Interface):
    A REST API is a way for 2 computer systems to communicate over HTTP in a similar way to web browsers and servers.



    To receive response data from an API, we must have an Endpoint URL.
    These are some HTTP methods that can be used on any endpoint which map to the application CRUD operations:
    CRUD = Create, Read, Update and Delete

    For Example: If you have a database of students
    1. You can create (add) a new student.
    2. You can read the database and get a list of students.
    3. You can update a student's profile.
    4. You can delete a student from the database.

    HTTP Methods: POST, GET, PUT and DELETE

    When we receive a response from an API, it's usually in JSON format (JavaScript Object Notation)

    For our API Testing purposes we will using Postman
      - Postman is an API client that is used for testing Ajax calls and the response from the API.

    AXIOS:
      Axios is a third party library that you can add to any JS project (not just React)
      It is promise-based (ES6 feature)
      Axios returns the data object we expect right away, without having to pass the results of the HTTP request to the .json() method
      Any error with an HTTP request will successfully execute the .catch() block.

      What is the Axios Response Object?

        We send a request to a server, it returns a response.
        The Axios response object contains the following:

          data - the payload returned from the server
          status - the HTTP code returned from the server
          statusText - the HTTP status message returned by the server
          headers - headers sent by the server
          config - the original request configuration
          request - the request object


*/