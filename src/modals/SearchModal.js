import React, { useEffect, useRef, useState } from "react";
import { Modal, ModalHeader, Input, ModalBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { searchableRoutes } from "../components/Forms/searchableRoutes";

const fuse = new Fuse(searchableRoutes, {
  keys: ["label", "keywords"],
  threshold: 0.3,
});

const SearchModal = ({ isOpen, toggle }) => {
  const inputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  const filteredResults = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : [];

  const handleResultClick = (path) => {
    navigate(path);
    toggle();
    setSearchQuery("");
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!filteredResults.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          Math.min(prev + 1, filteredResults.length - 1)
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, -1));
        break;
      case "Enter":
        if (selectedIndex >= 0 && selectedIndex < filteredResults.length) {
          handleResultClick(filteredResults[selectedIndex].path);
        } else if (filteredResults.length > 0) {
          handleResultClick(filteredResults[0].path);
        }
        break;
      case "Escape":
        toggle();
        setSearchQuery("");
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus({ preventScroll: false });
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchQuery]);

  useEffect(() => {
    const handleShortcut = (e) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

      if (e.key === "/") {
        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => {
        toggle();
        setSearchQuery("");
        setSelectedIndex(-1);
      }}
      autoFocus={false}
      modalClassName="modal-search"
    >
      <ModalHeader>
        <Input
          innerRef={inputRef}
          placeholder="SEARCH"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          aria-label="Close"
          className="close"
          onClick={() => {
            toggle();
            setSearchQuery("");
            setSelectedIndex(-1);
          }}
        >
          <i className="tim-icons icon-simple-remove" />
        </button>
      </ModalHeader>

      {searchQuery && (
        <ModalBody className="px-4 pb-3">
          {filteredResults.length > 0 ? (
            filteredResults.map((item, index) => (
              <div
                key={item.path}
                className={`search-result-item py-2 px-3 rounded mb-1 ${
                  index === selectedIndex ? "bg-primary text-white" : "bg-light"
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => handleResultClick(item.path)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {item.label}
              </div>
            ))
          ) : (
            <div className="text-muted px-3">No results found</div>
          )}
        </ModalBody>
      )}
    </Modal>
  );
};

export default SearchModal;
