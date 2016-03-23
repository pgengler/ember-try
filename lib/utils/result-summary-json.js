'use strict';

var CoreObject = require('core-object');
var fs = require('fs');

module.exports = CoreObject.extend({
  print: function() {
    var countPassed = 0;
    var countFailed = 0;
    var countAllowedFailures = 0;
    var results = { };
    results.scenarios = this.results.map(function(scenario) {
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

      return result;
    });

    results.countPassed = countPassed;
    results.countFailed = countFailed;
    results.countAllowedFailures = countAllowedFailures;

    fs.writeFile('results.json', JSON.stringify(results));
    // this.ui.writeLine(JSON.stringify(results));
  }
});
