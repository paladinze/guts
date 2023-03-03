import { LightswitchComp } from './lightswitch-comp';
describe('LightswitchComp', () => {
  it('#clicked() should toggle #isOn', () => {
    const comp = new LightswitchComp();
    expect(comp.isOn).toBe(false);
    comp.clicked();
    expect(comp.isOn).toBe(true);
    comp.clicked();
    expect(comp.isOn).toBe(false);
  });

  it('#clicked() should set #message to "is on"', () => {
    const comp = new LightswitchComp();
    expect(comp.message).toMatch(/is off/i);
    comp.clicked();
    expect(comp.message).toMatch(/is on/i);
  });
});
