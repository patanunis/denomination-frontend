import DenominationView from '../components/DenominationView';
import DepositCalculator from '../components/DepositCalculator';

export default function AdminDashboard() {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <DenominationView />
      <DepositCalculator />
    </div>
  );
}
