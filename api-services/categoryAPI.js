import { supabase } from "../utils/supabase"

export async function getCategoriesAndItemsByEmail(email){
    let { data: category, error } = await supabase
  .from('Category')
  .select("*, CategoryItems(*)")
  .eq('created_by', email)

  if(error){
    console.log(error.message)
    return;
  }
  return category
}

export async function addCategoryAPI(data){
  const { data: inserted_category, error } = await supabase
  .from('Category')
  .insert(data)
  .select()

  if(error){
    console.log(error.message)
    return;
  }

  return inserted_category;
}

export async function getCategoryDetailApi(id){
    const {data, error} = await supabase.from("Category")
    .select("*, CategoryItems(*)")
    .eq('id', id)
    if(error){
      console.log(error.message)
      return;
    }
  
    return data;
}