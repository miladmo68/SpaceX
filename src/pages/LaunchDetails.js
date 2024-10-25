import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import Loading from "../components/Loading";

const LaunchDetails = () => {
  // We want to capture the launchId from the URL
  // useParams returns an object of key/value pairs of URL parameters
  // Use it to access match.params of the current <Route>
  // NOTE: our route is /launch/:launchId
  // Thus we use the "launchId" variable to access it's value (they are key:value pairs)
  const params = useParams();
  console.log(params);

  // Using destructuring assignment:
  const { launchId } = useParams();

  // Setup the states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [launch, setLaunch] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`https://api.spacexdata.com/v4/launches/${launchId}`)
        .then((response) => {
          const { data } = response; // let data = response.data
          console.log(data);
          setLaunch(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.response);
          const { status, data } = error.response; // let status = error.response.status and let data = error.response.data
          setLoading(false);
          setError(`${status} ${data}`);
        });
    }, 1500);
  }, []); // Empty dependency array for mounting effects

  return (
    <div>
      {/* If loading condition IS true, then display <Loading /> */}
      {loading && <Loading />}

      {/* If loading is NOT true, and error IS true, then display the error */}
      {!loading && error && (
        <div className="text-center">
          <p className="lead">{error}</p>
          <Link to="/" className="btn btn-primary">
            Go Back
          </Link>
        </div>
      )}

      {/* If loading is NOT true, and error is NOT true and launch state has data then display the data */}
      {!loading && !error && launch && (
        <div>
          <h3>{launch.name}</h3>
          {/* You could write this OR statement as a ternary operator */}
          {/* <p>{launch.details ? launch.details : '--'}</p> */}
          {/* If launches details exist then display the details, else display '--' */}
          <p>{launch.details || "--"}</p>
          <Link to="/SpaceX" className="btn btn-primary">
            Go Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default LaunchDetails;
