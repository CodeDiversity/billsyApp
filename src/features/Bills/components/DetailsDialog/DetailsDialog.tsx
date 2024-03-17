import styled from "@emotion/styled";
import { Dialog } from "@mui/material";
import { Bill } from "../../types/Bill";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

interface CreatePaymentProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  bill: Bill;
}

export const DetailsDialog = ({ open, setOpen, bill }: CreatePaymentProps) => {
  return (
    <Dialog open={open} maxWidth="md" fullWidth={true}>
      <Wrapper>
        <DisplayFlex>
          <div></div>
          <Header>{bill.name}</Header>
          <CloseOutlinedIcon
            sx={{
              height: "40px",
              width: "40px",
              marginRight: "10px",
              cursor: "pointer",
            }}
            onClick={() => setOpen(false)}
          />
        </DisplayFlex>
      </Wrapper>
    </Dialog>
  );
};

const DisplayFlex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Wrapper = styled.section`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fa;
`;


const Header = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  margin-left: 2%;
  padding-top: 2rem;
`;





