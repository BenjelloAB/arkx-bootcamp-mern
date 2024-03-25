/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
export const AddPostForm = (props) => {
  const [isHovered, setIsHovered] = useState(false);

  function mouseEnterHandler() {
    setIsHovered(true);
  }
  function mouseLeaveHandler() {
    setIsHovered(false);
  }

//   function changeInputHandler(e) {
//     console.log(e.target.value);
//   }
  return (
    <form
      className="w-6/12 mx-auto bg-gray-800 border-gray-700 p-10 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      id="form-post"
      onSubmit={(e) => props.submitHanlder(e)}
    >
      <h1 className="text-white font-extrabold pb-4 text-start relative">
        Create Post :
        <FontAwesomeIcon
          // eslint-disable-next-line react/prop-types
          onClick={props.onClick}
          icon={faXmark}
          className="absolute -top-[67%] -right-[5%] cursor-pointer text-2xl w-[30px] h-[30px] rounded-full  p-1 transition-all"
          style={{ background: isHovered ? "#aea4a42e" : "" }}
          onMouseEnter={mouseEnterHandler}
          onMouseLeave={mouseLeaveHandler}
        />
      </h1>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium  dark:text-white text-white"
        >
          Post's author name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light "
          placeholder="your name goes here....."
          required
          onChange={(e) => props.authorNameHandler(e.target.value)}
          value={props.name}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium  text-white "
        >
          Post's title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
          onChange={(e) => props.blogTitleHandler(e.target.value)}
          value={props.title}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="post-text"
          className="block mb-2 text-sm font-medium  text-white"
        >
          Post's Content
        </label>
        {/* <input type="password" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required /> */}
        <textarea
          name="text"
          id="post-text"
          cols="30"
          rows="3"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
          placeholder="Post's content  goes here...."
          onChange={(e) => props.blogTextHandler(e.target.value)}
          value={props.text}
        ></textarea>
      </div>
      <div className="mb-5">
        <label
          htmlFor="desc"
          className="block mb-2 text-sm font-medium  text-white"
        >
          Description
        </label>
        {/* <input type="password" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required /> */}
        <textarea
          name="desc"
          id="desc"
          cols="30"
          rows="3"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
          onChange={(e) => props.blogDescHandler(e.target.value)}
          value={props.desc}
        ></textarea>
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            onChange={(e) => props.blogTermsHandler(e.target.value)}
            value={props.terms}
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required
          />
        </div>
        <label
          htmlFor="terms"
          className="ms-2 text-sm font-medium text-white-500"
        >
          I agree with the{" "}
          <a
            href="#"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            terms and conditions
          </a>
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Create New Post
      </button>
    </form>
  );
};
