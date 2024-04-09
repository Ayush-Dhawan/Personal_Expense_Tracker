import { supabase } from "../utils/supabase"

export async function getCategoriesByEmail(email){
    let { data: category, error } = await supabase
  .from('Category')
  .select("*")
  // Filters
  .eq('created_by', email)

  if(error){
    console.log(error.message)
    return;
  }
  return category
}