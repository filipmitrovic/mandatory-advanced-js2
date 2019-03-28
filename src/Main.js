import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom"
import axios from "axios";
import './App.css';

class Main extends Component {
  constructor (props) {
    super(props);
    this.state = {
      movies: [],
      search: '',
    } 
    this.deleteMovie = this.deleteMovie.bind(this);
    this.searchMovie = this.searchMovie.bind(this);
  }
  componentDidMount() { 
    this.source = axios.CancelToken.source();
    axios.get('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies', {cancelToken: this.source.token})
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
    })
    .then((response) => {
      this.setState({movies: response});
    }); 
  }
  componentWillUnmount() {
    this.source.cancel();
  }
  deleteMovie(id) {
    axios.delete("http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/" + id, { cancelToken: this.source.token })
      .then((res) => {
        const index = this.state.movies.findIndex(x => x.id === id);
        if (index < 0) {
          return;
        }
        this.setState({
          movies: [...this.state.movies.slice(0, index), ...this.state.movies.slice(index + 1)],
        });
      })
      .catch(error => {
        console.error(error)
      })
  }
  searchMovie(e) {
    this.setState({search: e.target.value})    
  }
  render () { 
    let searched = this.state.movies.filter(movie => {
      return movie.title.toLowerCase().includes(this.state.search.toLowerCase()) || 
      movie.director.toLowerCase().includes(this.state.search.toLowerCase())
    })
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>main</title>
        </Helmet>
        <label>Search Movie
          <input type="text" value={this.state.search} onChange={this.searchMovie}/>
        </label>
        <table className="border">
          <thead>
            <tr className="border">
              <th className="border">Title</th>
              <th className="border">Director</th>
              <th className="border">Rating</th>
              <th className="border">Edit</th>
              <th className="border">Delete</th>
            </tr>
          </thead>
          <tbody>
          {searched.map(x => {
          return (
            <tr key={x.id} className="border">
              <td className="border"><Link to={"/Details/" + x.id} >{x.title}</Link></td>
              <td className="border">{x.director}</td>
              <td className="border">{x.rating}</td>
              <td><button className="border" type="button"><Link to={'/Edit/' + x.id}>Edit</Link></button></td>
              <td><button className="border" type="button" onClick={() => this.deleteMovie(x.id)}>Delete</button></td>
            </tr>  
          )
          })}
          </tbody>  
        </table>
      </>
    );
  }
};

export default Main;


