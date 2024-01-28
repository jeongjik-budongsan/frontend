import { error } from "@sveltejs/kit";
import { supabase } from "../../../supabase";

export async function load({ params }: { params: { id: string }}) {
  const id = parseInt(params.id);
  const res = await supabase.from('agency').select('*, reviews(*)').eq('id', id);
  if (res.data && res.data.length > 0) {
    const agency = res.data[0];
    return {...agency, review: {
      items: agency.reviews,
      average: agency.reviews.reduce((acc, cur) => acc + cur.point, 0) / agency.reviews.length,
    }};
  } else {
    throw error(404, {
      message: 'not found',
    });
    
  }
}