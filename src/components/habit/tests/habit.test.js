import React from 'react';
import renderer from 'react-test-renderer';
import Habit from '../habit';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Habit component', () => {
  const habit = { name: 'Habit', count: 4 };
  let HabitComponent;
  let onIncrement;
  let onDecrement;
  let onDelete;

  beforeEach(() => {
    onIncrement = jest.fn();
    onDecrement = jest.fn();
    onDelete = jest.fn();
    HabitComponent = (
      <Habit
        habit={habit}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDelete={onDelete}
      />
    );
  });

  it('renders', () => {
    //스냅샷 테스트

    const component = renderer.create(HabitComponent);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('button click', () => {
    beforeEach(() => {
      render(HabitComponent);
    });
    it('calls onIcrement when clicking "increment" button', () => {
      const button = screen.getByTitle('increase');
      userEvent.click(button);

      expect(onIncrement).toHaveBeenCalledWith(habit);
    });

    it('calls onDerement when clicking "decrement" button', () => {
      const button = screen.getByTitle('decrease');
      userEvent.click(button);

      expect(onDecrement).toHaveBeenCalledWith(habit);
    });

    it('calls onIcrement when clicking "delete" button', () => {
      const button = screen.getByTitle('delete');
      userEvent.click(button);

      expect(onDelete).toHaveBeenCalledWith(habit);
    });
  });
});
