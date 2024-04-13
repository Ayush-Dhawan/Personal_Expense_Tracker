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

export async function deleteCategoryItems(category_id){
  const {error} = await supabase
  .from("CategoryItems")
  .delete()
  .eq("category_id", category_id);

  if(error){
    console.log(error.message)
    return;
  }

}

export async function deleteItemByID(id){
  const {error} = await supabase
  .from("CategoryItems")
  .delete()
  .eq("id", id)

  if(error){
    console.log(error.message)
    return;
  }
}

export async function deleteAllItems() {
  const { error } = await supabase.from("CategoryItems").delete();

  if (error) {
    console.log(error.message);
    return;
  }
}
