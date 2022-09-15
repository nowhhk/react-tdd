import React from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HabitAddForm from '../habitAddForm';

describe('HabitAddForm', () => {
  let onAdd;
  let input;
  let button;

  beforeEach(() => {
    onAdd = jest.fn();
    render(<HabitAddForm onAdd={onAdd} />);
    input = screen.getByPlaceholderText('Habit');
    button = screen.getByText('Add');
  });

  it('calls onAdd when button is clicked and valid habit is entered', () => {
    //input에 원하는 habit 이름을 타이핑 한 다음에
    //add라는 버튼을 클릭하면
    //onAdd가 input에 입력된 이름과 함께 호출되어야함

    userEvent.type(input, 'New Habit');
    userEvent.click(button);

    expect(onAdd).toHaveBeenCalledWith('New Habit');
  });

  it('does not call onAdd when the habit is empty', () => {
    userEvent.type(input, '');
    userEvent.click(button);

    expect(onAdd).toHaveBeenCalledTimes(0);
  });
});
