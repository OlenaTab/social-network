import React, { useState } from "react";
import "./Modal.css";
import Avatar from "../Avatar/Avatar";

function ChangeProfilePicModal(props) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="modal fade"
      id="changeProfilePicModal"
      tabIndex="-1"
      aria-labelledby="createModalLabel"
      aria-hidden="true"
      data-bs-backdrop="false"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header align-items-center">
            <h5 className="text-dark text-center w-100 m-0" id="exampleModalLabel">
              Upload Photo
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="my-1 p-1">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0 align-items-center">
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Uploaded profile picture"
                        className="img-fluid"
                      />
                    ) : (
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                        alt="Generic placeholder image"
                        className="img-fluid"
                      />
                    )}
                  </div>
                </div>
                <div className="d-flex justify-content-between border border-1 border-light rounded p-3 mt-3">
                  <p className="m-0">Add new profile photo</p>
                  <div>
                    <label htmlFor="uploadImage">
                      <i className="fas fa-images fs-5 text-success pointer mx-1"></i>
                    </label>
                    <input
                      type="file"
                      id="uploadImage"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary w-100">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeProfilePicModal;
