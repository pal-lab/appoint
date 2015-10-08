const {
  Route,
  NotFoundRoute,
  DefaultRoute
} = ReactRouter;

const routes = (
  <Route name="root" handler={AppBody} path="/">
    <Route name="addMember" path="/newappoint/addmembers" handler={AddMemberPage} />
    <Route name="inboxpage" path="/inboxpage" handler={InboxPage} />
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
