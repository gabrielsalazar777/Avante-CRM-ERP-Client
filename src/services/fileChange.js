import { post } from "./authService";

export const fileChange = (e) => {

    const uploadData = new FormData();

    uploadData.append("image", e.target.files[0]);

    return post('/users/imageUpload', uploadData)
    // change above line for proper route

    // on input, call it type file

    // new handleFileChange function
    // const handleFileChange = (e) => {

    //     setButtonDisabled(true)

    //     fileChange(e)
    //       .then((response) => {
    //         console.log(response.data);
    //         setUpdatedUser((prev) => ({...prev, [e.target.name]: response.data.image}));
    //         setButtonDisabled(false);
    //       })
    //       .catch((err) => {
    //         setButtonDisabled(false);
    //         console.log("Error while uploading the file: ", err);
    //       });

    // }


    //add a boolean useState for buttonDisabled to disable save if upload is not complete
}
