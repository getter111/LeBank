import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, List, ListItem, ListItemText, Stack } from "@mui/material";

export const ActionsTab = ({
  handleFilterClick,
  dateFilterExpanded,
  descriptFilterExpanded,
  typeFilterExpanded,
  costFilterExpanded,
}) => {
  return (
    <List
      component={Stack}
      direction="row"
      sx={{ border: "1px solid", width: "49vw" }}
    >
      <ListItem>
        <Button
          sx={{ flex: "1" }}
          onClick={() => handleFilterClick(1)}
          variant="contained"
          color="primary"
          endIcon={dateFilterExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          Date
        </Button>
      </ListItem>
      <ListItem>
        <Button
          sx={{ flex: "1" }}
          onClick={() => handleFilterClick(2)}
          variant="contained"
          color="primary"
          endIcon={
            descriptFilterExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
          }
        >
          Description
        </Button>
      </ListItem>
      <ListItem>
        <Button
          sx={{ flex: "1" }}
          onClick={() => handleFilterClick(3)}
          variant="contained"
          color="primary"
          endIcon={typeFilterExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          Type
        </Button>
      </ListItem>
      <ListItem>
        <Button
          sx={{ flex: "1" }}
          onClick={() => handleFilterClick(4)}
          variant="contained"
          color="primary"
          endIcon={costFilterExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          Cost
        </Button>
      </ListItem>
      <ListItem>
        <ListItemText
          sx={{ flex: "1", textAlign: "center", bgcolor: "green" }}
          id="balance"
          primary="Balance"
        />
      </ListItem>
    </List>
  );
};
