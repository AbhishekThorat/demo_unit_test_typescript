import { getOneTimeChargedAmount, getBalancedAmount } from './main'

// Test the one time journey charges.
test('should return one time charged amount as 275', () => {
  expect(getOneTimeChargedAmount()).toBe(275)
})

// Test remaining journey charges for first to second location. (Mumbai -> Goa route)
test('should return remaining charges by considering Mumbai -> Goa route as 235', () => {
  expect(getBalancedAmount("Mumbai", "Goa", getOneTimeChargedAmount())).toBe(235)
})

// Test remaining journey charges for Bengaluru -> Goa route
test('should return remaining charges by considering Bengaluru -> Goa route as 80', () => {
  expect(getBalancedAmount("Bengaluru", "Goa", getOneTimeChargedAmount())).toBe(80)
})

// Test remaining journey charges for same source and destination.
test('should return one time charged amount as 0', () => {
  expect(getBalancedAmount("Mumbai", "mumbai", getOneTimeChargedAmount())).toBe(0)
})