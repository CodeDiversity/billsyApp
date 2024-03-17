import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  styled as muiStyled,
} from "@mui/material";
import { Edit, Delete, Payment,InfoOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { selectUserBills } from "../slices/billSlice";
import { LoggedInLayout } from "../../../common/Layouts/LoggedInLayout";
import { DeleteDialog } from "./DeleteDialog/DeleteDialog";
import { Bill } from "../types/Bill";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { payBill } from "../thunks/billThunks";
import { AppDispatch } from "../../../store";
import { CreatePayment } from "../../Payments/components/CreatePayment";
import { set } from "date-fns";
import { DetailsDialog } from "./DetailsDialog/DetailsDialog";

export const Bills = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Helper function to format date strings
  const formatDate = (dateString: string | number | Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const navigate = useNavigate();

  const emptyBill: Bill = {
    _id: "",
    name: "",
    amount: 0,
    dueDate: "",
    category: "",
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDelete, setOpenDelete] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [bill, setBill] = useState<Bill>(emptyBill);

  const handleChangePage = (
    event: any,
    newPage: React.SetStateAction<number>
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page after rows per page change
  };

  // Helper function to format currency
  const formatCurrency = (amount: number | bigint) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const onEdit = (bill: any) => {
    navigate(`/edit/${bill._id}`);
  };

  const onDetails = (bill: any) => {
    setBill(bill);
    setOpenDetails(true);
  }

  const onPay = (bill: any) => {
    setBill(bill);
    let link = bill.payLink;
    setOpenPayment(true);
    if (bill.payLink) {
      if (!bill.payLink.startsWith("http")) {
        link = `https://${link}`;
      }
      window.open(link, "_blank");
    }
  };

  const onDelete = (bill: any) => {
    setBill(bill);
    setOpenDelete(true);
  };

  const bills = useSelector(selectUserBills);
  const totalBills = bills.length;

  return (
    <LoggedInLayout>
      <AddBillButton onClick={() => navigate("/new")}>Add Bill</AddBillButton>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Due Date</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(
                (
                  bill: {
                    name:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                    dueDate: any;
                    amount: any;
                  },
                  index: React.Key | null | undefined
                ) => (
                  <TableRow key={index}>
                    <TableCell>{bill.name}</TableCell>
                    <TableCell>{formatDate(bill.dueDate)}</TableCell>
                    <TableCell>{formatCurrency(bill.amount)}</TableCell>
                    <TableCell sx={{ width: "200px" }}>
                      <Button
                        sx={{ padding: 0, minWidth: 40 }}
                        onClick={() => onEdit(bill)}
                      >
                        <Edit />
                      </Button>
                      <Button
                        sx={{ padding: 0, minWidth: 40 }}
                        onClick={() => onDelete(bill)}
                      >
                        <Delete />
                      </Button>
                      <Button
                        sx={{ padding: 0, minWidth: 40 }}
                        onClick={() => onPay(bill)}
                      >
                        <Payment />
                      </Button>
                      <Button
                        sx={{ padding: 0, minWidth: 40 }}
                        onClick={() => {
                          onDetails(bill);
                        }}
                      >
                        <InfoOutlined />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={totalBills}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <DetailsDialog open={openDetails} bill={bill} setOpen={setOpenDetails} />
      <DeleteDialog open={openDelete} setOpen={setOpenDelete} bill={bill} />
      <CreatePayment open={openPayment} setOpen={setOpenPayment} bill={bill} />
    </LoggedInLayout>
  );
};

const StyledTableCell = muiStyled(TableCell)`
  font-weight: bold;
`;

const AddBillButton = styled.button`
  background-color: #3f51b5;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
  transition: 0.3s;
  width: 10%;
  &:hover {
    background-color: #2f3d9e;
  }
`;
