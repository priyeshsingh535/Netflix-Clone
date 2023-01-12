import React, { useEffect, useState } from 'react'
import "./Home.scss";
import axios from "axios";
import {BiPlay,BiPlus} from "react-icons/bi"


const apikey="912b8f058317ecc7b728ebebcc6f8354";
const url="https://api.themoviedb.org/3"
const imgUrl ="https://image.tmdb.org/t/p/original"
const upcoming ="upcoming"
const topRated ="top_rated"
const popular ="popular"
const nowPlaying ="now_playing"

const Card =({img})=>(
    <img className='card' src={img} alt="cover"/>
)

const Row=({title,
  arr=[],})=>(
    <div className='row'>
        <h2>{title}</h2>
        <div>
          {
            arr.map((item,index)=>(
                <Card key={index} img={`${imgUrl}/${item.poster_path}`}/>
            ))
          }
        </div>
    </div>
)

const Home = () => {
const [upcomingMovies,setupcomingMovies] = useState([])
const [topRatedMovies,settopRatedMovies] = useState([])
const [popularMovies,setpopularMovies] = useState([])
const [nowPlayingMovies,setnowPlayingMovies] = useState([])


useEffect(()=>{
  const fetchUpcoming= async()=>{
    const {data:{results}} = await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}&page=1`);//destructuring
    console.log(results);
    setupcomingMovies(results)
  };
  const fetchtopRated= async()=>{
    const {data:{results}} = await axios.get(`${url}/movie/${topRated}?api_key=${apikey}`);//destructuring
    console.log(results);
    settopRatedMovies(results)
  };
  const fetchpopular= async()=>{
    const {data:{results}} = await axios.get(`${url}/movie/${popular}?api_key=${apikey}`);//destructuring
    console.log(results);
    setpopularMovies(results)
  };
  const fetchnowPlaying= async()=>{
    const {data:{results}} = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apikey}`);//destructuring
    console.log(results);
    setnowPlayingMovies(results)
  };
  fetchUpcoming()
  fetchtopRated()
  fetchpopular()
  fetchnowPlaying()
},[])

  return (
   <section className='Home'>
    <div className="banner" style={{backgroundImage:popularMovies[0]?`url(${imgUrl}/${popularMovies[0].poster_path})`:"rgb(16,16,16)"}}> 
    
      {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
      {popularMovies[0] && <p>{popularMovies[0].overview}</p>}
    <div>
      <button><BiPlay/> Play </button>
      <button>My List<BiPlus/></button>
    </div>
    
    </div>
    <Row title={"Upcoming Movies"} arr={upcomingMovies}/>
    <Row title={"TopRated Movies"} arr={topRatedMovies}/>
    <Row title={"Popular Movies"} arr={popularMovies}/>
    <Row title={"NowPlaying Movies"} arr={nowPlayingMovies}/>
    
   </section>
  )
}

export default Home
