import { Map } from "@assets";
import styled from "styled-components";

export const CampLocation = ({ location }: { location: string }) => {
  const reversedLocation = location.split(",").reverse().join(", ");

  return (
    <Box>
      <Map />
      {reversedLocation}
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
