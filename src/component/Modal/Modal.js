import "./Modal.scss";
import React, { useState, useContext } from "react";
import { FcAddImage } from "react-icons/fc";
import Image from "../Image/Image";
import { v4 as uuidv4 } from "uuid";
import { firestore } from "../../firebase";
import Pulse from "react-reveal/Pulse";

import { SharedStateContext } from "../SharedState/SharedState";

const Modal = () => {
  const [sharedState, setSharedState] = useContext(SharedStateContext);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleClose = (ev) => {
    setSharedState((prevState) => ({
      ...prevState,
      closedModal: true,
    }));
  };

  const handleImageSelect = (ev) => {
    let selected = Array.from(ev.target.files, (elem) => {
      return {
        id: uuidv4(),
        previewUrl: URL.createObjectURL(elem),
        img: elem,
      };
    });
    // selected = selected.slice(0, 3);
    setSelectedImages((prevState) => prevState.concat(selected));
  };

  const handleImageRemove = (id) => {
    const filteredImages = selectedImages.filter((el) => {
      return el.id !== id;
    });
    setSelectedImages(filteredImages);
  };

  const writeUserData = (ev, selectedImages) => {
    ev.preventDefault();
    firestore
      .collection("author")
      .add({
        name: "tests",
        description: "test",
      })
      .then(() => {
        console.log("added to db");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      className={`modal__background ${sharedState.closedModal ? "close" : ""}`}
    >
      <Pulse distance={"50px"}>
        <div className="modal">
          <div className="modal__close" onClick={handleClose}>
            <span className="modal__close__icon">+</span>
          </div>
          <div className="modal__title">Let's help each-other!</div>
          <div className="modal__imageContainer">
            {selectedImages.length > 2 ? (
              ""
            ) : (
              <>
                <label
                  for="file__upload"
                  class="modal__imageContainer__fileUpload"
                >
                  <FcAddImage className="icon__add" />
                  <span>Please insert up to three images</span>
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  id="file__upload"
                  onChange={handleImageSelect}
                />
              </>
            )}
            <div className="modal__image">
              {selectedImages.length > 0 ? (
                selectedImages.slice(0, 3).map((el) => {
                  return (
                    <Image
                      src={el.previewUrl}
                      handleImageRemove={() => handleImageRemove(el.id)}
                      img={el.img}
                    />
                  );
                })
              ) : (
                <h1 className="modal__image__description">
                  Take some descriptive images
                </h1>
              )}
            </div>
          </div>
          <div className="modal__post">
            <textarea
              className="modal__post__textarea"
              placeholder="Write something descriptive..."
              maxLength="140"
              required
            />
          </div>
          <div className="modal__button">
            <input
              className="button modal__button__post"
              type="submit"
              value="Post"
              onClick={writeUserData}
            />
            <input
              className="button modal__button__cancel"
              type="submit"
              value="Cancel"
              onClick={handleClose}
            />
          </div>
        </div>
      </Pulse>
    </div>
  );
};

export default Modal;
