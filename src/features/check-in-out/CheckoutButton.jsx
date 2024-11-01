import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingID }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      variation="danger"
      size="small"
      onClick={() => checkout(bookingID)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
