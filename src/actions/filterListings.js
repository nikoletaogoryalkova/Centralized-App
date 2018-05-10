export default function filterListings(id) {
  let newListings = this.state.listings.filter(l => l.id !== id);
  this.setState({ listings: newListings });
}

