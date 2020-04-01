import React from 'react';
import { shallow } from 'enzyme';
import ImageManager from './ImageManager';

const props = {
  t: jest.fn(),
  handleToggleNerveSection: jest.fn(),
  handlePopoverOpen: jest.fn(),
  handlePopoverClose: jest.fn(),
  handleHeartPopoverOpen: jest.fn(),
  handleHeartPopoverClose: jest.fn(),
  handleSympateticPopoverOpen: jest.fn(),
  handleSympateticPopoverClose: jest.fn(),
  handleParaSympaPopoverOpen: jest.fn(),
  handleParaSympaPopoverClose: jest.fn(),
  handleHeringPopoverOpen: jest.fn(),
  handleHeringPopoverClose: jest.fn(),
  handleBulbPopoverOpen: jest.fn(),
  handleBulbPopoverClose: jest.fn(),
  handleSpinalPopoverOpen: jest.fn(),
  handleSpinalPopoverClose: jest.fn(),
  showNerve: false,
};

describe('render image manager component tests', () => {
  it('has one instance of image manager', () => {
    const component = shallow(<ImageManager {...props} />);
    expect(component).toMatchSnapshot();
  });
});
