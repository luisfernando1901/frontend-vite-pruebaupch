import Button from "react-bootstrap/Button";
import "./Table.css";
import { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import axios from "axios";

const BASE_API_URL =
  "https://randomuser.me/api/?results=10&seed=abcdefg&callback=randomuserdata";

type TableProps = {
  tableData: any;
  filteredData: any;
  genreFilterValue: string;
  nationalityFilterValue: string;
  setFilteredData: (data: any) => void;
  setTableData: (data: any) => void;
  setUserInfo: (data: any) => void;
  handleShowEditModal: () => void;
  handleShowDeleteModal: () => void;
};

const Table = ({
  filteredData,
  tableData,
  genreFilterValue,
  nationalityFilterValue,
  setFilteredData,
  setUserInfo,
  setTableData,
  handleShowEditModal,
  handleShowDeleteModal,
}: TableProps) => {
  let items = [];

  const [searchValue, setSearchValue] = useState("");

  const [filterOrder, setFilterOrder] = useState("asc");
  const [tablePage, setTablePage] = useState(1);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    const filtered = tableData.filter((user: any) =>
      `${user.name.first} ${user.name.last}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const orderAscendant = (columnType: string) => {
    filterOrder === "asc" ? setFilterOrder("desc") : setFilterOrder("asc");
    const aux = [...filteredData];
    switch (columnType) {
      case "name":
        const ordered = aux.sort((a: any, b: any) =>
          `${a.name.first} ${a.name.last}`.localeCompare(
            `${b.name.first} ${b.name.last}`
          )
        );
        console.log(ordered);
        setFilteredData(ordered);
        break;

      case "gender":
        const orderedGenre = aux.sort((a: any, b: any) =>
          `${a.gender}`.localeCompare(`${b.gender}`)
        );
        setFilteredData(orderedGenre);
        break;

      case "location":
        const orderedLocation = aux.sort((a: any, b: any) =>
          `${a.location.street.name}`.localeCompare(`${b.location.street.name}`)
        );
        setFilteredData(orderedLocation);
        break;

      case "phone":
        const orderedPhone = aux.sort((a: any, b: any) =>
          `${a.phone}`.localeCompare(`${b.phone}`)
        );
        setFilteredData(orderedPhone);
        break;

      case "email":
        const orderedEmail = aux.sort((a: any, b: any) =>
          `${a.email}`.localeCompare(`${b.email}`)
        );
        setFilteredData(orderedEmail);
        break;

      case "country":
        const orderedCountry = aux.sort((a: any, b: any) =>
          `${a.location.country}`.localeCompare(`${b.location.country}`)
        );
        setFilteredData(orderedCountry);
        break;

      default:
        break;
    }
  };

  const orderDescendant = (columnType: string) => {
    filterOrder === "desc" ? setFilterOrder("") : setFilterOrder("asc");
    const aux = [...filteredData];
    switch (columnType) {
      case "name":
        const ordered = aux.sort((b: any, a: any) =>
          `${a.name.first} ${a.name.last}`.localeCompare(
            `${b.name.first} ${b.name.last}`
          )
        );
        console.log(ordered);
        setFilteredData(ordered);
        break;

      case "gender":
        const orderedGenre = aux.sort((b: any, a: any) =>
          `${a.gender}`.localeCompare(`${b.gender}`)
        );
        setFilteredData(orderedGenre);
        break;

      case "location":
        const orderedLocation = aux.sort((b: any, a: any) =>
          `${a.location.street.name} ${a.location.street.number}`.localeCompare(
            `${b.location.street.name} ${b.location.street.number}`
          )
        );
        setFilteredData(orderedLocation);
        break;

      case "phone":
        const orderedPhone = aux.sort((b: any, a: any) =>
          `${a.phone}`.localeCompare(`${b.phone}`)
        );
        setFilteredData(orderedPhone);
        break;

      case "email":
        const orderedEmail = aux.sort((b: any, a: any) =>
          `${a.email}`.localeCompare(`${b.email}`)
        );
        setFilteredData(orderedEmail);
        break;

      case "country":
        const orderedCountry = aux.sort((b: any, a: any) =>
          `${a.location.country}`.localeCompare(`${b.location.country}`)
        );
        setFilteredData(orderedCountry);
        break;

      default:
        break;
    }
  };
  const restoreOrder = () => {
    setFilterOrder("asc");
    setFilteredData(tableData);
  };
  const passUserData = (user: any) => {
    setUserInfo({
      name: `${user.name.first} ${user.name.last}`,
      gender: user.gender,
      location: `${user.location.street.name} ${user.location.street.number}`,
      phone: user.phone,
      email: user.email,
      country: user.location.country,
    });
  };
  const handleNextPage = () => {
    tablePage < 5 ? setTablePage(tablePage + 1) : null;
  };
  const handlePreviousPage = () => {
    tablePage > 1 ? setTablePage(tablePage - 1) : null;
  };
  const handleSetPage = (page: number) => {
    setTablePage(page);
  };

  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === tablePage}
        onClick={() => handleSetPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    const url = `${BASE_API_URL}&page=${tablePage}`;
    axios.get(url).then((resp) => {
      console.log(
        JSON.parse(resp.data.replace("randomuserdata(", "").slice(0, -2))
      );
      const data = JSON.parse(
        resp.data.replace("randomuserdata(", "").slice(0, -2)
      );
      setTableData(data.results);
      setFilteredData(data.results);
    });
  }, []);

  useEffect(() => {
    if (genreFilterValue === "" && genreFilterValue === "") {
      console.log(genreFilterValue, nationalityFilterValue);
      const url = `${BASE_API_URL}&page=${tablePage}`;
      axios.get(url).then((resp) => {
        console.log(
          JSON.parse(resp.data.replace("randomuserdata(", "").slice(0, -2))
        );
        const data = JSON.parse(
          resp.data.replace("randomuserdata(", "").slice(0, -2)
        );
        setTableData(data.results);
        setFilteredData(data.results);
      });
    } else {
      console.log(genreFilterValue, nationalityFilterValue);
      const url = `${BASE_API_URL}&page=${tablePage}&nat=${nationalityFilterValue}`;
      console.log(url);
      axios.get(url).then((resp) => {
        console.log(
          JSON.parse(resp.data.replace("randomuserdata(", "").slice(0, -2))
        );
        const data = JSON.parse(
          resp.data.replace("randomuserdata(", "").slice(0, -2)
        );
        data.results = data.results.filter(
          (result: { gender: string }) => result.gender === genreFilterValue
        );
        setTableData(data.results);
        setFilteredData(data.results);
      });
    }
  }, [tablePage]);

  return (
    <div className="col-sm-12 pt-4">
      <div
        className="card border rounded-2"
        style={{
          backgroundColor: "#f8f8f8",
        }}
      >
        <div
          className="card-header py-3"
          style={{
            backgroundColor: "#f8f8f8",
          }}
        >
          <div className="d-flex justify-content-start align-items-center">
            <button
              className="btn btn-sm btn-outline-primary px-4 me-2 editar"
              onClick={() => handleShowEditModal()}
            >
              <i className="bi bi-pencil"></i> Editar
            </button>
            <button
              className="btn btn-sm btn-outline-danger px-4 me-2"
              id="confirmDelete"
              onClick={() => handleShowDeleteModal()}
            >
              <i className="bi bi-trash3"></i> Eliminar
            </button>
          </div>
        </div>
        <div className="px-3">
          <input
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            placeholder="Buscar"
            className="input-search form-control form-control-sm shadow-sm mt-5"
          />
        </div>
        <div className="card-body">
          <div className="dt-example">
            <table className="table table-hover table-light">
              <thead>
                <tr>
                  <th scope="col">
                    <i className="bi bi-check-lg"></i>
                  </th>
                  <th scope="col"></th>
                  <th
                    scope="col"
                    onClick={() =>
                      filterOrder === "asc"
                        ? orderAscendant("name")
                        : filterOrder === "desc"
                        ? orderDescendant("name")
                        : restoreOrder()
                    }
                  >
                    Nombre
                  </th>
                  <th
                    scope="col"
                    onClick={() =>
                      filterOrder === "asc"
                        ? orderAscendant("gender")
                        : filterOrder === "desc"
                        ? orderDescendant("gender")
                        : restoreOrder()
                    }
                  >
                    Genero
                  </th>
                  <th
                    scope="col"
                    onClick={() =>
                      filterOrder === "asc"
                        ? orderAscendant("location")
                        : filterOrder === "desc"
                        ? orderDescendant("location")
                        : restoreOrder()
                    }
                  >
                    Dirección
                  </th>
                  <th
                    scope="col"
                    onClick={() =>
                      filterOrder === "asc"
                        ? orderAscendant("phone")
                        : filterOrder === "desc"
                        ? orderDescendant("phone")
                        : restoreOrder()
                    }
                  >
                    Teléfono
                  </th>

                  <th
                    scope="col"
                    onClick={() =>
                      filterOrder === "asc"
                        ? orderAscendant("email")
                        : filterOrder === "desc"
                        ? orderDescendant("email")
                        : restoreOrder()
                    }
                  >
                    Correo electrónico
                  </th>

                  <th
                    scope="col"
                    onClick={() =>
                      filterOrder === "asc"
                        ? orderAscendant("country")
                        : filterOrder === "desc"
                        ? orderDescendant("country")
                        : restoreOrder()
                    }
                  >
                    País
                  </th>
                </tr>
              </thead>
              {filteredData.length > 0 ? (
                <tbody>
                  {filteredData?.map((user: any, index: number) => (
                    <tr key={index}>
                      <th scope="row">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={() => passUserData(user)}
                        />
                      </th>
                      <td>
                        <img
                          src={user.picture.thumbnail}
                          alt=""
                          className="image"
                        />
                      </td>

                      <td>{`${user.name.first} ${user.name.last}`}</td>
                      <td>{user.gender}</td>
                      <td>{`${user.location.street.name} ${user.location.street.number}`}</td>
                      <td>{user.phone}</td>

                      <td>{user.email}</td>

                      <td className="text-uppercase">
                        {user.location.country}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : null}
            </table>
            {filteredData.length === 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  minWidth: "100%",
                }}
              >
                <div className="d-flex">No se encontró resultados</div>
              </div>
            )}
            {/* Table Footer */}
            <div className="d-flex flex-row justify-content-between">
              <div>#Registros: {filteredData.length}</div>
              <div className="d-flex flex-row gap-1">
                <Button variant="link" onClick={() => handlePreviousPage()}>
                  Anterior
                </Button>
                <Pagination className="mb-0">{items}</Pagination>
                <Button variant="link" onClick={() => handleNextPage()}>
                  Siguiente
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
