import { Card } from "@/components/ui/Card";
import Button from "../../../components/ui/Button";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const data = [
    { name: "Insurance", value: 4 },
    { name: "Investments", value: 2 },
  ];
  const COLORS = ["#2563eb", "#60a5fa"];

  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-4">
          {/* Plans Overview */}
          <Card title="Plans Overview">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} dataKey="value" outerRadius={70} label>
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Providers */}
          <Card title="Providers">
            <p>ABC Insurance Pvt Ltd</p>
            <span className="text-gray-500 text-sm">Insurance</span>
          </Card>

          {/* Invoices */}
          <Card title="Invoices / Transactions">
            <p className="text-sm">Mar 20, 2024 — $150.00 — Insurance</p>
            <Button className="mt-2">Download Invoice</Button>
          </Card>
        </div>

        {/* Right Side */}
        <div className="space-y-4">
          <Card title="Secondary Clients">
            <p>You have 3 secondary clients linked.</p>
            <Button className="mt-2">View Details</Button>
          </Card>

          <Card title="Agency Details">
            <p>Sugamta Agency Pvt Ltd</p>
            <p className="text-sm text-gray-500">1234 Main St, Anytown, USA</p>
            <p className="text-sm text-gray-500">support@sugamta.com</p>
          </Card>

          <Card title="Profile">
            <p>Name: Ayushi</p>
            <p>DOB: Jan 1, 1985</p>
            <p>Email: ayushi@example.com</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
