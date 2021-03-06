/*
 * SonarQube
 * Copyright (C) 2009-2017 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import keyBy from 'lodash/keyBy';
import omit from 'lodash/omit';
import { RECEIVE_PROJECT_MODULES, CHANGE_KEY } from './actions';

const components = (state = {}, action = {}) => {
  if (action.type === RECEIVE_PROJECT_MODULES) {
    const newComponentsByKey = keyBy(action.modules, 'key');
    return { ...state, ...newComponentsByKey };
  }

  if (action.type === CHANGE_KEY) {
    const oldComponent = state[action.key];
    if (oldComponent != null) {
      const newComponent = { ...oldComponent, key: action.newKey };
      return {
        ...omit(state, action.key),
        [action.newKey]: newComponent
      };
    }
  }

  return state;
};

export default components;

export const getComponentByKey = (state, key) =>
    state[key];
