import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import './App.css';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: "",
      director: "",
      description: "",
      rating: 0,
      errMsg: "",
      sent: false,
    }
    this.onChangeMovie = this.onChangeMovie.bind(this);
    this.onChangeDirector = this.onChangeDirector.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.addMovie = this.addMovie.bind(this);
  }
  onChangeMovie(e) {
    this.setState({movie: e.target.value});
  }
  onChangeDirector(e) {
    this.setState({director: e.target.value});
  }
  onChangeDescription(e) {
    this.setState({description: e.target.value});
  }
  onChangeRating(e) {
    this.setState({rating: e.target.value});
  }
  addMovie (e) {
    e.preventDefault();
    this.source = axios.CancelToken.source();
    const data = {
      title: this.state.movie,
      director: this.state.director,
      description: this.state.description,
      rating: this.state.rating,
    }
    axios.post("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies", data, { cancelToken: this.source.token })
    .then((res) => {
      console.log(res)
      this.source.cancel();
      this.setState({ sent: true });
    })
    .catch(err => {
      this.setState({
        errMsg: <p>Invalid</p>
      })
      console.log(err);
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
        <title>add</title>
      </Helmet>
      <h2>Add Movie</h2>
      <label> Title
        <input type="text" minLength="1" maxLength="40" value={this.state.movie} onChange={this.onChangeMovie} required/>
      </label> <br/>
      <label> Director
        <input type="text" minLength="1" maxLength="40" value={this.state.director} onChange={this.onChangeDirector} required/>
      </label> <br/>
      <label> Description
        <input type="text" minLength="1" maxLength="40" value={this.state.description} onChange={this.onChangeDescription} required/>
      </label> <br/>
      <label> Rating
        <input type="range" min="0" max="5" step="0.1" value={this.state.rating} onChange={this.onChangeRating} required/>
        <span>{this.state.rating}</span>
      </label> <br/>
      <button type="button" onClick={this.addMovie}>Add movie</button>
      {this.state.errMsg}
    </>
    )
  }
};

export default Add;