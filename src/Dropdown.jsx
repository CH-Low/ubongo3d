import { useState } from 'react';

export default function Dropdown({description, items}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(description);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
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

