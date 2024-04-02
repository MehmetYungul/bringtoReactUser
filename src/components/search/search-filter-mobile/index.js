import React, { useEffect, useState } from "react";
import { Box, Typography, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useGetCategories } from "../../../api-manage/hooks/react-query/all-category/all-categorys";
import { setCategories } from "../../../redux/slices/storedData";

const SearchFilterForSmallScreens = (props) => {
    console.log(props)
    const { searchValue, id, selectedCategoriesHandler } = props;
    const { categories } = useSelector((state) => state.storedData);
    console.log(categories)
    const { data: categoriesData, refetch } = useGetCategories();
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const dispatch = useDispatch();
    console.log(selectedCategoriesHandler)

    useEffect(() => {
        if (categories.length === 0) {
            refetch();
        }
    }, []);

    useEffect(() => {
        if (searchValue === "category") {
            setSelectedCategoryId(parseInt(id));
        }
    }, [searchValue, id]);

    useEffect(() => {
        if (categoriesData?.data) {
            dispatch(setCategories(categoriesData?.data));
        }
    }, [categoriesData]);

    const handleCategoryClick = (categoryId) => {
        // Yalnızca bir kategori seçilmesini sağlamak için önceki seçimi temizle
        if (selectedCategoryId === categoryId) {
            setSelectedCategoryId(null);
        } else {
            setSelectedCategoryId(categoryId);
            selectedCategoriesHandler?.([categoryId]);
        }
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Categories
            </Typography>
            <Box
                sx={{
                    width: "100vw",
                    display: "flex",
                    flexWrap: "nowrap",
                    overflowX: "scroll",
                    maxWidth: "100%",
                }}
            >
                {categories?.map((category) => (
                    <Box
                        key={category.id}
                        mr={2}
                        mb={2}
                        sx={{
                            border: "1px solid #ccc", 
                            borderRadius: "5px",
                            padding: "0.5rem", 
                            backgroundColor: selectedCategoryId === category.id ? "#f9f9f9" : "transparent", // Seçili kategori için arka plan rengi
                        }}
                    >
                        <Link
                            component="button"
                            variant=""
                            onClick={() => handleCategoryClick(category.id)}
                            sx={{ cursor: "pointer", whiteSpace: "nowrap" }}
                        >
                            {category.name}
                        </Link>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default SearchFilterForSmallScreens;
