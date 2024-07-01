import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./css.css";

function ViewMeme() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const fetchMemes = async () => {
      try {
        const response = await axios.post('https://contentappbackend.onrender.com/api/memes');
        setMemes(response.data);
      } catch (err) {
        console.error('Error fetching memes', err);
      }
    };

    fetchMemes();
  }, []);

  const handleDeleteMeme = async (id) => {
    
   try {
     const res = await axios.post('https://contentappbackend.onrender.com/api/deletememes',{id});
     alert('Meme deleted successfully!');
     setMemes(res.data.memes);
   } catch (err) {
     console.error('Error deleting meme', err);
   }
 };

  return (
    <div>
      <nav>
      <Link to="/">Home </Link>
        <Link to="/add">Add Meme </Link>
        <Link to="/view">View Meme</Link>
        <Link to ="/addstudy">Add study Material </Link>
        <Link to ="/viewstudy">View study Material </Link>
      </nav>
      <div className="memes-grid">
        {memes.length > 0 ? (
          memes.map((meme) => (
            <div key={meme._id} className="meme-card">
              <h2>{meme.name}</h2>
              {meme.description?<p>Description: {meme.description}</p>:""}
              <a href={meme.link} target="_blank" rel="noopener noreferrer">
                Link
              </a>
              <br/>
              <button className='delete-button'
               onClick={()=>handleDeleteMeme(meme._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p className="no-memes">No memes available.</p>
        )}
      </div>
    </div>
  );
}

export default ViewMeme;
