import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Modal({ formvalues, ModalOff,successadd }) {
  const [error, Seterror] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      data.latitude = formvalues.latitude;
      data.longitude = formvalues.longitude;
      const a = await fetch("http://localhost:8080/api/logs", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      ModalOff();
      successadd(true)
      
    } catch (error) {
      Seterror(error.message);
    }
  };
  return (
    <div className="modal">
      <form className="entry-form" onSubmit={handleSubmit(onSubmit)}>
        {error && <h1>{error}</h1>}
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="Place"
          {...register("title", { required: true })}
        />
        <label htmlFor="image">image</label>
        <input type="text" placeholder="image" {...register("image")} />

        <label htmlFor="description">Description</label>
        <textarea
          rows={4}
          placeholder="Description"
          {...register("description", { required: true })}
        />

        <label htmlFor="comments">Comments</label>
        <textarea
          rows={4}
          placeholder="comments"
          {...register("comments", { required: true })}
        />
        <input type="submit" />
        <button type="button" onClick={ModalOff}>
          Close
        </button>
      </form>
    </div>
  );
}

export default Modal;
