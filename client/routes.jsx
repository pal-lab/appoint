const {
  Route,
  NotFoundRoute,
  DefaultRoute
} = ReactRouter;

const routes = (
  <Route name="root" handler={AppBody} path="/">
    <Route name="inboxPage" path="/inbox" handler={InboxPage} />
    <Route name="appointmentpage" path="/appointment/:appointment_id" handler={AppointmentPage} />
    <Route name="addMemberPage" path="/appointment/:appointment_id/invitefriends" handler={AddMemberPage} />
    <Route name="join" path="/join" handler={AuthJoinPage} />
    <Route name="signin" path="/signin" handler={AuthSignInPage} />
    <Route name="proposalpage" path="/appointment/:appointment_id/proposeddates" handler={ProposalPage} />
    <Route name="settings" path="/settings" handler={UserSettings} />
    <DefaultRoute handler={InboxPage} />
    <NotFoundRoute handler={AppNotFound} />
  </Route>
)

const router = ReactRouter.create({
  routes: routes,
  location: ReactRouter.HistoryLocation
});

Meteor.startup(function () {
  router.run(function (Handler, state) {
    React.render(<Handler/>, document.getElementById("app-container"));
  });
});
