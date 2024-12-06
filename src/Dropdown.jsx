import './Dropdown.css';
import { useEffect, useRef, useState } from 'react';
import useOutsideAlerter from './hooks/useOutsideAlerter';

export default function Dropdown({ description, items, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setIsOpen(false));

  useEffect(() => {
    setSelectedItem(description);
  }, [description]);

  useEffect(() => {
    if (isOpen && selectedItem !== "") {
      const menuItems = wrapperRef.current?.querySelectorAll(".dropdown-item");
      const selectedIndex = items.indexOf(selectedItem);

      if (menuItems && menuItems[selectedIndex]) {
        menuItems[selectedIndex].focus();
      }
    }
  }, [isOpen, selectedItem, items]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectItem = (value) => {
    setSelectedItem(value);
    setIsOpen(false);
    onChange(value);
  };


  return (
    <div className="dropdown" ref={wrapperRef}>
      <div
        className="dropdown-selected"
        onClick={toggleDropdown}
      >
        {selectedItem}
        <span className={`arrow ${isOpen ? 'up' : 'down'}`} />
      </div>
      {isOpen && (
        <ul className="dropdown-menu">
          {items.map((item, index) => (
            <li key={index}>
              <button
                className="dropdown-item"
                onClick={() => handleSelectItem(item)}
              >
                {item}
              </button>
            </li>


          ))}
        </ul>
      )}
    </div>
  );
};

