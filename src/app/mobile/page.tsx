import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const providers = [
  { id: "mpesa", name: "M-Pesa", icon: "📱" },
  { id: "airtel", name: "Airtel Money", icon: "📱" },
  { id: "mtn", name: "MTN Mobile Money", icon: "📱" },
  { id: "orange", name: "Orange Money", icon: "📱" },
]

export default function MobileMoney() {
  return (
    <main>
      <Navigation />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mobile Money Services</h1>
            <p className="mt-1 text-sm text-gray-500">
              Send, receive, and manage your mobile money transactions
            </p>
          </div>

          <Tabs defaultValue="send" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="send">Send Money</TabsTrigger>
              <TabsTrigger value="topup">Top Up</TabsTrigger>
              <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
              <TabsTrigger value="bills">Pay Bills</TabsTrigger>
              <TabsTrigger value="virtual">Virtual Card</TabsTrigger>
              <TabsTrigger value="qr">QR Pay</TabsTrigger>
            </TabsList>

            <TabsContent value="send" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Send Money</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Provider</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {providers.map((provider) => (
                        <button
                          key={provider.id}
                          className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-black hover:bg-gray-50"
                        >
                          <span className="text-2xl mb-2">{provider.icon}</span>
                          <span className="text-sm font-medium">{provider.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Recipient Phone Number</label>
                      <Input type="tel" placeholder="+1234567890" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Amount</label>
                      <Input type="number" placeholder="0.00" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Note (Optional)</label>
                      <Input type="text" placeholder="Add a note" className="mt-1" />
                    </div>
                  </div>

                  <Button className="w-full bg-black hover:bg-gray-800">
                    Continue to Send
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="topup" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Up Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Top-up Method</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-black hover:bg-gray-50">
                        <span className="text-2xl mb-2">💳</span>
                        <span className="text-sm font-medium">Virtual Card</span>
                      </button>
                      <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-black hover:bg-gray-50">
                        <span className="text-2xl mb-2">📱</span>
                        <span className="text-sm font-medium">Mobile Money</span>
                      </button>
                      <button className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-black hover:bg-gray-50">
                        <span className="text-2xl mb-2">🏦</span>
                        <span className="text-sm font-medium">Bank Transfer</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Amount to Top Up (GHS)</label>
                      <Input type="number" placeholder="0.00" className="mt-1" />
                    </div>
                    
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Current Balance:</span>
                        <span className="font-medium">₵ 5,000.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Top-up Fee:</span>
                        <span className="font-medium text-green-600">Free</span>
                      </div>
                    </div>

                    <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                      <div className="flex items-start space-x-3">
                        <span className="text-blue-500">ℹ️</span>
                        <div className="text-sm text-blue-700">
                          <p className="font-medium mb-1">Quick Top-up Guide:</p>
                          <ol className="list-decimal list-inside space-y-1">
                            <li>Select your preferred top-up method</li>
                            <li>Enter the amount you wish to add</li>
                            <li>Follow the payment instructions</li>
                            <li>Your balance will update automatically</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-black hover:bg-gray-800">
                    Continue to Top Up
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="withdraw" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Withdraw to Mobile Money</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Provider</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {providers.map((provider) => (
                        <button
                          key={provider.id}
                          className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-black hover:bg-gray-50"
                        >
                          <span className="text-2xl mb-2">{provider.icon}</span>
                          <span className="text-sm font-medium">{provider.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Your Mobile Money Number</label>
                      <Input type="tel" placeholder="+233 XX XXX XXXX" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Amount (GHS)</label>
                      <Input type="number" placeholder="0.00" className="mt-1" />
                    </div>
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Available Balance:</span>
                        <span className="font-medium">₵ 5,000.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Withdrawal Fee:</span>
                        <span className="font-medium">₵ 5.00</span>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-black hover:bg-gray-800">
                    Withdraw to Mobile Money
                  </Button>

                  <div className="text-center text-sm text-gray-500">
                    Withdrawals typically process within 5-10 minutes
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bills" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pay Bills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Bill Type</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { id: "utilities", name: "Utilities", icon: "💡" },
                        { id: "internet", name: "Internet", icon: "🌐" },
                        { id: "tv", name: "TV & Cable", icon: "📺" },
                        { id: "education", name: "Education", icon: "🎓" },
                      ].map((bill) => (
                        <button
                          key={bill.id}
                          className="flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-black hover:bg-gray-50"
                        >
                          <span className="text-2xl mb-2">{bill.icon}</span>
                          <span className="text-sm font-medium">{bill.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Account/Bill Number</label>
                      <Input type="text" placeholder="Enter account number" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Amount</label>
                      <Input type="number" placeholder="0.00" className="mt-1" />
                    </div>
                  </div>

                  <Button className="w-full bg-black hover:bg-gray-800">
                    Pay Bill
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="virtual" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Virtual Card</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="relative h-48 w-full rounded-xl bg-gradient-to-r from-black to-gray-800 p-6 text-white shadow-lg">
                      <div className="flex flex-col justify-between h-full">
                        <div className="flex justify-between">
                          <div className="text-lg font-bold">Virtual Debit Card</div>
                          <div className="text-xl">💳</div>
                        </div>
                        <div>
                          <div className="text-lg tracking-widest">**** **** **** 1234</div>
                          <div className="mt-4 text-sm">
                            <span className="mr-4">Valid thru: 12/25</span>
                            <span>CVV: ***</span>
                          </div>
                          <div className="mt-2 text-sm font-medium">JOHN DOE</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="w-full">
                        View Card Details
                      </Button>
                      <Button variant="outline" className="w-full">
                        Freeze Card
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Card Balance</div>
                          <div className="text-2xl font-bold">₵ 2,500.00</div>
                        </div>
                        <Button className="bg-black hover:bg-gray-800">
                          Top Up Card
                        </Button>
                      </div>

                      <div className="border-t pt-4">
                        <div className="font-medium mb-2">Quick Actions</div>
                        <div className="grid grid-cols-2 gap-4">
                          <button className="flex items-center justify-center space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                            <span>🔄</span>
                            <span>Transaction History</span>
                          </button>
                          <button className="flex items-center justify-center space-x-2 p-3 rounded-lg border hover:bg-gray-50">
                            <span>⚙️</span>
                            <span>Card Settings</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="qr" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>QR Code Payment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="text-center p-8 border-2 border-dashed rounded-lg">
                        <div className="mb-4">📷</div>
                        <h3 className="font-medium mb-2">Scan QR Code</h3>
                        <p className="text-sm text-gray-500">
                          Point your camera at a QR code to make a payment
                        </p>
                        <Button variant="outline" className="mt-4">
                          Open Camera
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="text-center p-8 border-2 border-dashed rounded-lg">
                        <div className="mb-4">🔲</div>
                        <h3 className="font-medium mb-2">Your QR Code</h3>
                        <p className="text-sm text-gray-500">
                          Show this code to receive payments
                        </p>
                        <Button variant="outline" className="mt-4">
                          Generate QR Code
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-medium mb-4">Recent QR Transactions</h3>
                    <div className="space-y-3">
                      {[
                        { type: "Received", amount: "₵50.00", from: "Coffee Shop", time: "2 hours ago" },
                        { type: "Paid", amount: "₵25.00", from: "Taxi Ride", time: "Yesterday" },
                      ].map((tx, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">
                              {tx.type === "Received" ? "⬇️" : "⬆️"}
                            </span>
                            <div>
                              <div className="font-medium">{tx.from}</div>
                              <div className="text-sm text-gray-500">{tx.time}</div>
                            </div>
                          </div>
                          <div className={tx.type === "Received" ? "text-green-600" : "text-gray-900"}>
                            {tx.type === "Received" ? "+" : "-"}{tx.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-start space-x-3">
                      <span className="text-blue-500">💡</span>
                      <div className="text-sm text-blue-700">
                        <p className="font-medium">Pro Tip:</p>
                        <p>Save frequently used QR codes in your gallery for quick access to regular payments.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
