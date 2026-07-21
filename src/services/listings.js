import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

const listingsRef = collection(db, "listings");

// stage: 0 = open (still has servings available), 1 = fully claimed, 2 = picked up
export async function createListing(formData) {
  await addDoc(listingsRef, {
    ...formData,
    stage: 0,
    claimedQuantity: 0,
    createdAt: serverTimestamp(),
  });
}

export function subscribeToListings(callback) {
  const q = query(listingsRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const listings = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    callback(listings);
  });
}

export async function claimPortion(listing, amount) {
  const requestedAmount = Number(amount);
  const totalQuantity = Number(listing.quantity);
  const alreadyClaimed = Number(listing.claimedQuantity || 0);
  const remaining = totalQuantity - alreadyClaimed;

  if (!requestedAmount || requestedAmount <= 0) {
    throw new Error("Enter a valid number of servings.");
  }
  if (requestedAmount > remaining) {
    throw new Error(`Only ${remaining} servings are still available.`);
  }

  const newClaimedTotal = alreadyClaimed + requestedAmount;
  const listingDoc = doc(db, "listings", listing.id);

  await updateDoc(listingDoc, {
    claimedQuantity: newClaimedTotal,
    stage: newClaimedTotal >= totalQuantity ? 1 : 0,
  });
}

export async function markPickedUp(listingId) {
  const listingDoc = doc(db, "listings", listingId);
  await updateDoc(listingDoc, { stage: 2 });
}
