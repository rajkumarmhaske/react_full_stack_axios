import { useEffect, useState } from "react"
import { postData, putData } from "../api/postAPI";

// Form component to handle adding and updating posts
export const Form = ({ data, setData, updateDataAPI, setUpdateDataAPI }) => {
    // state to hold the data for adding or updating a post
    const [addData, SetAddData] = useState({
        title: "",
        body: "",
    })

    //checks selected data object is 0 or not
    //this logic is used for rename update button
    let isEmpty = Object.keys(updateDataAPI).length === 0;

    // get the updated data and add into the input field
    useEffect(() => {
        updateDataAPI && SetAddData({
            title: updateDataAPI.title || "",
            body: updateDataAPI.body || ""
        })
    }, [updateDataAPI]) // this will run when updateDataAPI changes


    // handle input change
    // this function will update the addData state when the input field changes
    // it will also update the input field when the updateDataAPI changes
    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        SetAddData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    };

    //add data
    const addPostData = async () => {
        const res = await postData(addData);
        console.log("res: ", res);

        if (res.status === 201) {
            setData([...data, res.data]);
            SetAddData({ title: "", body: "" })
        }
    }

    //update data
    const updatePostData = async () => {
        try {
            const res = await putData(updateDataAPI.id, addData); // send the id of the post to be updated and the new data
            if (res.status === 200) {
                // update the data in the state
                setData((prev) => {
                    return prev.map((currElem) => { // map through the data and update the post with the new data
                        return currElem.id === res.data.id ? res.data : currElem; // if the id matches, return the updated data, else return the current element
                    });
                });

                SetAddData({title:"",body:""}); // after update clear the input field
                setUpdateDataAPI({}); // clear the updateDataAPI object to rename button to Add
            }


        } catch (error) {
            console.log(error);

        }


    }
    //form submit
    const handleFormSubmit = (e) => {
        e.preventDefault(); // prevent the default form submission behavior
        const action = e.nativeEvent.submitter.value;// this will gets button value


        if (action === "Add") {
            addPostData();

        } else if (action === "Edit") {
            updatePostData();
        }
    }

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="title"></label>
                    <input onChange={handleInputChange} value={addData.title} type="text" autoComplete="off" id="title" name="title" placeholder="Add Title" />
                </div>
                <div>
                    <label htmlFor="body"></label>
                    <input onChange={handleInputChange} value={addData.body} type="text" autoComplete="off" id="body" name="body" placeholder="Add Post" />
                </div>
                <button type="submit" value={isEmpty ? "Add" : "Edit"} >{isEmpty ? "Add" : "Edit"}</button>
            </form>
        </>
    )

}