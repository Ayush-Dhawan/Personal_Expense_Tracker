
import { supabase } from "../utils/supabase";

export async function checkUserExistsInArchive(userEmail) {
    const {data, error} = await supabase
    .from('SpendArchive')
    .select('user_email')
    .eq('user_email', userEmail);

    if(error) console.log(error.message)

    return data.length > 0
  }

  export async function addUserEmailToArchive(userEmail) {
    try {
      const { data, error } = await supabase
        .from('SpendArchive')
        .insert([{ user_email: userEmail }]);
  
      if (error) {
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error('Error adding user email:', error.message);
      return false;
    }
  }

  export async function getSpendsByEmail(userEmail){
    const {data, error} = await supabase
    .from('SpendArchive')
    .select("spends")
    .eq("user_email", userEmail)

    if(error) console.log(error.message)
    console.log(data[0].spends) 
    return data[0].spends;
  }

  export async function updateSpends(userEmail, updatedSpends){
    const {data, error} = await supabase
    .from('SpendArchive')
    .update({ spends: updatedSpends })
    .eq("user_email", userEmail);

    if(error) console.log(error.message);
    return data;
  }


  export async function resetSpendsForAllUsers() {
    // Construct the spends object
    const spends = `{"January": 0,"February": 0,"March": 0,"April": 0,"May": 0, "June": 0,"July": 0,"August": 0,"September": 0,"October": 0,"November": 0,"December": 0}`
  
    // Fetch all users from SpendArchive
    const { data: users, error } = await supabase.from('SpendArchive').select('user_email');
  
    if (error) {
      console.error('Error fetching users:', error.message);
      return;
    }
  
    // Update spends for each user
    for (const user of users) {
      const userEmail = user.user_email;
      const { error: updateError } = await supabase
        .from('SpendArchive')
        .update({ spends })
        .eq('user_email', userEmail);
  
      if (updateError) {
        console.error(`Error updating spends for user ${userEmail}:`, updateError.message);
      } else {
        console.log(`Spends reset for user ${userEmail}`);
      }
    }
  }