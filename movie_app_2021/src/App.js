import { Component } from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends Component {
  state = {
    isLoading: true,
    movies: [],
  };

  async getMovies() {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get("https://yts-proxy.now.sh/list_movies.json");
    this.setState({ movies, isLoading: false });
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { movies } = this.state;
    return (
      <section className="container">
        {this.state.isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie, index) => {
              return (
                <Movie
                  key={index}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  medium_cover_image={movie.medium_cover_image}
                  genres={movie.genres}
                />
              );
            })}
          </div>
        )}
      </section>
    );
  }
}

export default App;
