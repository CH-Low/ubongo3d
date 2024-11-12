import { useEffect, useState } from 'react';

export default function Dropdown({ description, items, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => { 
    setSelectedItem(description);
  }, [description]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectItem = (value) => {
    setSelectedItem(value);
    setIsOpen(false);
    onChange(value);
  };

  return (
    <div className="dropdown">
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
            <li key={index} onClick={() => handleSelectItem(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

