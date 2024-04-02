import React, { useEffect, useState } from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { Skeleton, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Scrollbar } from "../srollbar";
import CheckboxWithChild from "../store-details/middle-section/CheckboxWithChild";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import CustomCheckbox from "../CustomCheckbox";
import { VIEW_ALL_TEXT } from "../../utils/staticTexts";

export const CustomPaperBox = styled(Box)(({ theme }) => ({
  backgroundColor: "paper.default",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)",
  borderRadius: "10px",
  p: "1rem",
  color: theme.palette.neutral[900],
}));

const SingleCategorySelector = ({ item, selectCategory }) => {
  return (
    <ListItemButton onClick={() => selectCategory(item.id)}>
      <ListItemText primary={item.name} />
    </ListItemButton>
  );
};

const MultipleCheckboxWithTitle = (props) => {
  const { title, data, isFetching, searchValue, id, selectedCategoriesHandler } = props;
  const { t } = useTranslation();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  
  useEffect(() => {
    if (searchValue === "category") {
      setSelectedCategoryId(parseInt(id));
    }
  }, [searchValue, id]);

  const selectCategory = (categoryId) => {
    setSelectedCategoryId(categoryId);
    selectedCategoriesHandler?.([categoryId]);
  };

  return (
    <CustomStackFullWidth>
      <Typography fontWeight="bold" sx={{ color: (theme) => theme.palette.neutral[1000], paddingBottom: "1rem" }}>
        {t(title)}
      </Typography>
      <CustomPaperBox>
        <CustomStackFullWidth p="1rem">
          <Scrollbar style={{ maxHeight: "330px" }} scrollbarMinSize={1}>
            {data?.map((item, index) => (
              <React.Fragment key={index}>
                <SingleCategorySelector item={item} selectCategory={selectCategory} />
                {selectedCategoryId === item.id && (
                  <CustomStackFullWidth p="1rem" sx={{ backgroundColor: "#f9f9f9", borderRadius: "5px" }}>

                    {item.childes?.map((subitem, subindex) => (
                      <SingleCategorySelector key={subindex} item={subitem} selectCategory={selectCategory} />
                    ))}
                  </CustomStackFullWidth>
                )}
              </React.Fragment>
            ))}
            {isFetching &&
              [...Array(4)].map((item, index) => (
                <ListItemButton key={index}>
                  <ListItemText>
                    <Skeleton variant="rectangle" height="10px" width="100%" />
                  </ListItemText>
                </ListItemButton>
              ))}
          </Scrollbar>
        </CustomStackFullWidth>
      </CustomPaperBox>
    </CustomStackFullWidth>
  );
};

MultipleCheckboxWithTitle.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default MultipleCheckboxWithTitle;
