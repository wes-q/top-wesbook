import { useEffect, useRef } from "react";
import Comment from "./Comment";

const Comments = ({ post }) => {
    //TODO: check if slowdown occurs because each component attaches an event listener to the document
    // const detailsContainerRef = useRef(null);

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         // Check if the click is outside the details element
    //         if (!detailsContainerRef.current || detailsContainerRef.current.contains(event.target)) {
    //             return;
    //         }

    //         // Close the details element
    //         detailsRef.current.open = false;
    //     };

    //     // Add click event listener to a common ancestor (detailsContainerRef)
    //     document.addEventListener("click", handleClickOutside);

    //     // Clean up the event listener when the component unmounts
    //     return () => {
    //         document.removeEventListener("click", handleClickOutside);
    //     };
    // }, []);

    // const handleDeleteComment = (commentId) => {
    //     alert(commentId);
    // };

    return (
        <div>
            {post.comments.map((comment, index) => (
                <Comment comment={comment} key={index} />
            ))}
        </div>
    );
};

export default Comments;
