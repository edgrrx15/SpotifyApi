import { useState } from "react"
import './index.css'

function App() {
  
  const [cancion, setCancion] = useState('')
  const [canciones, setCanciones] = useState([])

  function handleSearch(e){
    e.preventDefault()
    if(cancion.trim() === ''){
      alert("Debes ingresar algo")
      return
    }
    setCancion('')
    getSong(cancion)
  }

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b90936b0bfmshb667f8c8cc15167p16a15bjsnb909c0e922f1',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
    }
  }
  
  async function getSong(cancion){
    try {
      let url = `https://spotify23.p.rapidapi.com/search/?q=${cancion}&type=multi&offset=0&limit=20&numberOfTopResults=5`
      let data = await fetch(url, options)
      let response = await data.json()
      console.log(response.tracks.items)
      setCanciones(response.tracks.items)
    } 
    
    catch (error) {
      console.log(`Ha ocurrido un error, ${error}`)
    }

  }

  return (
    <>

    <div className="blur"></div> 
      <h1 className="title">Spotify Search</h1>
      
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Buscar una cancion..." value={cancion} onChange={ e => setCancion(e.target.value)}/>
        <button type="submit">Buscar</button>
      </form>

    <section className="songs">
    <div className="grid">
      {canciones.map((cancion, index) =>{
        return( 
          <div className="card" key={index}>
            <a href={cancion.data.uri}>
              <img src={cancion.data.albumOfTrack.coverArt.sources[0].url} alt={cancion.data.albumOfTrack.coverArt.name} />
              <h1 className="songName"> {cancion.data.name} </h1>
            </a>
            <h2 className="artistName">{cancion.data.artists.items[0].profile.name}</h2>
          </div> 
        )
      })}
     </div>
     </section>
    </>
  )
}

export default App
