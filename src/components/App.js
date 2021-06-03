import logo from '../logo.svg';
import '../App.css';
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import {userState, useReducer, useEffect} from "react";


const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";


const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type){
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };

    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };

    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };  
    default:
      return state;   
  }
}


function App() {
  // const [loading, setLoading] = userState(true);
  // const [movies, setMovies] = userState([]);
  // const [errorMessage, setErrorMessage] = userState(null);

  const [state, dispatch] = useReducer(reducer, initialState);

    useEffect( () => {
      fetch(MOVIE_API_URL)
        .then(response => response.json())
        .then(jsonResponse => {

          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.Search
          });
          // setMovies(jsonResponse.Search)
          // setLoading(false);
        });

    }, [] );


    const search = searchValue => {
      // setLoading(true);
      // setErrorMessage(null);

      dispatch({
        type: "SEARCH_MOVIES_REQUEST"
      });

      fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
        .then(response => response.json())
        .then(jsonResponse => {
          if (jsonResponse.Response === "True"){
            dispatch({
              type: "SEARCH_MOVIES_SUCCESS",
              payload: jsonResponse.Search
            });

            // setMovies(jsonResponse.Search);
            // setLoading(false);
          }
          else{
            dispatch({
              type: "SEARCH_MOVIES_FAILURE",
              error: jsonResponse.Error
            });

            // setErrorMessage(jsonResponse.Error);
            // setLoading(false);
          }

        });

    };

  const {movies, errorMessage, loading} = state;


  return (

    <div className="App">
      <header className="App-header">
        <Header text = "Hooked" />
        <Search search = {search} />

        <p className="App-intro">
          Top favourite movies
        </p>

        <div className="movies">
          {loading && !errorMessage ? 
            (
              <span>loading ....</span>
            ): errorMessage ? (
              <div className="errorMessage" >{errorMessage}</div>
            ):
            (
              movies.map((movie, index) => (
                <Movie key={'${index}-${movie.Title}'} movie={movie} />
              ))
            )

          }
        </div>

      </header>
    </div>









    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/components/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
