import { deleteAllItems } from "../api-services/categoryItemsAPI";

// Function to check if today is the 1st of the month
function isFirstOfMonth(date) {
    return date.getDate() === 1;
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
  