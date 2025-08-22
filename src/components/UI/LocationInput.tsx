import { Map } from "@assets";
import { selectLocations } from "@store/locations/locationsSelector";
import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

interface Props {
  filters: { location?: string };
}

export const LocationInput = ({ filters }: Props) => {
  const allLocations = useSelector(selectLocations);
  const [userSearch, setUserSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const match = allLocations.filter((loc) =>
      loc.toLowerCase().includes(filters?.location ?? "")
    );
    if (match.length === 1) setUserSearch(match[0]);
  }, [allLocations, filters?.location]);

  const filteredLocations = useMemo(() => {
    return allLocations.filter((loc) =>
      loc.toLowerCase().includes(userSearch.toLowerCase())
    );
  }, [allLocations, userSearch]);

  const handleSelect = (location: string) => {
    setUserSearch(location);
    setIsOpen(false);
  };

  return (
    <InputWrapper>
      <LocationInputField
        autoComplete="off"
        type="text"
        name="location"
        placeholder="Select city"
        value={userSearch}
        onChange={(e) => setUserSearch(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
      />
      <MapIcon />
      {isOpen && filteredLocations.length > 0 && (
        <Dropdown>
          {filteredLocations.map((loc) => (
            <DropdownItem key={loc} onClick={() => handleSelect(loc)}>
              {loc}
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </InputWrapper>
  );
};

const inputBaseStyles = css`
  border-radius: 12px;
  outline: none;
  border: none;
  background: var(--Inputs);
  font-size: 16px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const LocationInputField = styled.input`
  ${inputBaseStyles};
  padding: 6px 10px 9px 48px;
  width: 100%;
  height: 56px;
  @media (width>=1440px) {
    padding: 18px 20px 18px 48px;
  }
`;

const MapIcon = styled(Map)`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 4px;
  padding: 8px 0;
  list-style: none;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  max-height: 200px;
  overflow-y: auto;
`;

const DropdownItem = styled.li`
  ${inputBaseStyles};
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background: var(--Inputs);
  }
`;
