import React, { Component } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Link } from "react-router-dom";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: {
        title: "",
        description: "",
        director: "",
        rating: 0,
      },
    };
  }
  componentDidMount() {
    let id = this.props.match.params.id;
    console.log(id);
    this.source = axios.CancelToken.source();
    axios.get("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" + id, { cancelToken: this.source.token })
      .then(movie => {
        console.log('movie title', movie.data.title);
        
        this.setState({
          movieData: {
            title: movie.data.title,
            description: movie.data.description,
            director: movie.data.director,
            rating: movie.data.rating,
          }
        });
      })
      .catch(err => {
        console.error(err);
        this.source.cancel();
      });
  }
  componentWillUnmount() {
    this.source.cancel();
  }
  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Details</title>
        </Helmet>
        <h1>Details</h1>
        <p><Link to={"/Edit/"+this.props.match.params.id}>Edit Movie</Link></p>
        <p>Title: {this.state.movieData.title}</p>
        <p>Director: {this.state.movieData.description}</p>
        <p>Description: {this.state.movieData.description}</p>
      </>
    );
  }
}
export default Details; 