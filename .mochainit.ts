process.env.NODE_ENV = "testing";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

before(function configureEnzyme() {
  window.matchMedia = window.matchMedia
    || function matchMedia() {
      return ({
        matches: false,
        media: null,
        onchange() { },
        addEventListener() { },
        addListener() { },
        dispatchEvent(): boolean { return true },
        removeEventListener() { },
        removeListener() { },
      });
    };
  Enzyme.configure({ adapter: new Adapter() });
});
