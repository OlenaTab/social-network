import React from "react";
import "./Modal.css";
import Avatar from "../../components/Avatar/Avatar";

function CreatePostModal(props) {
    return(
        <div className="modal fade" id="createPostModal" tabIndex="-1" aria-labelledby="createModalLabel" aria-hidden="true" data-bs-backdrop="false">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header align-items-center">
              <h5 className="text-dark text-center w-100 m-0" id="exampleModalLabel">Create Post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="my-1 p-1">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center">
                    <div className="p-2">
                      <Avatar /> 
                    </div>
                    <div>
                      <p className="m-0 fw-bold">{props.username}</p>
                      <select className="form-select border-0 bg-gray w-75 fs-7" aria-label="Default select example">
                        <option defaultValue="1">Public</option>
                        <option value="2">Private</option>
                        <option value="3">Custom</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <textarea cols="30" rows="5" className="form-control border-0"></textarea>
                  </div>
                  <div
                    className="d-flex justify-content-between border border-1 border-light rounded p-3 mt-3">
                    <p className="m-0">Add to your post</p>
                    <div>
                      <i className="fas fa-images fs-5 text-success pointer mx-1"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary w-100">Post</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CreatePostModal;