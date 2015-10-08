const {
  Route,
  NotFoundRoute,
  DefaultRoute
} = ReactRouter;

const routes = (
  <Route name="root" handler={AppBody} path="/">
    <Route name="inboxPage" path="/inbox" handler={InboxPage} />
    <Route name="addMemberPage" path="/newappoint/addmembers" handler={AddMemberPage} />
    <Route name="newAppointmentPage" path="/newappoint" handler={NewAppointmentPage} />
    <Route name="appointmentPage" path="/appoint" handler={AppointmentPage} />
    <Route name="join" path="/join" handler={AuthJoinPage} />
    <Route name="signin" path="/signin" handler={AuthSignInPage} />
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
