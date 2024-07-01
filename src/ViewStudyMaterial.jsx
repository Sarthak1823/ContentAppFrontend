import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css.css";

function ViewStudyMaterial() {
  const [studyMaterial, setStudyMaterial] = useState([]);
  const [filterSubject,setFilterSubject]=useState("All Subjects");
  const [filterCategory,setFilterCategory]=useState("All Categories");

  useEffect(() => {
    const fetchStudyMaterials = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/study");
        setStudyMaterial(res.data);
      } catch (err) {
        console.error("Error fetching study materials:", err);
      }
    };

    fetchStudyMaterials();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.post("http://localhost:4000/api/deletestudy", {
        id,
      });
      alert("Study material deleted successfully!");
      //  console.log(res.data.studyMaterial)
      setStudyMaterial(res.data.studyMaterial);
    } catch (err) {
      console.error("Error deleting study material:", err);
    }
  };

const   handleFilter= async (e)=>{ 
    
       try{
       
         const res= await axios.post("http://localhost:4000/api/filter",{filterSubject,filterCategory});
            
            setStudyMaterial(res.data.studyMaterial);
         }
        catch(err){
           console.log("error while fetching filtered details",err);
        }
}
  return (
    <>
      <nav>
        <Link to="/">Home </Link>
        <Link to="/add">Add Meme </Link>
        <Link to="/view">View Meme</Link>
        <Link to="/addstudy">Add study Material </Link>
        <Link to="/viewstudy">View study Material </Link>
      </nav>

      <div className="filter-form">
  <label htmlFor="subjectFilter">Subject:</label>
  <select
    id="subjectFilter"
    onChange={(e) => setFilterSubject(e.target.value)}
  >
    <option value="All Subjects">All Subjects</option>
    <option value="DSA">DSA</option>
    <option value="Development">Development</option>
    <option value="Software Engineering">Software Engineering</option>
    <option value="Compiler Design">Compiler Design</option>
    <option value="Computer Networks">Computer Networks</option>
    <option value="OOPS">OOPS</option>
    <option value="Operating System">Operating System</option>
    <option value="DBMS">DBMS</option>
    <option value="OOSE">OOSE</option>
  </select>

  <label htmlFor="categoryFilter">Category:</label>
  <select id="categoryFilter" 
  onChange={(e) => setFilterCategory(e.target.value)}>
    <option value="All Categories">All Categories</option>
    <option value="PYQs">PYQs</option>
    <option value="Class Test">Class Test</option>
    <option value="Assignments">Assignments</option>
    <option value="Important Qs">Important Qs</option>
    <option value="Notes">Notes</option>
    <option value="Playlist">Playlist</option>
    <option value="Study Material">Study Material</option>
  </select>
  <button className="button-container"
  onClick={() => handleFilter()}>Apply</button>
</div>

      <div>
        {studyMaterial.length > 0 ? (
          <ul className="study-material-grid">
            {studyMaterial.map((material) => (
              <div key={material._id} className="study-material-card">
                <h3>{material.name}</h3>
                <p>Subject: {material.subject}</p>
                <p>Category: {material.description}</p>
                {material.link ? (
                  <>
                    <a
                      href={material.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </a>
                    <br />
                  </>
                ) : (
                  ""
                )}

                {material.pdf ? (
                  <>
                    <a
                      href={material.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      PDF
                    </a>
                    <br />
                  </>
                ) : (
                  ""
                )}

                <button
                  className="delete-button"
                  onClick={() => handleDelete(material._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </ul>
        ) : (
          <p className="no-study-materials">No study materials available.</p>
        )}
      </div>
    </>
  );
}

export default ViewStudyMaterial;
