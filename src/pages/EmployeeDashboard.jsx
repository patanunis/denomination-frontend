import DenominationForm from '../components/DenominationForm';
import DepositCalculator from '../components/DepositCalculator';

export default function EmployeeDashboard() {
  return (
    <div>
      <h2>Employee Dashboard</h2>
      <DenominationForm />
      <DepositCalculator />
    </div>
  );
}
