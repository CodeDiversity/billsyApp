import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Bill } from "../../types/Bill";


interface MobileActionCellProps {
  onEdit: (bill: Bill) => void;
  onDelete: (bill: Bill) => void;
  onPay: (bill: Bill) => void;
  onDetails: (bill: Bill) => void;
  bill: any;
}

export const MobileActionCell = ({
  onEdit,
  onDelete,
  onPay,
  onDetails,
  bill,
}: MobileActionCellProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem key={'edit'} onClick={() => onEdit(bill)}>
          Edit
        </MenuItem>
        <MenuItem key={'delete'} onClick={() => onDelete(bill)}>
          Delete
        </MenuItem>
        <MenuItem key={'pay'} onClick={() => onPay(bill)}>
          Pay
        </MenuItem>
        <MenuItem key={'details'} onClick={() => onDetails(bill)}>
          Details
        </MenuItem>
      </Menu>
    </div>
  );
}
