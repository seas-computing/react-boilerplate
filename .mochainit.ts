process.env.NODE_ENV = "testing";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import jsdom from 'jsdom-global';
import { cleanup } from '@testing-library/react';

before(function configureEnzyme() {
  jsdom('', { runScripts: 'outside-only' });
  Enzyme.configure({ adapter: new Adapter() });
});

afterEach(cleanup);
