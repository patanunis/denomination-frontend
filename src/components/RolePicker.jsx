export default function RolePicker({ value, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      <option value="">Select Role</option>
      <option value="Employee">Employee</option>
      <option value="Admin">Admin</option>
    </select>
  );
}
