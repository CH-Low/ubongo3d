import { useEffect, useRef, useState } from 'react';
import useOutsideAlerter from './useOutsideAlerter';

export default function Dropdown({ description, items, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const wrapperRef = useRef(null);
  const itemsRef = useRef([]);
  useOutsideAlerter(wrapperRef, () => setIsOpen(false));

  useEffect(() => {
    setSelectedItem(description);
  }, [description]);

  useEffect(() => {
    if (isOpen && selectedItem !== "") {
      const selectedIndex = items.indexOf(selectedItem);
      if (itemsRef.current[selectedIndex]) {
        itemsRef.current[selectedIndex].focus();
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
        className="dropdownSelected"
        onClick={toggleDropdown}
      >
        {selectedItem}
        <span className={`arrow ${isOpen ? 'up' : 'down'}`} />
      </div>
      {isOpen && (
        <ul className="dropdownMenu">
          {items.map((item, index) => (
            <li
              tabIndex="0"
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              onClick={() => handleSelectItem(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

