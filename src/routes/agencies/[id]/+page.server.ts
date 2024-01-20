import { BASE_URL } from "$lib/request";
import { error } from "@sveltejs/kit";
import type { Agency } from "../../+page.server";

export async function load({ params }: { params: { id: string }}) {
  const id = parseInt(params.id);
  const response = await fetch(`${BASE_URL}/agencies/${id}`);
  if (response.ok) {
    const agency: Agency = await response.json();
    return agency;
  } else {
    const msg = await response.json()
    throw error(response.status, {
      message: msg.detail,
    });
    
  }
}