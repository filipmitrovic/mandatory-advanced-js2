import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Redirect } from 'react-router-dom';
import axios from 'axios'

function changeMovieProperty(key, value) {
  return (prevState) => {
    console.log('prevState', prevState.movieData);
    return {
      movieData: {
        ...prevState.movieData,
        [key]: value,
      },
  }};
}

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: {
        title: "",
        description: "",
        director: "",
        rating: 0,
      },
      sent: false,
      errMsg: '',
      err: false,
    }
    this.onChangeMovie = this.onChangeMovie.bind(this);
    this.onChangeDirector = this.onChangeDirector.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.updateMovie = this.updateMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(id);
    
    this.source = axios.CancelToken.source();
    axios.get("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" + id, { cancelToken: this.source.token })
      .then(movie => {
        this.setState({movieData: movie.data})
      })
      .catch(err => {
        console.error(err)
        this.setState({ err: true})
      });
  } 
  componentWillUnmount() {
    this.source.cancel();
  }
  onChangeMovie(e) {
    console.log('onChangeMovie');
    this.setState(changeMovieProperty("title", e.target.value));
  }
  onChangeDirector(e) {
    this.setState(changeMovieProperty("director", e.target.value));
  }
  onChangeDescription(e) {
    this.setState(changeMovieProperty("description", e.target.value));
  }
  onChangeRating(e) {
    this.setState(changeMovieProperty("rating", e.target.value));
  }
  updateMovie() {
    let id = this.props.match.params.id;
    console.log(id);
    
    axios.put("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" + id, this.state.movieData, { cancelToken: this.source.token })
      .then((res) => {
        this.source.cancel();
        this.setState({sent: true});
      })
      .catch((error) => {
        this.setState({errMsg: 'invalid'});
        console.log(error);
        this.setState({err: true});
      })
  }
  deleteMovie() {
    let id = this.props.match.params.id;
    axios.delete("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" + id, { cancelToken: this.source.token })
      .then(() => {
        this.setState({sent: true});
      })
      .catch(error => {
        console.error(error)
      })
  }
  render() {
    if (this.state.sent) {
      return <Redirect to="/" />;
    }
    return (
      <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>edit</title>
      </Helmet>
      <h2>Edit Movie</h2>
      <label> Title
        <input type="text" minLength="1" maxLength="40" value={this.state.movieData.title} onChange={this.onChangeMovie} required/>
      </label> <br/>
      <label> Director
        <input type="text" minLength="1" maxLength="40" value={this.state.movieData.director} onChange={this.onChangeDirector} required/>
      </label> <br/>
      <label> Description
        <input type="text" minLength="1" maxLength="299" value={this.state.movieData.description} onChange={this.onChangeDescription} required/>
      </label> <br/>
      <label> Rating
        <input type="range" min="0" max="5" step="0.1" value={this.state.movieData.rating} onChange={this.onChangeRating} required/>
        <span>{this.state.movieData.rating}</span>
      </label> <br/>
      <button type="button" onClick={this.updateMovie}>Update Movie</button>
      <button type="button" onClick={this.deleteMovie}>Delete Movie</button>
    </>
    )
  }
};

export default Edit;