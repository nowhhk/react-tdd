import { HabitPresenter } from '../habit_presenter';

describe('HabitPresenter', () => {
  const habits = [
    { id: 1, name: 'Reading', count: 0 },
    { id: 2, name: 'Coding', count: 0 },
  ];
  let presenter;
  let update;

  beforeEach(() => {
    presenter = new HabitPresenter(habits, 3);
    update = jest.fn();
  });

  it('inits with habits', () => {
    expect(presenter.getHabits()).toEqual(habits);
  });

  it('increments habit count and call update callback', () => {
    presenter.increment(habits[0], update);

    expect(presenter.getHabits()[0].count).toBe(1);
    checkUpdateIsCalled();
  });

  it('decrements habit count and call update callback', () => {
    presenter.decrement(habits[0], update);

    expect(presenter.getHabits()[0].count).toBe(0);
    checkUpdateIsCalled();
  });

  it('does not set the count value below 0 when decrements', () => {
    presenter.decrement(habits[0], update);
    presenter.decrement(habits[0], update);

    expect(presenter.getHabits()[0].count).toBe(0);
  });

  it('deletes habit from the list', () => {
    presenter.delete(habits[0], update);
    expect(presenter.getHabits().length).toBe(1);
    expect(presenter.getHabits()[0].name).toBe('Coding');
    checkUpdateIsCalled();
  });

  it('adds habit to the list', () => {
    presenter.add('Eating', update);
    expect(presenter.getHabits()[2].name).toBe('Eating');
    expect(presenter.getHabits()[2].count).toBe(0);
    checkUpdateIsCalled();
  });

  it('throw Error when max habits limit is exceeded', () => {
    presenter.add('Eating', update);
    expect(() => presenter.add('Eating', update)).toThrow(
      `habit의 갯수는 3이상이 될 수 없습니다.`
    );
  });

  describe('reset', () => {
    it('resets all habit', () => {
      presenter.reset(update);
      expect(presenter.getHabits()[0].count).toBe(0);
      expect(presenter.getHabits()[1].count).toBe(0);
      checkUpdateIsCalled();
    });

    it('does not create new object when count is 0', () => {
      const habits = presenter.getHabits();
      presenter.reset(update);
      const updatedHabits = presenter.getHabits();

      expect(updatedHabits[1]).toBe(habits[1]);
      //toBe는 오브젝트의 참조값을 비교 (오브젝트 불변성 테스트)
      //toEqual는 오브젝트 안의 데이터 값을 비교
    });
  });

  function checkUpdateIsCalled() {
    expect(update).toHaveBeenCalledTimes(1);
    expect(update).toHaveBeenCalledWith(presenter.getHabits());
  }
});
