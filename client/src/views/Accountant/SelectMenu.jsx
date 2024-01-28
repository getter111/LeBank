import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import React from "react";

export const SelectMenu = ({
  selectMenuOptions,
  anchorEl,
  selectedIndex,
  handleClickListItem,
  handleMenuItemClick,
  handleClose,
}) => {
  const theme = useTheme();
  const open = Boolean(anchorEl);

  return (
    <Box>
      <List
        component="nav"
        sx={{ bgcolor: theme.palette.primary.main, padding: 0 }}
      >
        <ListItem
          button
          id="lock-button"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            sx={{
              "& .MuiListItemText-primary": {
                color: "green",
              },
              "& .MuiListItemText-secondary": {
                color: "blue",
              },
            }}
            primary={` ${selectMenuOptions[selectedIndex]}`}
          />
          <IconButton
            edge="end"
            aria-label="expand more"
            aria-haspopup="true"
            size="small"
          >
            <ExpandMoreIcon />
          </IconButton>
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
        sx={{
          "& ul": {
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        {selectMenuOptions.map((option, index) => (
          <MenuItem
            key={option}
            // disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
            sx={{
              marginRight: "0.1em",
              marginLeft: "0.1em",
              color:
                index === selectedIndex
                  ? "green"
                  : theme.palette.text.secondary,
              border:
                index === selectedIndex
                  ? `1px dashed ${theme.palette.secondary.main}`
                  : "none",
              "&:hover": {
                color: index === selectedIndex ? "blue" : "green",
              },
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
