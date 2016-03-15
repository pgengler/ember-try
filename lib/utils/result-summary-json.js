'use strict';

var CoreObject = require('core-object');

module.exports = CoreObject.extend({
  print: function() {
    var countPassed = 0;
    var countFailed = 0;
    var countAllowedFailures = 0;
    var results = this.results.map(function(scenario) {
      var result = {
        scenarioName: scenario.scenario,
        command: scenario.commandRun,
        passed: scenario.result,
        allowedToFail: scenario.allowedToFail
      };

      if (scenario.scenario) {
        countPassed++;
      } else {
        countFailed++;
        if (scenario.allowedToFail) {
          countAllowedFailures++;
        }
      }

      result.dependencies = scenario.dependencyState.map(function(dependency) {
        return {
          name: dependency.name,
          versionSeen: dependency.versionSeen,
          versionExpected: dependency.versionExpected,
          type: dependency.packageManager
        };
      });

      result.countPassed = countPassed;
      result.countFailed = countFailed;
      result.countAllowedFailures = countAllowedFailures;

      return result;
    });
    this.ui.writeLine(JSON.stringify(results));
  }
});
