import { supabase } from "../utils/supabase";

export async function addCategoryItem({name, cost, note, category_id, image}){
    const {data, error} = await supabase.from('CategoryItems')
    .insert({name, cost, note, category_id, image})
    .select()

  if(error){
    console.log(error.message)
    return;
  }

  return data;
}