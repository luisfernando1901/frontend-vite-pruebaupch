type EditModalProps = {
  show: boolean;
  userInfo: any;
  handleClose: () => void;
  setUserInfo: (userInfo: any) => void;
};

const EditModal = ({
  show,
  handleClose,
  userInfo,
  setUserInfo,
}: EditModalProps) => {
  const blankUserInfo = () => {
    setUserInfo({
      name: "",
      gender: "",
      location: "",
      phone: "",
      email: "",
      country: "",
    });
  };

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
                  <h5 className="modal-title" id="editModalLabel">
                    Editar Usuario
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => {
                      handleClose();
                      blankUserInfo();
                    }}
                  ></button>
                </div>
                <div className="modal-body pt-3">
                  <form id="editForm p-3" className="row">
                    <div className="mb-3 col-sm-12 col-md-6">
                      <label htmlFor="editNombre" className="form-label">
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="editNombre"
                        required
                        defaultValue={userInfo.name}
                      />
                    </div>
                    <div className="mb-3 col-sm-12 col-md-6">
                      <label htmlFor="editGenero" className="form-label">
                        Género
                      </label>
                      <select
                        className="form-select"
                        id="editGenero"
                        required
                        defaultValue={userInfo.gender}
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                      </select>
                    </div>
                    <div className="mb-3 col-sm-12 col-md-6">
                      <label htmlFor="editDireccion" className="form-label">
                        Dirección
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="editDireccion"
                        required
                        defaultValue={userInfo.location}
                      />
                    </div>
                    <div className="mb-3 col-sm-12 col-md-6">
                      <label htmlFor="editTelefono" className="form-label">
                        Teléfono
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="editTelefono"
                        required
                        defaultValue={userInfo.phone}
                      />
                    </div>
                    <div className="mb-3 col-sm-12 col-md-6">
                      <label htmlFor="editCorreo" className="form-label">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="editCorreo"
                        required
                        defaultValue={userInfo.email}
                      />
                    </div>
                    <div className="mb-3 col-sm-12 col-md-6">
                      <label htmlFor="editPais" className="form-label">
                        País
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="editPais"
                        required
                        defaultValue={userInfo.country}
                      />
                    </div>
                    <div className="col-sm-12 mt-3">
                      <button
                        type="submit"
                        className="btn btn-primary w-100"
                        onClick={() => {
                          handleClose();
                          blankUserInfo();
                        }}
                      >
                        Guardar cambios
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;
