import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // ? 1 bookings
  const numBookings = bookings?.length;

  // ? 2: sales
  const sales = bookings?.reduce((acm, curr) => (acm += curr.totalPrice), 0);

  // ? 3: check-ins
  const checkIns = confirmedStays?.length;

  // ? 4: occupancy

  const occupancy =
    Math.round(
      (confirmedStays?.reduce((acm, curr) => acm + curr.numNights, 0) /
        numDays) *
        cabinCount
    ) + "%";

  return (
    <>
      <Stat
        title="bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check-ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={occupancy}
      />
    </>
  );
}

export default Stats;
