import { Navigation } from "@/components/Navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
]

const rates = [
  { from: "USD", to: "EUR", rate: 0.92 },
  { from: "USD", to: "GBP", rate: 0.79 },
  { from: "EUR", to: "GBP", rate: 0.86 },
]

export default function CurrencyConversion() {
  return (
    <main>
      <Navigation />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Currency Exchange</h1>
            <p className="mt-1 text-sm text-gray-500">
              Convert currencies and track exchange rates
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Currency Converter */}
            <Card>
              <CardHeader>
                <CardTitle>Convert Currency</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">From</label>
                    <div className="mt-1 grid grid-cols-2 gap-4">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              {currency.symbol} {currency.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input type="number" placeholder="0.00" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">To</label>
                    <div className="mt-1 grid grid-cols-2 gap-4">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency.code} value={currency.code}>
                              {currency.symbol} {currency.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input type="number" placeholder="0.00" disabled />
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-black hover:bg-gray-800">
                  Convert & Exchange
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  1 USD = 0.92 EUR
                  <br />
                  <span className="text-xs">
                    Last updated: {new Date().toLocaleString()}
                  </span>
                </p>
              </CardContent>
            </Card>

            {/* Exchange Rates */}
            <Card>
              <CardHeader>
                <CardTitle>Live Exchange Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rates.map((rate) => (
                    <div
                      key={`${rate.from}-${rate.to}`}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-100"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">
                          {rate.from} → {rate.to}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{rate.rate}</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Set Alert
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-4">Rate Alerts</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100">
                      <div>
                        <p className="font-medium">EUR/USD</p>
                        <p className="text-sm text-gray-500">Alert at 1.15</p>
                      </div>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
