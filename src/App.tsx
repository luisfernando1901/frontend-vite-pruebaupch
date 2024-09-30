import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import Filters from "./components/molecules/Filters/Filters";
import EditModal from "./components/atoms/EditModal/EditModal";
import DeleteModal from "./components/atoms/DeleteModal/DeleteModal";
import Table from "./components/atoms/Table/Table";
import Header from "./components/atoms/Header/Header";

function App() {
  const [showFilters, setShowFilters] = useState(false);
  const [nationalityFilterValue, setNationalityFilterValue] = useState("");
  const [genreFilterValue, setGenreFilterValue] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    gender: "",
    location: "",
    phone: "",
    email: "",
    country: "",
  });
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleNationalityFilter = (value: string) => {
    setNationalityFilterValue(value);
  };
  const handleGenreFilter = (value: string) => {
    setGenreFilterValue(value);
  };

  const handleNewTableData = (values: []) => {
    setTableData(values);
    setFilteredData(values);
  };
  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };
  const handleShowEditModal = () => {
    setShowEditModal(!showEditModal);
  };
  const handleShowDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  return (
    <div className="d-flex flex-column">
      <Header />
      <div
        className="d-flex flex-column pt-5"
        style={{
          marginLeft: "86px",
          marginRight: "86px",
        }}
      >
        <h3
          style={{
            fontWeight: "bold",
          }}
        >
          Listado de Usuarios
        </h3>
        <div className="d-flex justify-content-end align-items-center">
          <button
            className="btn btn-sm btn-outline-primary px-4"
            id="filtrosBtn"
            onClick={() => handleShowFilters()}
          >
            <i className="bi bi-sliders"></i> Filtros
          </button>
        </div>
        {/* Filter Section */}
        {showFilters && (
          <Filters
            nationalityFilterValue={nationalityFilterValue}
            genreFilterValue={genreFilterValue}
            handleNationalityFilter={handleNationalityFilter}
            handleGenreFilter={handleGenreFilter}
            func={handleNewTableData}
          />
        )}
        {/* Table Section */}
        <Table
          filteredData={filteredData}
          genreFilterValue={genreFilterValue}
          nationalityFilterValue={nationalityFilterValue}
          handleShowDeleteModal={handleShowDeleteModal}
          handleShowEditModal={handleShowEditModal}
          setFilteredData={setFilteredData}
          setTableData={setTableData}
          setUserInfo={setUserInfo}
          tableData={tableData}
        />
      </div>
      <EditModal
        show={showEditModal}
        handleClose={handleShowEditModal}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <DeleteModal show={showDeleteModal} handleClose={handleShowDeleteModal} />
    </div>
  );
}

export default App;
