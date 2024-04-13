import { deleteAllItems } from "../api-services/categoryItemsAPI";
import { getSpendsByEmail, resetSpendsForAllUsers, updateSpends } from "../api-services/spendArchive";



// Function to check if today is the 1st of the month
function isFirstOfMonth(date) {
    return date.getDate() === 1;
  }

  //reset every users spending if its january first
  export async function resetAllSpends(){
    const today = new Date();
    if (today.getMonth() === 0 && today.getDate() === 1) {
      await resetSpendsForAllUsers();
    }
  }
  
  // Function to perform the deletion on the 1st of every month
  export async function scheduleDeletion() {
    const today = new Date();
    if (isFirstOfMonth(today)) {
      await deleteAllItems();
      console.log('All items deleted successfully.');
    } else {
      console.log('Today is not the 1st of the month. No action taken.');
    }
  }
  
  export async function updateSpendsArchive(userEmail, totalSpendings){
    console.log(userEmail, totalSpendings)
    const today = new Date();
    if(!isFirstOfMonth(today)){
      const expenditureString = await getSpendsByEmail(userEmail);
      const expenditureObject = convertExpenditureStringToObject(expenditureString)

      const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today);
      expenditureObject[currentMonth] = totalSpendings;
      const updatedExpenditure = JSON.stringify(expenditureObject);
      console.log("updated ex: ",updatedExpenditure)
      await updateSpends(userEmail, updatedExpenditure);
      console.log(updatedExpenditure)

    }
  }

  function convertExpenditureStringToObject(expenditureString) {
    try {
        // Parse the expenditure string into an object
        const expenditureObject = JSON.parse(expenditureString);
        return expenditureObject;
    } catch (error) {
        console.error("Error parsing expenditure string:", error.message);
        return null;
    }
}

export function getCurrentYear() {
  const today = new Date();
  const currentYear = today.getFullYear();
  return currentYear;
}



