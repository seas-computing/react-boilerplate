import chai from "chai";
import chaiJestSnapshot from "chai-jest-snapshot";

/**
 * Initializes the snapshot feature in Chai for react compoent testing.
 * Saves snapshots to /__tests__/__snapshots and adds .snap to the filename4
 */

chai.use(chaiJestSnapshot);

//eslint-disable-next-line
before(function() {
  chaiJestSnapshot.resetSnapshotRegistry();
});
beforeEach(function() {
  const { currentTest } = this;
  let snapfilename =
    currentTest.file.replace(/__tests__\//, "/__tests__/__snapshots__/") +
    ".snap";
  chaiJestSnapshot.setFilename(snapfilename);
  chaiJestSnapshot.setTestName(currentTest.fullTitle());
});
