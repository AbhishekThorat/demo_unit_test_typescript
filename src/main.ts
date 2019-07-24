interface IRoute {
    source: string;
    destination: string;
    charges: number;
    surcharge: number;
}
// Mock data of availableRoutes.
const availableRoutes: IRoute[] = [
    {
      source: "Mumbai",
      destination: "Goa",
      charges: 40,
      surcharge: 0, 
    },
    {
      source: "Goa",
      destination: "Bengaluru",
      charges: 80,
      surcharge: 0, 
    },
    {
      source: "Bengaluru",
      destination: "Pune",
      charges: 120,
      surcharge: 10, 
    },
    {
      source: "Pune",
      destination: "Mumbai",
      charges: 20,
      surcharge: 5, 
    },
  ];

/**
 * Function to calculate the one time cost to the user. 
 */
export const getOneTimeChargedAmount = (): number => availableRoutes.reduce((cumulative, next) => cumulative += (next.charges + next.surcharge), 0);

/**
 * Function to calculate balanced amount by considering source and destination of journey.
 * Assumptions -
 * 1. We have to calculate the charges once user stops the journey by updating wallet. 
 * 2. We have fixed routes.
 * 3. We will always get valid source and destination ORElse we have to add validations for wrong location names.
 * 4. We will be passing following three parameters while calling to getBalancedAmount. 
 * @param source {string} staring point of journey.
 * @param destination  {string} last/destination point of journey.
 * @param chargedAmount {number} the initial amount which we have chared to user.
 */
export const getBalancedAmount = (source: string, destination: string, chargedAmount: number): number => {
    const sourceToCompare = source.toLowerCase();
    const destinationToCompare = destination.toLowerCase();
    // If Source and destination are the same place then return 0 as balance.
    if(sourceToCompare === destinationToCompare) { return 0; }

    const sourceIndex = availableRoutes.findIndex(route => route.source.toLowerCase() === sourceToCompare);
    let balancedAmount = chargedAmount;

    for(var i= sourceIndex; i<availableRoutes.length; i++) {
      // Check whether current route has destination in it.
    let isFinalDestination = availableRoutes[i].destination.toLowerCase() === destinationToCompare;

    // Update the consolidated charges.
    balancedAmount -= availableRoutes[i].surcharge + availableRoutes[i].charges;
 
    // Reiterate the loop.
    if(!isFinalDestination && availableRoutes.length === i + 1) {
          i =- 1;
          continue;
      }
      // Return the calculated changes and break the loop
      if(isFinalDestination) {return balancedAmount;}
    }
    
    return 0;
  }