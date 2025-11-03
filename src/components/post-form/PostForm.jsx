import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) { // watch is like a listener that helps us listen what user is typing
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData); //userdata from store

    const submit = async (data) => {
        if (post) { // if a post already exists : then we update it

            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null; // if image exists in the passed data, add it to post. else add null 

            if (file) { //if image(file) upload successful 
                appwriteService.deleteFile(post.featuredImage);    // delete the previously stored image     
            }

            const dbPost = await appwriteService.updatePost(post.$id, { //update the post with changing image as newly provided image through data
                ...data,
                featuredImage: file ? file.$id : undefined, 
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`); // when dbpost successful, navigate user to the post itself
            }
        } else { // else if it is a new post
            const file = await appwriteService.uploadFile(data.image[0]); //upload the image 
             

            if (file) { // if upload successful
                const fileId = file.$id; //extract a unique generated id for this file
                data.featuredImage = fileId ; // set featuredImage as this extracted id
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id,  featuredImage: fileId}); // create a post associated with current user's id and imageidother data
                console.log("success");

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`); // navigate to post
                }
            }
        }
    };

    const slugTransform = useCallback((value) => { //convert input text to slug value like input-text-in-slug
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return ""; 
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => { //name is the name of field and thus the subscipiton will always tell everytime input chnages what the value and which field changed
            if (name === "title") { // if title field is changed
                setValue("slug", slugTransform(value.title), { shouldValidate: true }); // update the slug field while calling slugtransform and shouldvalidate ensures slug is validated after updation
            }
        });

        return () => subscription.unsubscribe();  // unsubscribe is inbuilt method that makes watch to stop listening when no longer required
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap"> {/*handle submit*/}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true }); {/* Whenever user types, it updates the slug field with a transformed version */}
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :" // add image to post
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif" 
                    {...register("image", { required: !post })} //required only if creating a new post, not updating.
                />
                {post && ( // if post exists, then show a image preview 
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]} // dropdown to select if post is active or inactive
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}