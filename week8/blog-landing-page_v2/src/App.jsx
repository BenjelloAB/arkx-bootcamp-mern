/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./index.css";
import Pagination from "./Pagination";
import Header from "./Header";
import Footer from "./Footer";
import BlogCard from "./BlogCard";
import EmailForm from "./EmailForm";
import { AddPostForm } from "./AddPostForm";
import { CreateButton } from "./CreateButton";
import "./main.css";
import { v4 as uuidv4 } from "uuid";

function App() {

  console.log(JSON.stringify(useState()))
  console.log(useState())
  // const blogs = [
  //   {
  //     id: 1,
  //     author: "brahim",
  //     title: "Exploring the Wonders of Technology",
  //     text: "5555",
  //     description: "In the vast expanse of the digital age, technology has become an integral part of our lives. It’s like an invisible thread weaving through our daily routines, connecting us in ways we never thought possible."
  //   },
  //   {
  //     id: 2,
  //     author: "othmane",
  //     title: "Exploring the Wonders of Technology",
  //     text: "5555",
  //     description: "In the vast expanse of the digital age, technology has become an integral part of our lives. It’s like an invisible thread weaving through our daily routines, connecting us in ways we never thought possible."
  //   },
  //   {
  //     id: 3,
  //     author: "khalid",
  //     title: "Exploring the Wonders of Technology",
  //     text: "5555",
  //     description: "In the vast expanse of the digital age, technology has become an integral part of our lives. It’s like an invisible thread weaving through our daily routines, connecting us in ways we never thought possible."
  //   }
  // ]
  // eslint-disable-next-line no-unused-vars
  const [blogs, setBlogs] = useState([
    {
      id: uuidv4(),
      author: "brahim",
      title: "Exploring the Wonders of Technology",
      text: "5555",
      description:
        "In the vast expanse of the digital age, technology has become an integral part of our lives. It’s like an invisible thread weaving through our daily routines, connecting us in ways we never thought possible.",
    },
  ]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [desc, setDesc] = useState("");
  const [terms, setTerms] = useState(false);
  const [isOpen, setOpen] = useState(false);
  // const [isUpdaterOpen, setIsUpdaterOpen] = useState(false);

  // function updateFormHandler() {
  //   setIsUpdaterOpen(!isUpdaterOpen);
  // }


  function updateBlog(_id, n_title, n_desc) {
    const newBlogs = blogs.map(x => x.id === _id ? { ...x, title: n_title, description: n_desc } : x)
    setBlogs(newBlogs);
  }
  function deleteBlog(_id) {
    console.log('clicked')
    console.log("_id: ", _id)
    const newBlogs = blogs.filter(x => x.id !== _id);
    setBlogs(newBlogs);
  }
  function authorNameHandler(value) {
    // console.log("value : ", value);
    setName(value);
  }

  function blogTitleHandler(value) {
    // console.log("value : ", value);
    setTitle(value);
  }
  function blogTextHandler(value) {
    // console.log("value : ", value);
    setText(value);
  }
  function blogDescHandler(value) {
    // console.log("value : ", value);
    setDesc(value);
  }
  function blogTermsHandler(value) {
    setTerms(!terms);
    // console.log("value : ", value);
  }
  function emptyStatePostForm() {
    setName("");
    setTerms("");
    setTitle("");
    setDesc("");
    setText("");
  }
  function submitHanlder(e) {
    e.preventDefault();
    console.log(e.target);
    console.log(e.target.value);
    console.log(`name : ${name} \n 
                title: ${title} \n
                text: ${text} \n
                description: ${desc}
                terms: ${terms}`);
    setBlogs([
      ...blogs,
      {
        id: uuidv4(),
        author: name,
        title: title,
        text: text,
        description: desc,
      },
    ]);
    console.log("===========")
    console.log("Blogs: ")
    console.log(blogs)
    console.log("===========")
    emptyStatePostForm();
    setOpen(false);
  }
  const openIt = () => {
    console.log("clicked");
    setOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("active");
    } else {
      document.body.classList.remove("active");
    }
  }, [isOpen]);
  return (
    <>
      <Header />
      <h1 className="text-center font-bold">
        Welcome to Byte Sized Narratives
      </h1>
      <h3 className="text-center font-bold">
        A Blog that cover all topics around the IT industry and all latest
        updates in this vast field
      </h3>

      <EmailForm />
      <CreateButton onClick={openIt} />

      {isOpen ? (
        <AddPostForm
          onClick={openIt}
          authorNameHandler={authorNameHandler}
          blogTitleHandler={blogTitleHandler}
          blogTextHandler={blogTextHandler}
          blogDescHandler={blogDescHandler}
          blogTermsHandler={blogTermsHandler}
          terms={terms}
          name={name}
          title={title}
          text={text}
          desc={desc}
          submitHanlder={submitHanlder}

        />
      ) : null}
      {isOpen ? <div className="overlay" onClick={openIt}></div> : null}

      <div className="flex gap-10 justify-center items-center p-10 flex-wrap">
        {blogs.map((item) => (
          <BlogCard
            key={item.id}
            text={text}
            _name={name}
            _id={item.id}
            title={item.title}
            desc={item.description}
            deleteBlog={deleteBlog}
            updateBlog={updateBlog}
          />
        ))}
      </div>
      <Pagination />
      <Footer />
    </>
  );
}

export default App;
