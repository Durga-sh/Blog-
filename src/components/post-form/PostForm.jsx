import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    console.log("Form data:", data);
    try {
      if (post) {
        const file = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file) {
          await appwriteService.deleteFile(post.featuredImage);
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          const dbPost = await appwriteService.createPost({
            ...data,
            userId: userData.$id,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="w-full bg-gray-900 min-h-[calc(100vh-200px)]">
      <div className="w-full py-6 px-4 bg-gray-800 border-b border-gray-700">
        <div className="w-full max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-100">
            {post ? "Edit Post" : "Create New Post"}
          </h1>
        </div>
      </div>
      
      <form 
        onSubmit={handleSubmit(submit)} 
        className="w-full max-w-7xl mx-auto px-4 py-6"
      >
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-2/3 px-4 mb-6 lg:mb-0">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg h-full">
              <Input
                label="Title:"
                placeholder="Enter post title"
                className="mb-6 bg-gray-900 border-gray-700 text-gray-100 focus:border-blue-500 rounded-lg"
                {...register("title", { required: true })}
              />
              <Input
                label="Slug:"
                placeholder="post-url-slug"
                className="mb-6 bg-gray-900 border-gray-700 text-gray-100 focus:border-blue-500 rounded-lg"
                {...register("slug", { required: true })}
                onInput={(e) => {
                  setValue("slug", slugTransform(e.currentTarget.value), {
                    shouldValidate: true,
                  });
                }}
              />
              <div className="mb-6">
                <RTE
                  label="Content:"
                  name="content"
                  control={control}
                  defaultValue={getValues("content")}
                />
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/3 px-4">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <Input
                label="Featured Image:"
                type="file"
                className="mb-6 bg-gray-900 border-gray-700 text-gray-100 focus:border-blue-500 rounded-lg file:bg-blue-600 file:text-white file:border-0 file:px-4 file:py-2 file:mr-4 file:rounded-md"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
              />
              
              {post && (
                <div className="w-full mb-6 overflow-hidden rounded-lg border-2 border-gray-700">
                  <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="w-full h-auto rounded-lg transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}
              
              <Select
                options={["active", "inactive"]}
                label="Status:"
                className="mb-6 bg-gray-900 border-gray-700 text-gray-100 focus:border-blue-500 rounded-lg"
                {...register("status", { required: true })}
              />
              
              <Button
                type="submit"
                bgColor={post ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
                className="w-full py-4 rounded-lg font-bold transition-all duration-300 shadow-lg text-lg"
              >
                {post ? "Update Post" : "Publish Post"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}