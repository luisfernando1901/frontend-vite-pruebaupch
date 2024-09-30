type DeleteModalProps = {
  show: boolean;
  handleClose: () => void;
};

const DeleteModal = ({ show, handleClose }: DeleteModalProps) => {
  return (
    <>
      {show && (
        <div
          className="position-fixed"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 20,
          }}
        >
          <div
            style={{
              height: "min-content",
              width: "498px",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="d-flex flex-row justify-content-between">
                  <h5 className="modal-title" id="deleteModalLabel">
                    Eliminar Usuario
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => handleClose()}
                  ></button>
                </div>
                <div className="d-flex flex-column pt-3">
                  <p>¿Estás seguro de que deseas eliminar este usuario?</p>
                  <div className="d-flex flex-row gap-2">
                    <button
                      type="button"
                      className="btn btn-danger"
                      id="confirmDelete"
                      onClick={() => handleClose()}
                    >
                      Eliminar
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={() => handleClose()}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
