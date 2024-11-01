import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import { useCheckin } from "../check-in-out/useCheckin";
import { useDeleteBooking } from "../check-in-out/useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetails() {
  const { booking, isLoading } = useBooking();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { checkout, isCheckingOut } = useCheckout();
  const { isCheckingIn } = useCheckin();

  const { status, id: bookingID } = booking || {};

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resourceName="booking" />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingID}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            onClick={() => navigate(`/checkin/${bookingID}`)}
            disabled={isCheckingIn}
          >
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => {
              checkout(bookingID);
            }}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        )}

        {/* // ! do THIS */}
        <Modal>
          <Modal.Open opens="delete">
            <Button
              variation="danger"
              icon={<HiTrash />}
              onClick={() => {
                deleteBooking(bookingID);
                moveBack();
              }}
              disabled={isDeleting}
            >
              Delete booking
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              // ! specifying the other argument to deleteBooking of options for onSettled
              onConfirm={() =>
                deleteBooking(bookingID, {
                  onSettled: () => moveBack(),
                })
              }
            />
          </Modal.Window>
        </Modal>
        {/* // ! instead of this */}
        {/* {status === "checked-out" && (
          <Button
            icon={<HiTrash />}
            onClick={() => {
              deleteBooking(bookingID);
              moveBack();
            }}
            disabled={isDeleting}
          >
            Delete booking
          </Button>
        )} */}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetails;
