import styled from "styled-components";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

const StyledDashboard = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
`;
function Dashboard() {
  return (
    <StyledDashboard>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </StyledDashboard>
  );
}

export default Dashboard;
