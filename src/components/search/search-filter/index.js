import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import SearchFilterForSmallScreens from "../search-filter-mobile";
import MultipleCheckboxWithTitle from "../../multiple-checkbox-with-title";
import { useDispatch, useSelector } from "react-redux";
import { useGetCategories } from "../../../api-manage/hooks/react-query/all-category/all-categorys";
import { setCategories } from "../../../redux/slices/storedData";

const SearchFilter = (props) => {
  const { searchValue, id, selectedCategoriesHandler } = props;
  const { categories } = useSelector((state) => state.storedData);
  const { data: categoriesData, refetch } = useGetCategories();
  const dispatch = useDispatch();
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
console.log(selectedCategoriesHandler)
  useEffect(() => {
    if (categories.length === 0) {
      refetch();
    }
  }, []);

  useEffect(() => {
    if (categoriesData?.data) {
      dispatch(setCategories(categoriesData?.data));
    }
  }, [categoriesData]);

  const content = (
    <Box sx={{ padding: "1rem" }}>
      {categories?.length > 0 && (
        <MultipleCheckboxWithTitle
          title="Categories"
          data={categories}
          searchValue={searchValue}
          id={id}
          showAll
          selectedCategoriesHandler={selectedCategoriesHandler}
        />
      )}
    </Box>
  );

  if (isLargeScreen) {
    return (
      <Box sx={{ width: "100%", py: "3px", height: "100%" }}>
        {content}
      </Box>
    );
  }
  
  return <SearchFilterForSmallScreens searchValue={searchValue} id={id} selectedCategoriesHandler={selectedCategoriesHandler} />;
};

SearchFilter.propTypes = {};

export default SearchFilter;