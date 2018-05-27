'use strict';

const CoreObject = require('core-object');
const fs = require('fs');

module.exports = CoreObject.extend({
  print() {
    let results = {
      countPassed: 0,
      countFailed: 0,
      countAllowedFailures: 0,
    };
    results.scenarios = this.results.map((scenario) => {
      let result = {
        scenarioName: scenario.scenario,
        command: scenario.commandRun,
        passed: scenario.result,
        allowedToFail: scenario.allowedToFail,
      };

      if (scenario.result) {
        results.countPassed++;
      } else {
        results.countFailed++;
        if (scenario.allowedToFail) {
          results.countAllowedFailures++;
        }
      }

      result.dependencies = scenario.dependencyState.map((dependency) => {
        return {
          name: dependency.name,
          versionSeen: dependency.versionSeen,
          versionExpected: dependency.versionExpected,
          type: dependency.packageManager,
        };
      });

      return result;
    });

    fs.writeFileSync('results.json', JSON.stringify(results));
  },
});
