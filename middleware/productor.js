export default function({ store, redirect }) {
  if (!isProductor(store)) {
    return redirect("/");
  }
}

function isProductor(store) {
  // Check if user session exists somehow
  return store.getters.isProductor;
}
