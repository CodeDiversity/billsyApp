import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Bill } from "../../types/billTypes";
import { useDispatch } from "react-redux";
import { deleteBillSoft } from "../../thunks/billThunks";
import { AppDispatch } from "../../../../store";

interface DeleteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  bill: Bill;
}

export const DeleteDialog = ({ open, setOpen, bill }: DeleteDialogProps) => {

  const dispatch= useDispatch<AppDispatch>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    console.log("Deleting bill", bill);
    if(bill?._id){
      dispatch(deleteBillSoft(bill?._id)).unwrap();
    }
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Delete Bill?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete {bill?.name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
