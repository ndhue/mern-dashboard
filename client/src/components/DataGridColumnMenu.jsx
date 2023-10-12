import {
  GridColumnMenu
} from "@mui/x-data-grid";


function CustomColumnMenu(props) {
  return (
    <GridColumnMenu
      {...props}
      slots={{
        columnMenuSortItem: null
      }}
    />
  );
}

export default CustomColumnMenu;