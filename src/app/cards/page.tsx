import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const virtualCards = [
  {
    id: "1",
    name: "Shopping Card",
    last4: "4242",
    balance: 500,
    currency: "USD",
    status: "active",
    expiryMonth: "12",
    expiryYear: "25",
  },
  {
    id: "2",
    name: "Subscription Card",
    last4: "8888",
    balance: 100,
    currency: "EUR",
    status: "frozen",
    expiryMonth: "06",
    expiryYear: "26",
  },
]

const transactions = [
  {
    id: "1",
    merchant: "Netflix",
    amount: -15.99,
    currency: "USD",
    date: "2024-01-20",
    status: "completed",
  },
  {
    id: "2",
    merchant: "Amazon",
    amount: -29.99,
    currency: "USD",
    date: "2024-01-19",
    status: "completed",
  },
]

export default function VirtualCards() {
  return (
    <main>
      <Navigation />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Virtual Cards</h1>
              <p className="mt-1 text-sm text-gray-500">
                Create and manage your virtual cards for international payments
              </p>
            </div>
            <Button className="bg-black hover:bg-gray-800">
              Create New Card
            </Button>
          </div>

          {/* Virtual Cards List */}
          <div className="grid gap-6 md:grid-cols-2">
            {virtualCards.map((card) => (
              <Card key={card.id}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{card.name}</h3>
                        <p className="text-sm text-gray-500">
                          **** **** **** {card.last4}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Frozen</span>
                        <Switch checked={card.status === "active"} />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Balance</span>
                        <span className="font-medium">
                          {card.currency} {card.balance.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-gray-500">Expires</span>
                        <span className="font-medium">
                          {card.expiryMonth}/{card.expiryYear}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1" variant="outline">
                        View Details
                      </Button>
                      <Button className="flex-1" variant="outline">
                        Set Limits
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Transactions and Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Card Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="transactions">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="settings">Card Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="transactions" className="mt-6">
                  <div className="space-y-4">
                    {transactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-gray-100"
                      >
                        <div>
                          <p className="font-medium">{tx.merchant}</p>
                          <p className="text-sm text-gray-500">{tx.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-red-600">
                            {tx.currency} {tx.amount.toFixed(2)}
                          </p>
                          <p className="text-sm text-green-600">{tx.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-4">Spending Limits</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm text-gray-500">Daily Limit</label>
                          <Input type="number" placeholder="Enter amount" />
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Monthly Limit</label>
                          <Input type="number" placeholder="Enter amount" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-4">Security Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">International Payments</p>
                            <p className="text-sm text-gray-500">Allow international transactions</p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Online Payments</p>
                            <p className="text-sm text-gray-500">Allow online purchases</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">Save Settings</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
