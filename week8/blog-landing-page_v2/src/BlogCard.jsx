/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPenToSquare,
    faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
export default function BlogCard({
    title,
    desc,
    _id,
    _name,
    text,
    deleteBlog,
    updateBlog,
}) {




    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedDesc, setEditedDesc] = useState(desc);
    const [isEditing, setIsEditing] = useState(false);

    function editingHandler() {
        console.log("editing...");
        setIsEditing(!isEditing);
    }

    function handleEditing() {
        updateBlog(_id, editedTitle, editedDesc);
        editingHandler();
    }
    const mouseEnterHnadler1 = (e) => {
        setIsHovered1(true);
    };
    const mouseLeaveHnadler1 = (e) => {
        setIsHovered1(false);
    };
    const mouseEnterHnadler2 = (e) => {
        setIsHovered2(true);
    };
    const mouseLeaveHnadler2 = (e) => {
        setIsHovered2(false);
    };

    var local_title = "";
    var local_desc = "";
    return (
        <div className="max-w-sm p-6 overflow-x-hidden rounded-lg shadow bg-gray-800 border-gray-700 min-w-[30%] min-h-[280px] flex flex-col justify-between items-baseline gap-[14px] min-w-[370px] min-h-[317px]">
            {isEditing ? (
                <textarea
                    className="w-[100%] "
                    name="title"
                    id="title"
                    value={editedTitle}
                    cols="30"
                    rows="2"
                    onChange={(e) => {
                        setEditedTitle(e.target.value);
                        console.log("local_desc :", editedTitle);
                    }}
                    style={{ color: "black", maxHeight: "100px", borderRadius: "0.5rem", resize: "none" }}
                ></textarea>
                //   <input
                //       type="text"
                //       id="text"
                //       name="title"
                //       aria-describedby="helper-text-explanation"
                //       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                //       value={editedTitle}
                //       onChange={(e) => {
                //           setEditedTitle(e.target.value);
                //           console.log("local_title : ", editedTitle);
                //       }}
                //   ></input>
            ) : (
                <a href="#" className="block w-[100%] overflow-x-hidden text-wrap">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight  text-white">
                        {title}
                    </h5>
                </a>
            )}

            {isEditing ? (
                <textarea
                    className="w-[100%]"
                    name="desc"
                    id="desc"
                    value={editedDesc}
                    cols="30"
                    rows="7"
                    onChange={(e) => {
                        setEditedDesc(e.target.value);
                        console.log("local_desc :", editedDesc);
                    }}
                    style={{ color: "black", maxHeight: "190px", borderRadius: "0.5rem", resize: "none" }}
                ></textarea>
            ) : (
                // <input
                //     name="desc"
                //     type="text"
                //     id="text"
                //     aria-describedby="helper-text-explanation"
                //     className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                //     value={editedDesc}
                //     onChange={e => { setEditedDesc(e.target.value); console.log("local_desc :", editedDesc) }}
                // ></input>
                <p className="mb-3 font-normal  text-gray-400">{desc}</p>
            )}
            <div className="flex items-baseline justify-between w-[100%]">
                {isEditing ? (
                    <>
                        <a
                            href="#"
                            className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[30%] flex items-center justify-between"
                            onClick={handleEditing}
                        >
                            Save
                            <FontAwesomeIcon icon={faFloppyDisk} />
            </a>
                    </>
                ) : (
                    <>
                        <a
                            href="#"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Read more
                                <svg
                                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
            </a>
                        <div className="flex  items-center justify-center w-[20%] gap-4">
                            <a href="#">
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="cursor-pointer text-xl transition-transform"
                                    style={{ transform: isHovered1 ? "scale(1.3)" : "scale(1)" }}
                                    onMouseEnter={mouseEnterHnadler1}
                                    onMouseLeave={mouseLeaveHnadler1}
                                    onClick={(e) => deleteBlog(_id)}
                                />
                            </a>
                            <a href="#">
                                <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    className="cursor-pointer text-xl transition-transform"
                                    style={{ transform: isHovered2 ? "scale(1.3)" : "scale(1)" }}
                                    onMouseEnter={mouseEnterHnadler2}
                                    onMouseLeave={mouseLeaveHnadler2}
                                    onClick={editingHandler}
                                />
                            </a>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
