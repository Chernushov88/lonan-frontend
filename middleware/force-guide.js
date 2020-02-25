export default function ({ store, redirect }) {
  const authUser = store.state.auth.user;
  if (authUser && authUser.is_not_finished_guide) {
    redirect(`/users/${authUser.route_key}/become-guide`)
  }
}
