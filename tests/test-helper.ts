import EmberApp from "@ember/application";
import Resolver from "ember-resolver";
import EmberRouter from "@ember/routing/router";
import * as QUnit from "qunit";
import { setApplication } from "@ember/test-helpers";
import { setup } from "qunit-dom";
import { start as qunitStart, setupEmberOnerrorValidation } from "ember-qunit";

class Router extends EmberRouter {
  location = "none";
  rootURL = "/";
}

class TestApp extends EmberApp {
  modulePrefix = "test-app";
  Resolver = Resolver.withModules({
    "test-app/router": { default: Router },
    // add any custom services here
  });
}

Router.map(function () {});

export function start() {
  setApplication(
    TestApp.create({
      autoboot: false,
      rootElement: "#ember-testing",
    }),
  );
  setup(QUnit.assert);
  setupEmberOnerrorValidation();
  qunitStart();
}
