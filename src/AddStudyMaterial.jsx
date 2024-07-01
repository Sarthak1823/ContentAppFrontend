import React, { useState } from 'react'
import axios from "axios"
import {Link } from 'react-router-dom' 
import "./css.css";

function AddStudyMaterial() {
   const [name,setName]=useState("");
   const [subject,setSubject]=useState("");
   const [description,setDescription]=useState("");
   const [link,setLink]=useState("");
   const [pdf,setPdf]=useState("");
   const [pdfUrl,setPdfUrl]=useState("");

   const uploadPdf = async () => {
     
    try {
       if (!pdf){
          alert("Upload the pdf first!!");
           return ;
       }
      const data = new FormData();
      data.append('file', pdf);
      data.append('upload_preset', 'imageupload');
      data.append('cloudname', 'drfcnxubf');
      const res = await axios.post('https://api.cloudinary.com/v1_1/drfcnxubf/auto/upload', data);
      console.log('File uploaded successfully:', res.data);
       const url = res.data.url;

        setPdfUrl(url);
        alert("pdf added successfully!!")

    } catch (error) {
      console.error('Error uploading PDF to Cloudinary:', error.response);
    }
    
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!pdfUrl && !link) {
          alert("Please either upload link or pdf");
          return;
        }
    
        try {
          const res = await axios.post("https://contentappbackend.onrender.com/api/addStudy", {
            name,
            subject,
            description,
            link,
            pdfUrl
          });
    
          alert("Study Material added successfully!!");
    
          setName("");
          setSubject("");
          setDescription("");
          setLink("");
          setPdf("");
          setPdfUrl("");
        } catch (err) {
          console.error("Error while uploading study material", err);
        }
      };
  return (
  <>
  <nav>
        <Link to="/">Home </Link>
        <Link to="/add">Add Meme </Link>
        <Link to="/view">View Meme</Link>
        <Link to ="/addstudy">Add study Material </Link>
        <Link to ="/viewstudy">View study Material </Link>
      </nav>
      <form onSubmit={(e)=>handleSubmit(e)}>
      <div>
          <label htmlFor="name">Name</label><br />
          <input
            type="text"
            id="name"
            name="name"
            required
             value={name}
             onChange={(e)=>setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="subject">Subject</label><br />
          <select
            id="subject"
            name="subject"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="" disabled>Select your subject</option>
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
        </div>
        <div>
        <label htmlFor="category">Category</label><br />
        <select
          id="category"
          name="category"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
         
        >
          <option value="">Select a category</option>
          <option value="PYQs">PYQs</option>
          <option value="Class Test">Class Test</option>
          <option value="Assignments">Assignments</option>
          <option value="Important Qs">Important Qs</option>
          <option value="Notes">Notes</option>
          <option value="Playlist">Playlist</option>
          <option value="Study Material">Study Material</option>
        </select>
      </div>
        <div>
          <label htmlFor="link">Link </label><br />
          <input
            type="url"
            id="link"
            name="link"
            value={link}
            onChange={(e)=>setLink(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="pdf">PDF </label><br />
          <input
            type="file"
            id="pdf"
            name="pdf"
            accept="application/pdf"
            value={pdf}
            onChange={(e)=>setPdf(e.target.files[0])}
          />
            <button type="button" className="small-button" onClick={uploadPdf}>
            Upload PDF
          </button>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>  
     </form>

  </>
  )
}

export default AddStudyMaterial
