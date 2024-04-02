import { Skeleton, styled, Tooltip } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { setSelectedModule } from "../../redux/slices/utils";
import CustomImageContainer from "../CustomImageContainer";

const Container = styled(Stack)(({ theme }) => ({
  maxWidth: "1300px",
  alignSelf: "center",
  position: "fixed",
  zIndex: 2000,
  top: 0,
  background: theme.palette.background.paper,
  borderTopLeftRadius: "29px",
  borderBottomLeftRadius: "29px",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));
const ModuleContainer = styled(Box)(({ theme, selected }) => ({
  zIndex: 1000,
  cursor: "pointer",
  paddingTop: 6,
  paddingBottom: 9,
  borderRadius: "11px",
  borderStartEndRadius: "0",
  borderStartStartRadius: "0",
  display: "flex",
  paddingLeft: 5,
  paddingRight: 5,
  marginLeft: 5,
  marginRight: 5,
  height: "45px",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.background.paper,
  transition: "all ease 0.5s",
    background:
    selected &&
    theme.palette.primary.dark,
 
  "&:hover": {
   backgroundColor: theme.palette.primary.light
  },
}));

export const zoneWiseModule = (data) => {
  const currentZoneIds = JSON.parse(localStorage.getItem("zoneid"));
  const result = data.filter((moduleItem) => {
    const zoneIds = moduleItem?.zones?.map((zone) => zone.id);
    return currentZoneIds?.some((id) => zoneIds?.includes(id));
  });
  return result;
};

const ModuleSelect = ({
  moduleSelectHandler,
  selectedModule,
  data,
  configData,
  dispatch,
}) => {
  const handleModuleSelect = (item) => {
    dispatch(setSelectedModule(item));
    moduleSelectHandler(item);
  };
  return (
    <Container style={{flexDirection: 'row', alignItems: "start", justifyItems: "center", width: "100%", height: "50px", paddingLeft: "20px", paddingRight: "20px"}} >
      {data ? (
        zoneWiseModule?.(data)?.map((item, index) => {
          return (
                          <ModuleContainer
                selected={
                  item?.module_type === selectedModule?.module_type &&
                  item?.id === selectedModule?.id
                }
                onClick={() => handleModuleSelect(item)}
              >
           <div onClick={() => handleModuleSelect(item)} style={{paddingRight: 10, paddingLeft:10}}>{item.module_name}</div> 

             </ModuleContainer>
          );
        })
      ) : (
        <>
          {[...Array(5)].map((item, index) => (
            <Skeleton
              key={index}
              width="40px"
              height="40px"
              variant="rectangle"
            />
          ))}
        </>
      )}
    </Container>
  );
};

export default ModuleSelect;
