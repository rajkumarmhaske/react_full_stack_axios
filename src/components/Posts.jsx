import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/postAPI";
import "../App.css"
import { Form } from "./Form";

export const Posts = () => {

    const [data, setData] = useState([]); // state to hold the post data
    const [updateDataAPI, setUpdateDataAPI] = useState([]);// state to hold the data for updating a post

    // function to get post data
    const getPostData = async () => {
        const res = await getPost();
        console.log(res.data);
        setData(res.data);
    }

    //
    useEffect(() => {
        getPostData();
    }, []);

    //function to delete post
    const handleDeletePost = async (id) => {
        try {
            const res = await deletePost(id);
            if (res.status === 200) {
                const newDataPost = data.filter((curPost) => {
                    return curPost.id != id;
                });
                setData(newDataPost);
            }
            else {
                console.log("Failed to delete the post :", res.status);
            }
        } catch (error) {
            console.log(error);
        }
    }
    // function to update post
    const handleUpdatePost = (currElem) =>  setUpdateDataAPI(currElem);

    return (
        <>
            <section className="section-form">
                <Form data={data} setData={setData} 
                updateDataAPI={updateDataAPI} 
                setUpdateDataAPI={setUpdateDataAPI}/>
            </section>

            <section className="section-post">
                <ol>
                    {
                        data.map((currElem) => {
                            const { id, body, title } = currElem;// destructuring the data
                            return <li key={id}>
                                <p>Title : {title}</p>
                                <p>Body :{body}</p>
                                <button onClick={() => handleUpdatePost(currElem)} className="btn-edit">Edit</button>
                                <button onClick={() => handleDeletePost(id)} className="btn-delete">Delete</button>
                            </li>
                        })

                    }
                </ol>
            </section>
        </>
    )

}