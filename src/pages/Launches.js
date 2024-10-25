import { useState, useEffect } from "react"; // using React Hooks
import axios from "axios"; // Import the axios library
import { Link } from "react-router-dom";

// Ipmort components
import Loading from "../components/Loading";

const Launches = () => {
  // create a state for the launches data
  const [launches, setLaunches] = useState([]); // Sets the initial state called launches = [] an empty array. useState() Hook understand that setLaunches is to be used as a function to later update the state.

  // To be more accurate, make a loading state
  const [loading, setLoading] = useState(true);

  // Add an error state
  const [error, setError] = useState(undefined);

  // Call the SpaceX launches API when the Launches component mounts
  // useEffect(callbackFunction, dependencies);
  // useEffect( () => { }, []);  // Put an empty dependency array to simulate mounting

  useEffect(() => {
    console.log("Launches component mounts");

    // To prevent flickers, you want your app to set a minimum load time
    // setTimeout( () => { }, 1500); // We force a small timeout which displays a loader for 1.5 seconds and then the new state is rendered
    window.setTimeout(() => {
      // axios.get().then();
      // Call the launches API
      axios
        .get("https://api.spacexdata.com/v4/launches/past")
        .then((response) => {
          // handle the successful response
          // console.log(response);

          // You need to make this data available to the Component's JSX
          // When we get the API response with the appropriate data
          // update the state, the component will re-render with the state data saved (temp)
          const { data } = response; // Update the state to hold the entire array of objects that we received as response.data from the axios get request.
          setLaunches(data);

          //  setLaunches([]);  // Use this to pretend you get no data

          // Because the loading portion of the application is done
          setLoading(false);
        })
        .catch((error) => {
          // Handle any errors
          console.log(error.response);

          const { status, data } = error.response;

          // Set an error message in the state
          setError(`${status} ${data}`);

          // The loading portion is done even in error
          setLoading(false);
        })
        .then(() => {
          console.log("More!");
        });
    }, 1700); // time is in milliseconds
  }, []); // Put an empty dependency array to simulate mounting

  console.log(launches);

  return (
    // If the length of the launches array === 0, then display a loading message/spinner, else display the response data in a table
    // {launches.length === 0 ? () : ()}

    // Inline If with Logical && Operator
    // If the condition is true, the element right after "&&" will appear in the output.
    // If it is false, React will ignore and skip it

    <div>
      {/* If loading condition IS true, then display <Loading />  */}
      {loading && <Loading />}

      {/* If loading is NOT true and error IS true then display the error state */}
      {!loading && error && <p className="lead text-center">{error}</p>}

      {/* If loading is NOT true, AND error is NOT true and launches length equals 0, then display "There are currently no launches." */}
      {!loading && !error && launches.length === 0 && (
        <p className="lead text-center text-success">
          There are currently no launches.
        </p>
      )}

      {/* If loading is NOT true, and error is NOT true and launches length is greater than 0, then display the data in the table */}
      {!loading && !error && launches.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Name</th>
              {/* <th>Details</th> */}
              <th>Success</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {launches.map((launch) => (
              <tr key={launch.id}>
                <td>{launch.flight_number}</td>
                <td>{launch.name}</td>
                {/* <td>{launch.details}</td> */}
                <td>{launch.success ? "Yes" : "No"}</td>
                <td>{launch.date_local}</td>
                <td>
                  {/* We're passing in the unique identifier launch.id to the URL.  This will then be stored in the variable named in our App.js file called :launchId. Through the use of a new hook called useParams we will retrieve the value of this id and then pass it into the new API get request to get the specified launch details. */}
                  <Link to={`SpaceX/launch/${launch.id}`}>Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Launches;

/*

Since Axios requests are promises, this means they have a then() function for promise chaining, and a catch() function for handling any erros

axios.get().then().catch().then();

*/
