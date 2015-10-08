const {
  Route,
  NotFoundRoute,
  DefaultRoute
} = ReactRouter;

const routes = (
  <Route name="root" handler={AppBody} path="/">
    <Route name="inboxPage" path="/inbox" handler={InboxPage} />
    <Route name="appointmentpage" path="/appointmentpage/:appointment_id" handler={AppointmentPage} />
    <Route name="addMemberPage" path="/newappoint/addmembers" handler={AddMemberPage} />
    <Route name="join" path="/join" handler={AuthJoinPage} />
    <Route name="signin" path="/signin" handler={AuthSignInPage} />
    <Route name="newAppointmentPage" path="/newappointmentpage" handler={NewAppointmentPage} />
    <DefaultRoute handler={AppLoading} />
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
