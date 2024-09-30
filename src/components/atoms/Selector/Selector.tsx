import { useEffect, useState } from "react";
import "./Selector.css";

type SelectorProps = {
  categoryTitle: string;
  categoryContent: {
    value: string;
    label: string;
  }[];
  func: (value: string) => void;
};

const Selector = ({ categoryTitle, categoryContent, func }: SelectorProps) => {
  const [selected, setSelected] = useState(categoryContent[0].value);
  const [showOptions, setShowOptions] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredContent, setFilteredContent] = useState(categoryContent);

  const handleSelect = (value: string) => {
    setSelected(value);
    setShowOptions(false);
    setSearchValue("");
    setFilteredContent(categoryContent);
    func(value);
  };
  const handleShowOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    const filtered = categoryContent.filter((nat) =>
      nat.value.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredContent(filtered);
  };

  const validateIfIsSelected = (value: string) => {
    if (value === selected) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    func(selected);
  }, []);

  return (
    <div
      className="position-relative"
      style={{
        width: "406px",
      }}
    >
      {/* Button */}
      <button
        className="customDropdown position-absolute"
        onClick={() => handleShowOptions()}
      >
        <div className="d-flex flex-row justify-content-between">
          <p
            style={{
              margin: "0",
              fontSize: "14px",
              textTransform: "uppercase",
            }}
          >
            {selected}
          </p>
          <i
            className="bi bi-chevron-down"
            style={{
              fontSize: "14px",
            }}
          ></i>
        </div>
      </button>
      {showOptions && (
        <div className="selectorContainer position-absolute">
          <div
            style={{
              padding: "8px",
              width: "100%",
            }}
          >
            <input
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className="searchInput"
              type="text"
              placeholder="Buscar..."
            />
          </div>
          <div className="categoryTitle">{categoryTitle}</div>
          <div className="d-flex flex-column">
            {filteredContent.map((nat, index) => (
              <div
                key={index}
                className={`${
                  validateIfIsSelected(nat.value)
                    ? "selectedItem"
                    : "categoryContent"
                }`}
                onClick={() => handleSelect(nat.value)}
              >
                <p
                  style={{
                    margin: "0",
                    fontSize: "14px",
                    textTransform: "uppercase",
                  }}
                >
                  {nat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Selector;
