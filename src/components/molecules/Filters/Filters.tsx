import Selector from "../../atoms/Selector/Selector";
import "./Filters.css";
import axios from "axios";

const NATIONALITIES = [
  { value: "us", label: "United States" },
  { value: "au", label: "Australia" },
  { value: "br", label: "Brazil" },
  { value: "ch", label: "China}" },
];

const GENRES = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const BASE_API_URL =
  "https://randomuser.me/api/?results=10&seed=abcdefg&callback=randomuserdata";

type FiltersProps = {
  func: (value: []) => void;
  nationalityFilterValue: string;
  genreFilterValue: string;
  handleNationalityFilter: (value: string) => void;
  handleGenreFilter: (value: string) => void;
};

const Filters = ({
  func,
  nationalityFilterValue,
  genreFilterValue,
  handleNationalityFilter,
  handleGenreFilter,
}: FiltersProps) => {
  const handleQuery = () => {
    const url = `${BASE_API_URL}&nat=${nationalityFilterValue}`;
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
      func(data.results);
    });
  };

  return (
    <div className="col-sm-12 mt-4 filtros-content">
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="row py-3">
            <div className="form-group col-sm-12 col-lg-4">
              <div className="input-group">
                <Selector
                  categoryTitle="Nacionalidad"
                  categoryContent={NATIONALITIES}
                  func={handleNationalityFilter}
                />
              </div>
            </div>
            <div className="form-group col-sm-12 col-lg-4">
              <div className="input-group">
                <Selector
                  categoryTitle="Género"
                  categoryContent={GENRES}
                  func={handleGenreFilter}
                />
              </div>
            </div>
            <div className="col-sm-12 col-lg-4">
              <button
                className="btn btn-sm btn-primary px-4 btn-search"
                onClick={() => handleQuery()}
              >
                <i className="bi bi-search me-2"></i> Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
