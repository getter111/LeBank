import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

export const ActionsTab = () => {
  return (
    <List
      component={Stack}
      direction="row"
      sx={{ border: "1px solid", width: "49vw" }}
    >
      <ListItem>
        <Button
          sx={{ flex: "1" }}
          onClick={() => navigate("/")}
          variant="contained"
          color="primary"
          endIcon={<ExpandMoreIcon />}
        >
          Date
        </Button>
      </ListItem>
      <ListItem>
        <Button
          sx={{ flex: "1" }}
          onClick={() => navigate("/")}
          variant="contained"
          color="primary"
          endIcon={<ExpandMoreIcon />}
        >
          Type
        </Button>
      </ListItem>
      <ListItem>
        <Button
          sx={{ flex: "1" }}
          onClick={() => navigate("/")}
          variant="contained"
          color="primary"
          endIcon={<ExpandMoreIcon />}
        >
          Description
        </Button>
      </ListItem>
      <ListItem>
        <Button
          sx={{ flex: "1" }}
          onClick={() => navigate("/")}
          variant="contained"
          color="primary"
          endIcon={<ExpandMoreIcon />}
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
