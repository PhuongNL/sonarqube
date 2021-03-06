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
import Marionette from 'backbone.marionette';
import Template from '../templates/rule/coding-rules-rule-parameters.hbs';

export default Marionette.ItemView.extend({
  template: Template,

  modelEvents: {
    'change': 'render'
  },

  onRender () {
    const params = this.model.get('params');
    this.$el.toggleClass('hidden', params == null || params.length === 0);
  },

  serializeData () {
    const isEditable = this.options.app.canWrite && this.model.get('isCustom');

    return {
      ...Marionette.ItemView.prototype.serializeData.apply(this, arguments),
      isEditable,
      canWrite: this.options.app.canWrite
    };
  }
});

