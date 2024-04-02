import React from "react";
import { CustomStackFullWidth } from "../../styled-components/CustomStyles.style";
import { IconButton, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { t } from "i18next";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { getCurrentModuleType } from "../../helper-functions/getCurrentModuleType";
import { ModuleTypes } from "../../helper-functions/moduleTypes";
import { useTheme } from "@emotion/react";
import Loading from "../custom-loading/Loading";

const getModuleWiseData = (theme) => {
  switch (getCurrentModuleType()) {
    case ModuleTypes.GROCERY:
      return theme.palette.toolTipColor;
    case ModuleTypes.PHARMACY:
      return theme.palette.toolTipColor;
    case ModuleTypes.ECOMMERCE:
      return theme.palette.toolTipColor;
    case ModuleTypes.FOOD:
      return theme.palette.toolTipColor;
  }
};
export const PrimaryToolTip = ({ children, text, placement, arrow }) => {
  return (
    <Tooltip
      title={t(text)}
      arrow
      placement={placement ?? "top"}
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: (theme) => getModuleWiseData(theme),
            "& .MuiTooltip-arrow": {
              color: (theme) => getModuleWiseData(theme),
            },
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
};

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.4)",
  backdropFilter: "blur(2px)",
  borderRadius: "4px",
  padding: "4px",
  color: theme.palette.whiteContainer.main,
  height: "36px",
  width: "36px",
  marginInlineEnd: "6px",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    border: `0.5px solid ${theme.palette.neutral[100]}`,
  },
}));
const QuickView = ({
  quickViewHandleClick,
  noQuickview,
  noWishlist,
  showAddtocart,
  handleCart,
  addToWishlistHandler,
  removeFromWishlistHandler,
  isWishlisted,
  isProductExist,
  addToCartHandler,
  isLoading,
  updateLoading,

  setOpenLocationAlert,
}) => {
  const theme = useTheme();

  let location = undefined;
  if (typeof window !== "undefined") {
    location = localStorage.getItem("location");
  }

  const cartAddToCartClick = (e) => {
    if (location) {
      e.stopPropagation();
      addToCartHandler?.(e);
      handleCart?.(e);
    } else {
      e.stopPropagation();
      setOpenLocationAlert(true);
    }
  };
  return (
    <>
      <CustomStackFullWidth
        direction="row"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        {!noQuickview && (
          <PrimaryToolTip text="Quick View">
            <IconButtonStyled onClick={(e) => quickViewHandleClick(e)}>
              <RemoveRedEyeIcon />
            </IconButtonStyled>
          </PrimaryToolTip>
        )}
        {!noWishlist && (
          <>
            {isWishlisted ? (
              <PrimaryToolTip text="Remove from wishlist">
                <IconButtonStyled onClick={(e) => removeFromWishlistHandler(e)}>
                  <FavoriteIcon />
                </IconButtonStyled>
              </PrimaryToolTip>
            ) : (
              <PrimaryToolTip text="Add to wishlist">
                <IconButtonStyled onClick={(e) => addToWishlistHandler(e)}>
                  <FavoriteBorderIcon />
                </IconButtonStyled>
              </PrimaryToolTip>
            )}
          </>
        )}
        {showAddtocart && (
          <>
            {isLoading ? (
              <IconButtonStyled>
                <Loading color={theme.palette.neutral[100]} />
              </IconButtonStyled>
            ) : (
              <PrimaryToolTip text="Add to cart">
                <IconButtonStyled onClick={(e) => cartAddToCartClick?.(e)}>
                  <ShoppingBagIcon />
                </IconButtonStyled>
              </PrimaryToolTip>
            )}
          </>
        )}
      </CustomStackFullWidth>
    </>
  );
};

export default QuickView;
